import { createContext, useContext, useEffect, useState } from "react";
import StyledPanel from "@/styled-components/StyledPanel";
import { styled } from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import POSactions from "@/components/pos/posActions";
import { getProducts } from "@/api/products";
import PageTitle from "@/components/misc/pageTitle";
import Sticky from "react-stickynode";

import PosSearchBar from "@/components/pos/posSearchBar";
import ProductComponent from "@/components/pos/product";
import { addTransaction, getTransactions } from "@/api/transaction";
import { PaginationControl } from "@/styled-components/ItemActionModal";
import Pagination from "@/components/misc/pagination";
import { TransactionContext } from "@/components/context/TransactionContext";
import { getParentProduct } from "@/api/parent_product";
import ParentProduct from "../parent-product";
import ParentProductDisplay from "@/components/pos/parenntProduct";
// import { TransactionContext } from "../context/TransactionContext";

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

	@media (max-width: 1200px) {
		flex-direction: column;
	}
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

	@media (max-width: 1200px) {
		max-width: calc(100% - 5%);
		margin-left: 5%;
	}
`;

const Pos = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [productDisplay, setProductDisplay] = useState([]);
	const [activeAction, setActiveAction] = useState("cart");
	const [promoCodeResponse, setPromoCodeResponse] = useState({
		isValid: false,
		totalDiscountAmount: 0,
		discountType: null,
		discountedItems: [],
	});

	const [transaction, setTransaction] = useState({
		payment_method_id: undefined,
		transaction_number: "",
		total_amount: 0,
		items: [],
		promo_code: "",
	});

	const [parentProducts, setParentProducts] = useState([]);
	const [parentProductsDisplay, setParentProductsDisplay] = useState([]);

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
		const applyDiscountsToCart = () => {
			if (!promoCodeResponse.isValid) return;
			//if the promo type is fixed, apply the discount to the total price of the transaction
			if (promoCodeResponse.discountType === "FIXED") {
				console.log("fixed");
				promoCodeResponse.totalDiscountAmount;
				setTransaction((prev) => ({
					...prev,
					total_amount: prev.total_amount - promoCodeResponse.totalDiscountAmount * 100,
				}));

				return;
			}

			const updatedCart = cart.map((cartItem) => {
				if (cartItem.isDiscounted) return cartItem;
				const discountInfo = promoCodeResponse.discountedItems.find((di) => di.product_id === cartItem.product_id);
				if (discountInfo) {
					return {
						...cartItem,
						product_price: discountInfo.discounted_price / cartItem.quantity, // Assuming you want to update the unit price
						isDiscounted: true,
						orig_price: cartItem.product_price,
					};
				}
				return cartItem;
			});

			setCart(updatedCart); // This will trigger the other useEffect
		};

		applyDiscountsToCart();
	}, [promoCodeResponse]); // Dependency array includes only promoCodeResponse

	useEffect(() => {
		// console.log("orig cart: ", cart);
		setTransaction((prev) => ({
			...prev,
			total_amount:
				cart.reduce((acc, item) => acc + item.product_price * item.quantity, 0) -
				((promoCodeResponse.discountType == "FIXED" && promoCodeResponse?.totalDiscountAmount * 100) || 0),
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

		console.log(filteredProducts);

		filteredProducts.forEach((product) => {
			//deduct the quantity_in_awaiting payment from the quantity_in_stock
			product.quantity_in_stock -= product.quantity_in_awaiting_payment;
		});

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

		setParentProducts(parentProduct);
		setParentProductsDisplay(parentProduct);
		// groupProductsByParentProductId2(products);
	};

	const updateCart = (product, operation) => {
		const existingProduct = cart.find((item) => item.product_id === product.product_id);

		let updatedCart;
		if (operation === "add") {
			//if the quantity of the product is greater than the quantity in stock
			if (existingProduct && existingProduct.quantity >= existingProduct.quantity_in_stock) {
				return;
			}

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
				promoCodeResponse,
				setPromoCodeResponse,
			}}
		>
			<DashboardLayout>
				<PageTitle title="POS" />
				<POSWrapper>
					<StyledPanel pos={true}>
						<PosSearchBar
							products={products}
							setProductDisplay={setProductDisplay}
							parentProducts={parentProducts}
							setParentProductsDisplay={setParentProductsDisplay}
						/>

						<ProductsList>
							{parentProducts.length !== 0 &&
								parentProductsDisplay.map((parentProduct, index) => {
									if (parentProduct.products.length <= 0) return null;
									// if (parentProduct.products[0].quantity_in_stock <= 0) return null;
									if (parentProduct.products.filter((product) => product.quantity_in_stock > 0).length <= 0) return null;
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
							<POSactions />
						</Sticky>
					</StickyContainer>
				</POSWrapper>
			</DashboardLayout>
		</TransactionContext.Provider>
	);
};

export default Pos;

import cookie from "cookie";
export async function getServerSideProps(context) {
	const { req } = context;
	const parsedCookies = cookie.parse(req.headers.cookie || "").permissions;

	if (!parsedCookies.includes("View Pos:pos")) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			permissions: parsedCookies ? JSON.parse(parsedCookies) : [],
		}, // will be passed to the page component as props
	};
}
