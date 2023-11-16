import Image from "next/image";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { styled } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { SearchBar } from "@/styled-components/TableControlPanel";

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

const ProductComponent = ({ product, onClick, index, variants, updateCart }) => {
	const [showVariants, setShowVariants] = useState(false);

	let handleProductClick = () => {
		if (variants.length == 0) {
			product.quantity_in_stock <= 0 ? null : onClick();
			return;
		}

		if (!showVariants) setShowVariants(true);
	};

	return (
		<Product key={product.product_id} onClick={() => handleProductClick()} unclickable={product.quantity_in_stock <= 0}>
			<div>
				<Image src="/sabon.png" width={200} height={400} alt="Product image" />
				<ProductTitle>{product.product_name}</ProductTitle>
				<PriceTitle>P{product.product_price / 100}</PriceTitle>
				<Attributes>
					{variants.length == 0 &&
						product.attribute.map((attribute, attributeIndex) => {
							const combinedIndex = index * product.attribute.length + attributeIndex;

							return (
								<Attribute color={generateColors(combinedIndex)} key={attributeIndex}>
									{attribute.name}: {attribute.value}
								</Attribute>
							);
						})}
				</Attributes>
			</div>

			{variants.length == 0 && (
				<StockTitleContainer>
					<StockTitle>Stock: {product.quantity_in_stock}</StockTitle>
				</StockTitleContainer>
			)}
			{variants.length > 0 ? <HasVariants>Has {variants.length} Variants</HasVariants> : null}
			{showVariants && <VariantsContainer variants={variants} updateCart={updateCart} setShowVariants={setShowVariants} />}
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

const VariantsContainer = ({ variants, updateCart, setShowVariants }) => {
	const [variantsV, setVariantsV] = useState(variants);
	const [search, setSearch] = useState("");
	const [variantsDisplay, setVariantsDisplay] = useState(variants);

	useEffect(() => {
		const activeVariants = variantsV.filter((variant) => variant.isActive == 1);

		setVariantsDisplay(activeVariants);
		setVariantsV(activeVariants);
	}, [variants]);

	let handleProductClick = (variant) => {
		const remove_variants = { ...variant };
		delete remove_variants.variants;

		console.log(remove_variants);

		variant.quantity_in_stock <= 0 ? null : updateCart(remove_variants, "add");
		toast.success("Added to cart");
	};

	let handleSearch = (e) => {
		// setSearch(e.target.value);
		const searchQuery = e.target.value;
		const queryTerms = searchQuery.split(" ");

		let filteredVariants;

		filteredVariants = variantsV.filter((product) => {
			return queryTerms.every(
				(term) =>
					product.product_name.toLowerCase().includes(term.toLowerCase()) ||
					(product.attribute && product.attribute.some((attr) => attr.value.toLowerCase().includes(term.toLowerCase())))
			);
		});

		setVariantsDisplay(filteredVariants);
		console.log("teststst");
	};

	return (
		<VariantsModalWrapper>
			<div className="group_modal">
				<SearchBar>
					<input type="text" onChange={(e) => handleSearch(e)} />
				</SearchBar>

				<div className="variants-wrapper">
					{variantsDisplay.map((variant, index) => (
						<Product key={variant.product_id} onClick={() => handleProductClick(variant)} unclickable={variant.quantity_in_stock <= 0}>
							<div>
								<Image src="/sabon.png" width={200} height={400} alt="Product image" />
								<ProductTitle>{variant.product_name}</ProductTitle>
								<PriceTitle>P{variant.product_price / 100}</PriceTitle>
								<Attributes>
									{variant.attribute.map((attribute, attributeIndex) => {
										const combinedIndex = index * variant.attribute.length + attributeIndex;

										return (
											<Attribute color={generateColors(combinedIndex)} key={attributeIndex}>
												{attribute.name}: {attribute.value}
											</Attribute>
										);
									})}
								</Attributes>
							</div>

							<StockTitleContainer>
								<StockTitle>Stock: {variant.quantity_in_stock}</StockTitle>
							</StockTitleContainer>
						</Product>
					))}
				</div>

				<p
					onClick={() => {
						console.log("testing");
						setShowVariants(false);
					}}
				>
					close
				</p>
			</div>
		</VariantsModalWrapper>
	);
};

export default ProductComponent;
