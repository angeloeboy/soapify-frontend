// import { createContext, useContext, useEffect, useState } from "react";
// import StyledPanel from "@/styled-components/StyledPanel";
// import { styled } from "styled-components";
// import DashboardLayout from "@/components/misc/dashboardLayout";
// import POSactions from "@/components/pos/posActions";
// import { getProducts } from "@/api/products";
// import PageTitle from "@/components/misc/pageTitle";
// import Sticky from "react-stickynode";

// import SearchBarComponent from "@/components/pos/posSearchBar";
// import ProductComponent from "@/components/pos/product";
// import { addTransaction, getTransactions } from "@/api/transaction";
// import { PaginationControl } from "@/styled-components/ItemActionModal";
// import Pagination from "@/components/misc/pagination";
// import { TransactionContext } from "@/components/context/TransactionContext";
// // import { TransactionContext } from "../context/TransactionContext";

// const ProductsList = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   /* max-width: 1200px; */
//   align-items: center;
// `;

// const POSWrapper = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;

// const StickyContainer = styled.div`
//   position: relative;
//   width: 100%;
//   max-width: 300px;
//   margin-top: 48px;

//   /* @media (max-width: 1200px) {
// 		position: fixed;
// 		right: 5%;
// 		top: 17%;
// 	} */
// `;

// const Pos = () => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [productDisplay, setProductDisplay] = useState([]);
//   const [activeAction, setActiveAction] = useState("cart");

//   const [transaction, setTransaction] = useState({
//     payment_method_id: undefined,
//     transaction_number: "",
//     total_amount: 0,
//     items: [],
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = currentPage * itemsPerPage;
//   const paginatedProducts = productDisplay.slice(startIndex, endIndex);

//   const [windowWidth, setWindowWidth] = useState(1200);

//   useEffect(() => {
//     // Update width to the actual window width when the component mounts on the client side

//     fetchProducts();

//     setWindowWidth(window.innerWidth);

//     const handleResize = () => setWindowWidth(window.innerWidth);

//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     setTransaction((prev) => ({
//       ...prev,
//       total_amount: cart.reduce(
//         (acc, item) => acc + item.product_price * item.quantity,
//         0
//       ),
//       items: cart,
//     }));
//   }, [cart]);

//   useEffect(() => {
//     setProductDisplay(groupProductsByParentProductId(products));
//     // setProductDisplay(products);
//     console.log(groupProductsByParentProductId(products));
//   }, [products]);

//   const fetchProducts = async () => {
//     const response = await getProducts();
//     setProducts(response.products || []);
//     console.log(response.products);
//   };

//   const groupProductsByName = (products) => {
//     //group product by name if theres multiple of them
//     const groupedProducts = products.reduce((acc, product) => {
//       if (!acc[product.product_name]) {
//         acc[product.product_name] = [product];
//       } else {
//         acc[product.product_name].push(product);
//       }
//       return acc;
//     }, {});

//     //convert object to array
//     const groupedProductsArray = Object.keys(groupedProducts).map((key) => ({
//       product_name: key,
//       products: groupedProducts[key],
//     }));

//     return groupedProductsArray;
//   };

//   const groupProductsByParentProductId = (products) => {
//     const variants = products.filter(
//       (product) => product.parent_product_id !== null
//     );

//     const notVariants = products.filter(
//       (product) => product.parent_product_id === null
//     );

//     notVariants.forEach((product) => {
//       product.variants = variants.filter(
//         (variant) => variant.parent_product_id === product.product_id
//       );

//       if (product.variants.length > 0) {
//         product.variants.push(product);
//       }
//     });

//     return notVariants;
//   };

//   const updateCart = (product, operation) => {
//     const existingProduct = cart.find(
//       (item) => item.product_id === product.product_id
//     );

//     let updatedCart;
//     if (operation === "add") {
//       updatedCart = existingProduct
//         ? cart.map((item) =>
//             item.product_id === product.product_id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         : [...cart, { ...product, quantity: 1 }];
//     } else if (operation === "subtract" && existingProduct) {
//       updatedCart =
//         existingProduct.quantity === 1 || existingProduct.quantity < 0
//           ? cart.filter((item) => item.product_id !== product.product_id)
//           : cart.map((item) =>
//               item.product_id === product.product_id
//                 ? { ...item, quantity: item.quantity - 1 }
//                 : item
//             );
//     } else if (operation === "delete" && existingProduct) {
//       updatedCart = cart.filter(
//         (item) => item.product_id !== product.product_id
//       );
//     }
//     setCart(updatedCart);
//   };

//   return (
//     <TransactionContext.Provider
//       value={{
//         setTransaction,
//         transaction,
//         cart,
//         updateCart,
//         setCart,
//         activeAction,
//         setActiveAction,
//       }}
//     >
//       <DashboardLayout>
//         <PageTitle title="POS" />
//         <POSWrapper>
//           <StyledPanel pos={true}>
//             <SearchBarComponent
//               products={products}
//               setProductDisplay={setProductDisplay}
//             />

//             <ProductsList>
//               {paginatedProducts.map((product, index) => {
//                 // if (productGroup.products.length <= 1) {
//                 // 	return (
//                 // 		<ProductComponent
//                 // 			product={productGroup.products[0]}
//                 // 			index={index}
//                 // 			onClick={() => {
//                 // 				updateCart(productGroup.products[0], "add");
//                 // 				if (activeAction != "cart") setActiveAction("cart");
//                 // 			}}
//                 // 			key={index}
//                 // 			hasVariants={false}
//                 // 		/>
//                 // 	);
//                 // } else {
//                 // 	return (
//                 // 		<ProductComponent
//                 // 			product={productGroup.products[0]}
//                 // 			index={index}
//                 // 			updateCart={updateCart}
//                 // 			key={index}
//                 // 			variants={productGroup.products.slice(1)}
//                 // 		/>
//                 // 	);
//                 // }
//                 return (
//                   <ProductComponent
//                     product={product}
//                     index={index}
//                     onClick={() => {
//                       updateCart(product, "add");
//                       if (activeAction != "cart") setActiveAction("cart");
//                     }}
//                     updateCart={updateCart}
//                     key={index}
//                     hasVariants={product.variants ? true : false}
//                     variants={product.variants ? product.variants : []}
//                   />
//                 );
//               })}
//             </ProductsList>
//           </StyledPanel>

//           <StickyContainer>
//             <Sticky enabled={windowWidth > 1200 ? true : false} top={20}>
//               <POSactions />
//             </Sticky>
//           </StickyContainer>
//         </POSWrapper>
//       </DashboardLayout>
//       <Pagination
//         totalItems={productDisplay.length} // Total number of items
//         itemsPerPage={itemsPerPage}
//         currentPage={currentPage}
//         onPageChange={(newPage) => setCurrentPage(newPage)}
//       />
//     </TransactionContext.Provider>
//   );
// };

// export default Pos;

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
		pickup_date: new Date().toISOString().split("T")[0],
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
