import Image from "next/image";
import { styled } from "styled-components";

const Product = styled.div`
	align-items: center;
	justify-content: center;
	border: 1px solid #dddd;
	flex-direction: column;
	border-radius: 18px;
	padding: 25px;
	margin: 8px;
	/* width: 31%; */
	width: 100%;
	z-index: 1;
	max-width: 269.31px;
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

const ProductComponent = ({ product, onClick, index }) => (
	<Product key={product.product_id} onClick={() => (product.quantity_in_stock <= 0 ? null : onClick())} unclickable={product.quantity_in_stock <= 0}>
		<Image src="/sabon.png" width={200} height={400} alt="Product image" />
		<ProductTitle>{product.product_name}</ProductTitle>
		<PriceTitle>P{product.product_price / 100}</PriceTitle>
		<Attributes>
			{product.attribute.map((attribute, attributeIndex) => {
				const combinedIndex = index * product.attribute.length + attributeIndex;

				return (
					<Attribute color={generateColors(combinedIndex)} key={attributeIndex}>
						{attribute.name}: {attribute.value}
					</Attribute>
				);
			})}
		</Attributes>
		<StockTitleContainer>
			<StockTitle>Stock: {product.quantity_in_stock}</StockTitle>
		</StockTitleContainer>
	</Product>
);

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

export default ProductComponent;
