import { useEffect, useState } from "react";
import StyledPanel from "@/styled-components/StyledPanel";
import { styled } from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import { getProducts } from "@/api/products";
import PageTitle from "@/components/misc/pageTitle";
import Sticky from "react-stickynode";

import PosSearchBar from "@/components/pos/posSearchBar";
import ProductComponent from "@/components/pos/product";

import { TransactionContext } from "@/components/context/TransactionContext";
import { getParentProduct } from "@/api/parent_product";
import ParentProductDisplay from "@/components/pos/parenntProduct";
import UserPOSactions from "@/components/pos_user/posActions";

const ProductsList = styled.div`
	display: flex;
	flex-wrap: wrap;
	/* max-width: 1200px; */
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	/* max-width: 1200px; */
	align-items: center;
`;

const POSWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	display: flex;
	justify-content: space-between;
`;

const StickyContainer = styled.div`
	position: relative;
	width: 100%;
	max-width: 300px;
	margin-top: 48px;
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

const UserDashboard = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [productDisplay, setProductDisplay] = useState([]);
	const [activeAction, setActiveAction] = useState("cart");

	const [transaction, setTransaction] = useState({
		payment_method_id: undefined,
		transaction_number: "",
		total_amount: 0,
		items: [],
	});

	const [parentProducts, setParentProducts] = useState([]);

	const [windowWidth, setWindowWidth] = useState(1200);

	const [orderFromBackend, setOrderFromBackend] = useState();
	useEffect(() => {
		fetchProducts();
		setWindowWidth(window.innerWidth);
		const handleResize = () => setWindowWidth(window.innerWidth);

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		setTransaction((prev) => ({
			...prev,
			total_amount: cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0),
			items: cart,
		}));
	}, [cart]);

	useEffect(() => {
		// setProductDisplay(groupProductsByParentProductId(products));
		setProductDisplay(products.filter((product) => product.parent_product_id === null));
		fetchParentProducts();
	}, [products]);

	const fetchProducts = async () => {
		const response = await getProducts();
		const filteredProducts = response.products.filter((product) => product.isActive);

		setProducts(filteredProducts || []);
	};

	const fetchParentProducts = async () => {
		const response = await getParentProduct();

		if (!response) return;

		// setParentProducts(response.parentProducts);

		let parentProduct = response.parentProducts.map((parentProduct) => {
			return {
				...parentProduct,
				products: products.filter((product) => product.parent_product_id === parentProduct.parent_product_id),
			};
		});

		console.log(parentProduct);

		setParentProducts(parentProduct);
		// groupProductsByParentProductId2(products);
	};

	const groupProductsByParentProductId = (products) => {
		const variants = products.filter((product) => product.parent_product_id !== null);
		const notVariants = products.filter((product) => product.parent_product_id === null);

		notVariants.forEach((product) => {
			product.variants = variants.filter((variant) => variant.parent_product_id === product.product_id);

			if (product.variants.length > 0) {
				product.variants.push(product);
			}
		});

		return notVariants;
	};

	const groupProductsByParentProductId2 = (products) => {
		let parentProduct = parentProducts.map((parentProduct) => {
			return {
				...parentProduct,
				products: products.filter((product) => product.parent_product_id === parentProduct.parent_product_id),
			};
		});

		console.log(parentProduct);

		setParentProducts(parentProduct);
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
		<TransactionContext.Provider
			value={{
				setTransaction,
				transaction,
				cart,
				updateCart,
				setCart,
				activeAction,
				setActiveAction,
				orderFromBackend,
				setOrderFromBackend,
			}}
		>
			<DashboardLayout>
				<PageTitle title="POS" />
				<POSWrapper>
					<StyledPanel pos={true}>
						<PosSearchBar products={products} setProductDisplay={setProductDisplay} />

						<ProductsList>
							{parentProducts.length !== 0 &&
								parentProducts.map((parentProduct, index) => {
									if (parentProduct.products.length <= 0) return null;

									return <ParentProductDisplay key={index} parentProduct={parentProduct} updateCart={updateCart} />;
								})}
							{productDisplay.map((product, index) => {
								if (product.quantity_in_stock > 0) {
									return (
										<ProductComponent
											product={product}
											index={index}
											onClick={() => {
												updateCart(product, "add");
												if (activeAction != "cart") setActiveAction("cart");
											}}
											updateCart={updateCart}
											key={index}
											hasVariants={product.variants ? true : false}
											variants={product.variants ? product.variants : []}
											cart={cart}
										/>
									);
								}
							})}
						</ProductsList>
					</StyledPanel>

					<StickyContainer>
						<Sticky enabled={windowWidth > 1200 ? true : false} top={20}>
							<UserPOSactions />
						</Sticky>
					</StickyContainer>
				</POSWrapper>
			</DashboardLayout>
		</TransactionContext.Provider>
	);
};

export default UserDashboard;
