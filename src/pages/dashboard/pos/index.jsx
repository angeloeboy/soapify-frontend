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

	/* @media (max-width: 1200px) {
		position: fixed;
		right: 5%;
		top: 17%;
	} */
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

	const [windowWidth, setWindowWidth] = useState(1200);

	useEffect(() => {
		// Update width to the actual window width when the component mounts on the client side
		setWindowWidth(window.innerWidth);

		const handleResize = () => setWindowWidth(window.innerWidth);

		// Attach the event listener
		window.addEventListener("resize", handleResize);

		// Cleanup the event listener on component unmount
		return () => window.removeEventListener("resize", handleResize);
	}, []);

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
				<POSWrapper>
					<StyledPanel pos>
						<SearchBarComponent products={products} setProductDisplay={setProductDisplay} />

						<ProductsList>
							{productDisplay.map((product, productIndex) => (
								<ProductComponent product={product} index={productIndex} onClick={() => updateCart(product, "add")} key={product.product_id} />
							))}
						</ProductsList>
					</StyledPanel>

					<StickyContainer>
						<Sticky enabled={windowWidth > 1200 ? true : false} top={20}>
							<POSactions />
						</Sticky>
					</StickyContainer>
				</POSWrapper>
			</DashboardLayout>
		</TransactionContext.Provider>
	);
};

export default Pos;
