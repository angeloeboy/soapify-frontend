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
import { PaginationControl } from "@/styled-components/ItemActionModal";
import Pagination from "@/components/misc/pagination";


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
	max-width: 300px;
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
	const [activeAction, setActiveAction] = useState("cart");

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const paginatedProducts = productDisplay.slice(startIndex, endIndex);

	const [transaction, setTransaction] = useState({
		payment_method_id: undefined,
		transaction_number: "",
		total_amount: 0,
		items: [],
	});

	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedProducts = productDisplay.slice(startIndex, endIndex);
	

	const [windowWidth, setWindowWidth] = useState(1200);

	useEffect(() => {
		// Update width to the actual window width when the component mounts on the client side

		fetchProducts();

		setWindowWidth(window.innerWidth);

		const handleResize = () => setWindowWidth(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		setTransaction((prev) => ({ ...prev, total_amount: cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0), items: cart }));
	}, [cart]);

	useEffect(() => {
		console.log(groupProductsByName(products));
		setProductDisplay(groupProductsByName(products));
		// setProductDisplay(products);
	}, [products]);

	const fetchProducts = async () => {
		const response = await getProducts();
		setProducts(response.products || []);
		console.log(response.products);
	};

	const groupProductsByName = (products) => {
		//group product by name if theres multiple of them
		const groupedProducts = products.reduce((acc, product) => {
			if (!acc[product.product_name]) {
				acc[product.product_name] = [product];
			} else {
				acc[product.product_name].push(product);
			}
			return acc;
		}, {});

		//convert object to array
		const groupedProductsArray = Object.keys(groupedProducts).map((key) => ({
			product_name: key,
			products: groupedProducts[key],
		}));

		//create an array that gets the first product of each group
		// const groupedProductsArrayFirst = groupedProductsArray.map((group) => group.products[0]);

		//create an array that gets the first product of each group and adds the quantity of the rest of the products

		return groupedProductsArray;
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
		<TransactionContext.Provider value={{ setTransaction, transaction, cart, updateCart, setCart, activeAction, setActiveAction }}>
			<DashboardLayout>
				<PageTitle title="POS" />
				<POSWrapper>
					<StyledPanel pos={true}>
						<SearchBarComponent products={products} setProductDisplay={setProductDisplay} />

						<ProductsList>
							{paginatedProducts.map((productGroup, index) => {
							{paginatedProducts.map((productGroup, index) => {
								if (productGroup.products.length <= 1) {
									return (
										<ProductComponent
											product={productGroup.products[0]}
											index={index}
											onClick={() => {
												updateCart(productGroup.products[0], "add");
												if (activeAction != "cart") setActiveAction("cart");
											}}
											key={index}
											hasVariants={false}
										/>
									);
								} else {
									return (
										<ProductComponent
											product={productGroup.products[0]}
											index={index}
											updateCart={updateCart}
											key={index}
											variants={productGroup.products.slice(1)}
										/>
									);
								}
							})}
						</ProductsList>
					</StyledPanel>

					<StickyContainer>
						<Sticky enabled={windowWidth > 1200 ? true : false} top={20}>
							<POSactions />
						</Sticky>
					</StickyContainer>
				</POSWrapper>
			</DashboardLayout>
			<Pagination
  			totalItems={productDisplay.length} // Total number of items
     		itemsPerPage={itemsPerPage}
  			currentPage={currentPage}
			onPageChange={(newPage) => setCurrentPage(newPage)}
			/>

			<Pagination
			totalItems={productDisplay.length} // Total number of items
			itemsPerPage={itemsPerPage}
			currentPage={currentPage}
			onPageChange={(newPage) => setCurrentPage(newPage)}
			/>

		</TransactionContext.Provider>
	);
};

export default Pos;
