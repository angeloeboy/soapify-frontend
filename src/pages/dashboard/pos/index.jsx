import { createContext, useContext, useEffect, useState } from "react";
import StyledPanel from "@/styled-components/StyledPanel";
import { styled } from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import POSactions from "@/components/pos/posActions";
import { getProducts } from "@/api/products";
import PageTitle from "@/components/misc/pageTitle";
import Sticky from "react-stickynode";

import SearchBarComponent from "@/components/pos/searchBarAndFilters";
import ProductComponent from "@/components/pos/product";
import { addTransaction, getTransactions } from "@/api/transaction";

const ProductsList = styled.div`
	display: flex;
	flex-wrap: wrap;
	/* max-width: 1200px; */
	align-items: center;
`;

const POSWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StickyContainer = styled.div`
	position: relative;
	width: 100%;
	max-width: 500px;
	margin-top: 48px;
`;

export const TransactionContext = createContext(null);

const Pos = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [productDisplay, setProductDisplay] = useState([]);

	const [transaction, setTransaction] = useState({
		payment_method_id: undefined,
		transaction_number: "",
		total_amount: 0,
		items: [],
	});

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		console.log(transaction);
		// setTransaction((prev) => ({ ...prev, total_amount: cart.reduce((acc, item) => acc + item.price * item.quantity, 0) }));
	}, [transaction]);

	useEffect(() => {
		setTransaction((prev) => ({ ...prev, total_amount: cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0), items: cart }));
	}, [cart]);

	const initiateTransaction = async () => {
		const response = await addTransaction(transaction);
		console.log(response);
	};

	useEffect(() => {
		setProductDisplay(products);
	}, [products]);

	const fetchProducts = async () => {
		const response = await getProducts();
		setProducts(response.products || []);
		console.log(response.products);
	};

	const updateCart = (product, operation) => {
		const existingProduct = cart.find((item) => item.product_id === product.product_id);

		let updatedCart;
		if (operation === "add") {
			updatedCart = existingProduct
				? cart.map((item) => (item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item))
				: [...cart, { ...product, quantity: 1 }];
		} else if (operation === "subtract" && existingProduct) {
			updatedCart =
				existingProduct.quantity === 1 || existingProduct.quantity < 0
					? cart.filter((item) => item.product_id !== product.product_id)
					: cart.map((item) => (item.product_id === product.product_id ? { ...item, quantity: item.quantity - 1 } : item));
		} else if (operation === "delete" && existingProduct) {
			updatedCart = cart.filter((item) => item.product_id !== product.product_id);
		}
		setCart(updatedCart);
	};

	return (
		<TransactionContext.Provider value={{ setTransaction, transaction, cart, updateCart, setCart }}>
			<DashboardLayout>
				<PageTitle title="POS" />
				<button onClick={() => initiateTransaction()}>Add transaction</button>
				<POSWrapper>
					<StyledPanel pos>
						<SearchBarComponent products={products} setProductDisplay={setProductDisplay} />

						<ProductsList>
							{productDisplay.map((product) => (
								<ProductComponent product={product} onClick={() => updateCart(product, "add")} key={product.product_id} />
							))}
						</ProductsList>
					</StyledPanel>

					<StickyContainer>
						<Sticky enabled={true} top={20}>
							<POSactions />
						</Sticky>
					</StickyContainer>
				</POSWrapper>
			</DashboardLayout>
		</TransactionContext.Provider>
	);
};

export default Pos;
