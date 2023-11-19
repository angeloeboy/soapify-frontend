import Image from "next/image";
import { useState, useEffect, useContext, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { SearchBar } from "@/styled-components/TableControlPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { TransactionContext } from "../context/TransactionContext";
import ProductComponent from "./product";
import useOutsideClick from "@/hooks/useOutsideclick";

const Product = styled.div`
	display: flex;
	position: relative;
	align-self: stretch;
	justify-content: space-between;
	border: 1px solid #dddd;
	flex-direction: column;
	border-radius: 18px;
	padding: 14px;
	margin: 8px;
	overflow: hidden;
	width: 100%;
	max-width: 230.31px;
	cursor: ${({ unclickable }) => (unclickable ? "no-drop" : "pointer")};
	transition: all 0.3s ease;
	opacity: ${({ unclickable }) => (unclickable ? "0.5" : "1")};
	&:hover {
		border: ${({ unclickable }) => (unclickable ? "1px solid #dddd" : "1px solid #005eff")};
		background-color: ${({ unclickable }) => (unclickable ? "none" : "#f8f8f8b3")};
	}
	img {
		margin: 0 auto;
		background-color: rgba(248, 248, 248, 1);
		max-height: 200px;
		border-radius: 8px;
		width: auto;
	}

	button {
		margin-top: 27px;
	}

	@media (max-width: 1100px) {
		/* width: 100%; */
		margin: 8px 0px;

		max-width: 200px;

		img {
			max-height: 100px;
		}
	}

	.quantity {
		display: inline-flex;
		/* margin-left: auto; */
		align-items: center;
		align-self: flex-end;
		font-size: 16px;
		margin-top: 16px;
		margin-right: auto;
		p {
			padding: 0px 16px;
		}

		input {
			border: none;
			background-color: transparent;
			width: 70px;
			text-align: center;
			outline: none;
		}
		span {
			border-radius: 4px;
			background: #1a69f0;
			width: 21px;
			height: 21px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 8px;
			font-size: 10px;
			cursor: pointer;
			svg {
				color: #ffffff;

				path {
					color: #ffffff;
				}
			}
		}
	}

	.minus {
		opacity: ${(props) => (props.active ? "1" : "0.5")};
	}

	.delete {
		align-self: center;
		cursor: pointer;
		margin-right: 16px;
		path {
			color: #bebebe !important;
		}

		&:hover {
			path {
				color: #f88181 !important;
			}
		}
	}

	.remove {
		font-size: 14px;
		color: #ff00007d;
		text-decoration: underline;
		cursor: pointer;
		margin-top: 16px;
	}
`;

const ProductTitle = styled.p`
	margin-top: 27px;
	font-family: DM Sans;
	font-size: 18px;
	font-weight: 500;
	line-height: 23px;
	letter-spacing: 0em;
	text-align: left;
	width: 180px;
	/* height: 23px; */
	top: 943px;
	left: 127px;
	color: rgba(0, 0, 0, 1);
`;

const HasVariants = styled.div`
	position: absolute;
	top: 25px;
	right: -20%;
	color: white;
	background-color: #1a69f0;
	padding: 5px 50px;
	transform: rotate(45deg);
	font-size: 12px;
	/* width: 100px; */
`;

const VariantsModalWrapper = styled.div`
	background-color: rgba(22, 28, 39, 0.425);
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0px;
	left: 0px;
	backdrop-filter: blur(3.5px);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 9999;

	.group_modal {
		height: 90vh;
		padding: 20px 18px;
		max-width: 800.57px;
		width: 90%;
		background: rgb(255, 255, 255);
		border-radius: 15px;
		overflow: auto;
		z-index: 100;
		padding-top: 60px;
		/* position: relative; */

		.variants-wrapper {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
		}
		.group_item {
			margin-bottom: 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.group_item_info {
				display: flex;
				align-items: center;

				.group_item_img {
					margin-right: 20px;
					width: 95px;
					height: 54px;
					border-radius: 13px;
					img {
						width: 100%;
						height: 100%;
						-o-object-fit: cover;
						object-fit: cover;
						overflow: hidden;
					}
				}
				.group_item_price {
					display: block;
				}
			}

			button {
				width: 100px;
				height: 36.876px;
				border-radius: 4px;
				background: #054dd1;
				border: none;
				cursor: pointer;
				&:hover {
					background: #0844a6;
				}
			}
			@media (max-width: 768px) {
				flex-direction: column;
				align-items: flex-start;
				.group_item_info {
					margin-bottom: 10px;
				}
			}
		}
	}
`;

// const ParentProductDisplay = ({ parentProduct, onClick, index, variants, updateCart }) => {
// 	const [showVariants, setShowVariants] = useState(false);
// 	const variantsRef = useRef(null); // Ref for the VariantsContainer

// 	useEffect(() => {
// 		// Function to check if the click is outside the VariantsContainer
// 		const handleClickOutside = (event) => {
// 			if (variantsRef.current && !variantsRef.current.contains(event.target)) {
// 				setShowVariants(false);
// 			}
// 		};

// 		// Add click event listener
// 		document.addEventListener("mousedown", handleClickOutside);

// 		// Clean up
// 		return () => {
// 			document.removeEventListener("mousedown", handleClickOutside);
// 		};
// 	}, [variantsRef]);

// 	let handleProductClick = () => {
// 		if (!showVariants) setShowVariants(true);
// 	};

// 	return (
// 		<Product key={parentProduct.parent_product_id} onClick={() => handleProductClick()}>
// 			<div>
// 				<Image src="/sabon.png" width={200} height={400} alt="Product image" />
// 				<ProductTitle>{parentProduct.name}</ProductTitle>
// 			</div>

// 			{parentProduct.products.length > 0 ? (
// 				<HasVariants>
// 					{`Has ${parentProduct.products.filter((product) => product.quantity_in_stock > 0).length} variant${
// 						parentProduct.products.filter((product) => product.quantity_in_stock > 0).length > 1 ? "s" : ""
// 					}`}
// 				</HasVariants>
// 			) : null}
// 			{showVariants && (
// 				<div ref={variantsRef}>
// 					<VariantsContainer variants={parentProduct.products} updateCart={updateCart} setShowVariants={setShowVariants} />
// 				</div>
// 			)}
// 		</Product>
// 	);
// };

// const VariantsContainer = ({ variants, updateCart, setShowVariants }) => {
// 	const [variantsV, setVariantsV] = useState(variants);
// 	const [search, setSearch] = useState("");
// 	const [variantsDisplay, setVariantsDisplay] = useState(variants);

// 	const { activeAction, setActiveAction } = useContext(TransactionContext);

// 	useEffect(() => {
// 		const activeVariants = variantsV.filter((variant) => variant.isActive == 1);

// 		setVariantsDisplay(activeVariants);
// 		setVariantsV(activeVariants);
// 	}, [variants]);

// 	let handleSearch = (e) => {
// 		const searchQuery = e.target.value;
// 		const queryTerms = searchQuery.split(" ");

// 		let filteredVariants;

// 		filteredVariants = variantsV.filter((product) => {
// 			return queryTerms.every(
// 				(term) =>
// 					product.product_name.toLowerCase().includes(term.toLowerCase()) ||
// 					(product.attribute && product.attribute.some((attr) => attr.value.toLowerCase().includes(term.toLowerCase())))
// 			);
// 		});

// 		setVariantsDisplay(filteredVariants);
// 		console.log("teststst");
// 	};

// 	return (
// 		<VariantsModalWrapper>
// 			<div className="group_modal">
// 				<SearchBar>
// 					<input type="text" onChange={(e) => handleSearch(e)} />
// 				</SearchBar>

// 				<div className="variants-wrapper">
// 					{variantsDisplay.map((product, index) => {
// 						if (product.quantity_in_stock <= 0) return null;
// 						return (
// 							<ProductComponent
// 								product={product}
// 								index={index}
// 								onClick={() => {
// 									updateCart(product, "add");
// 									if (activeAction != "cart") setActiveAction("cart");
// 								}}
// 								key={index}
// 							/>
// 						);
// 					})}
// 				</div>

// 				<p
// 					onClick={() => {
// 						setShowVariants(false);
// 					}}
// 				>
// 					close
// 				</p>
// 			</div>
// 		</VariantsModalWrapper>
// 	);
// };

// export default ParentProductDisplay;

const ParentProductDisplay = ({ parentProduct, updateCart }) => {
	const [showVariants, setShowVariants] = useState(false);
	const variantsRef = useRef(null);
	const { activeAction, setActiveAction } = useContext(TransactionContext);

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (variantsRef.current && !variantsRef.current.contains(event.target)) {
				setShowVariants(false);
			}
		};

		const handleKeyDown = (event) => {
			if (event.key === "Escape") {
				setShowVariants(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, []);

	// useEffect(() => {
	// 	const handleClickOutside = (event) => {
	// 		if (variantsRef.current && !variantsRef.current.contains(event.target)) {
	// 			setShowVariants(false);
	// 		}
	// 	};

	// 	// Add click event listener to the document
	// 	document.addEventListener("mousedown", handleClickOutside);

	// 	return () => {
	// 		// Remove event listener on cleanup
	// 		document.removeEventListener("mousedown", handleClickOutside);
	// 	};
	// }, [variantsRef, setShowVariants]); // Add setShowVariants as a dependency

	const handleProductClick = () => setShowVariants(!showVariants);

	const variantCount = parentProduct.products.filter((p) => p.quantity_in_stock > 0).length;

	return (
		<Product key={parentProduct.parent_product_id} onClick={handleProductClick}>
			<div>
				<Image src="/sabon.png" width={200} height={400} alt="Product image" />
				<ProductTitle>{parentProduct.name}</ProductTitle>
			</div>

			{parentProduct.products.length > 0 ? (
				<HasVariants>
					{`Has ${parentProduct.products.filter((product) => product.quantity_in_stock > 0).length} variant${
						parentProduct.products.filter((product) => product.quantity_in_stock > 0).length > 1 ? "s" : ""
					}`}
				</HasVariants>
			) : null}
			{variantCount > 0 && <HasVariants>{`Has ${variantCount} variant${variantCount > 1 ? "s" : ""}`}</HasVariants>}

			{showVariants && (
				<div ref={variantsRef}>
					<VariantsContainer variants={parentProduct.products} updateCart={updateCart} setShowVariants={setShowVariants} />
				</div>
			)}
		</Product>
	);
};

const VariantsContainer = ({ variants, updateCart, setShowVariants }) => {
	const [search, setSearch] = useState("");
	const [variantsDisplay, setVariantsDisplay] = useState(variants);
	const { activeAction, setActiveAction } = useContext(TransactionContext);

	useEffect(() => {
		setVariantsDisplay(variants.filter((v) => v.isActive == 1));
	}, [variants]);

	const handleSearch = (e) => {
		const searchQuery = e.target.value.toLowerCase();
		setSearch(searchQuery);

		setVariantsDisplay(
			variants.filter((product) => {
				return (
					product.product_name.toLowerCase().includes(searchQuery) ||
					(product.attribute && product.attribute.some((attr) => attr.value.toLowerCase().includes(searchQuery)))
				);
			})
		);
	};

	const handleContainerClick = (event) => {
		event.stopPropagation(); // Prevents click inside the container from propagating
	};

	return (
		<VariantsModalWrapper>
			<div className="group_modal" onClick={handleContainerClick}>
				<SearchBar>
					<input type="text" value={search} onChange={handleSearch} />
				</SearchBar>

				<div className="variants-wrapper">
					{variantsDisplay.map((product, index) => {
						if (product.quantity_in_stock <= 0) return null;
						return (
							<ProductComponent
								product={product}
								index={index}
								onClick={() => {
									updateCart(product, "add");
									if (activeAction != "cart") setActiveAction("cart");
								}}
								key={index}
							/>
						);
					})}
				</div>

				<p onClick={() => setShowVariants(false)}>close</p>
			</div>
		</VariantsModalWrapper>
	);
};

export default ParentProductDisplay;
