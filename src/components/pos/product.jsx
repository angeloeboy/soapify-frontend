import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { SearchBar } from "@/styled-components/TableControlPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TransactionContext } from "../context/TransactionContext";
import { faAdd, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

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
		/* opacity: ${(props) => (props.active ? "1" : "0.5")}; */
		opacity: 1;
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
		/* width: 100%;
		margin-top: 20px;
		font-size: 14px;
		background-color: #f88181;
		border: 2px solid #eb5151;
		color: black;
		border-radius: 4px;
		padding: 4px 8px;
		display: block; */
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
const StockTitle = styled.p`
	font-family: DM Sans;
	font-size: 14px;
	font-weight: 400;
	line-height: 27px;
	letter-spacing: 0em;
	text-align: center;
	color: white;
	margin: 0;
`;
const StockTitleContainer = styled.div`
	border-radius: 8px;
	width: 87.55px;
	height: 27.29px;
	background-color: #1a69f0;
	margin-top: 30px;
	justify-content: center;
	align-items: center;
`;

const PriceTitle = styled.p`
	color: #005eff;
	font-family: DM Sans;
	font-size: 18px;
	font-weight: 500;
	line-height: 23px;
	letter-spacing: 0em;
	text-align: left;
	margin-top: 8px;
`;

const Attributes = styled.div`
	margin-top: 16px;
`;

const Attribute = styled.p`
	background-color: ${(props) => props.color.backgroundColor};
	color: ${(props) => props.color.fontColor};
	font-size: 12px;
	font-weight: bold;
	display: inline-block;
	padding: 4px;
	border-radius: 4px;
	margin: 0px 4px 4px 0px;
`;

const ProductComponent = ({ product, onClick, index }) => {
	const { cart, setCart, updateCart } = useContext(TransactionContext);

	const [item, setItem] = useState({});

	useEffect(() => {
		let item = cart.find((item) => item.product_id == product.product_id);
		// console.log(item)
		if (item) setItem(item);
		else setItem({ ...product, quantity: 0 });
	}, [cart]);

	let handleProductClick = () => {
		product.quantity_in_stock <= 0 ? null : onClick();
		return;

		// if (!showVariants) setShowVariants(true);
	};

	return (
		<Product key={product.product_id} onClick={() => handleProductClick()} unclickable={product.quantity_in_stock <= 0} active={item.quantity > 0}>
			<div>
				<Image src="/sabon.png" width={200} height={400} alt="Product image" />
				<ProductTitle>{product.product_name}</ProductTitle>
				<PriceTitle>P{product.product_price / 100}</PriceTitle>
				<Attributes>
					{product.attribute.map((attribute, attributeIndex) => {
						const combinedIndex = index * product.attribute.length + attributeIndex;

						if (attribute.value == "None" || !attribute.value) return null;
						return (
							<Attribute color={generateColors(combinedIndex)} key={attributeIndex}>
								{attribute.name}: {attribute.value}
							</Attribute>
						);
					})}
				</Attributes>
			</div>

			<div className="quantity">
				<span
					onClick={(e) => {
						e.stopPropagation();
						if (item.quantity == 0) return;
						updateCart(item, "subtract");
					}}
					className="minus"
				>
					<FontAwesomeIcon icon={faMinus} />
				</span>
				<input
					type="text"
					value={item.quantity ? item.quantity : 0}
					onChange={(e) => {
						const valueAsString = e.target.value;
						const valueAsNumber = Number(valueAsString); // convert to number

						if (valueAsString === "") {
							let updatedCart = cart.map((product) => (product.product_id === item.product_id ? { ...product, quantity: 0 } : product));
							setCart(updatedCart);
							return;
						}

						if (!isNaN(valueAsNumber) && valueAsNumber >= 0) {
							let updatedCart = cart.map((product) => (product.product_id === item.product_id ? { ...product, quantity: valueAsNumber } : product));
							setCart(updatedCart);
						}
					}}
					onKeyDown={(e) => {
						const valueAsString = e.target.value;
						const valueAsNumber = Number(valueAsString);

						if (e.key === "ArrowUp") {
							let updatedCart = cart.map((product) => (product.product_id === item.product_id ? { ...product, quantity: valueAsNumber + 1 } : product));
							setCart(updatedCart);
						} else if (e.key === "ArrowDown") {
							if (valueAsNumber > 0) {
								let updatedCart = cart.map((product) => (product.product_id === item.product_id ? { ...product, quantity: valueAsNumber - 1 } : product));
								setCart(updatedCart);
							}
						}
					}}
				/>

				<span onClick={() => updateCart(item, "add")}>
					<FontAwesomeIcon icon={faPlus} />
				</span>
			</div>

			<StockTitleContainer>
				<StockTitle>Stock: {product.quantity_in_stock}</StockTitle>
			</StockTitleContainer>
		</Product>
	);
};

const generateColors = (index) => {
	// Helper: Calculate luminance
	const getLuminance = (r, g, b) => {
		const getComponent = (c) => {
			c /= 255;
			return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
		};
		return 0.2126 * getComponent(r) + 0.7152 * getComponent(g) + 0.0722 * getComponent(b);
	};

	const hue = ((index * 360) / 6) % 360; // Assuming you have at most 10 products. Adjust accordingly.

	// Convert HSL to RGB (for luminance calculation)
	let chroma = (1 - Math.abs(2 * 0.5 - 1)) * 1;
	let x = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
	let [r, g, b] =
		hue < 60
			? [chroma, x, 0]
			: hue < 120
			? [x, chroma, 0]
			: hue < 180
			? [0, chroma, x]
			: hue < 240
			? [0, x, chroma]
			: hue < 300
			? [x, 0, chroma]
			: [chroma, 0, x];

	r = Math.round((r + (0.5 - chroma)) * 255);
	g = Math.round((g + (0.5 - chroma)) * 255);
	b = Math.round((b + (0.5 - chroma)) * 255);

	const bgColor = `rgb(${r}, ${g}, ${b})`;
	const fontColor = getLuminance(r, g, b) > 0.5 ? "black" : "white";

	return {
		backgroundColor: bgColor,
		fontColor: fontColor,
	};
};

// const VariantsContainer = ({ variants, updateCart, setShowVariants }) => {
// 	const [variantsV, setVariantsV] = useState(variants);
// 	const [search, setSearch] = useState("");
// 	const [variantsDisplay, setVariantsDisplay] = useState(variants);

// 	useEffect(() => {
// 		const activeVariants = variantsV.filter((variant) => variant.isActive == 1);

// 		setVariantsDisplay(activeVariants);
// 		setVariantsV(activeVariants);
// 	}, [variants]);

// 	let handleProductClick = (variant) => {
// 		const remove_variants = { ...variant };
// 		delete remove_variants.variants;

// 		console.log(remove_variants);

// 		variant.quantity_in_stock <= 0 ? null : updateCart(remove_variants, "add");
// 		toast.success("Added to cart");
// 	};

// 	let handleSearch = (e) => {
// 		// setSearch(e.target.value);
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
// 					{variantsDisplay.map((variant, index) => (
// 						<Product key={variant.product_id} onClick={() => handleProductClick(variant)} unclickable={variant.quantity_in_stock <= 0}>
// 							<div>
// 								<Image src="/sabon.png" width={200} height={400} alt="Product image" />
// 								<ProductTitle>{variant.product_name}</ProductTitle>
// 								<PriceTitle>P{variant.product_price / 100}</PriceTitle>
// 								<Attributes>
// 									{variant.attribute.map((attribute, attributeIndex) => {
// 										const combinedIndex = index * variant.attribute.length + attributeIndex;

// 										return (
// 											<Attribute color={generateColors(combinedIndex)} key={attributeIndex}>
// 												{attribute.name}: {attribute.value}
// 											</Attribute>
// 										);
// 									})}
// 								</Attributes>
// 							</div>

// 							<StockTitleContainer>
// 								<StockTitle>Stock: {variant.quantity_in_stock}</StockTitle>
// 							</StockTitleContainer>
// 						</Product>
// 					))}
// 				</div>

// 				<p
// 					onClick={() => {
// 						console.log("testing");
// 						setShowVariants(false);
// 					}}
// 				>
// 					close
// 				</p>
// 			</div>
// 		</VariantsModalWrapper>
// 	);
// };

export default ProductComponent;
