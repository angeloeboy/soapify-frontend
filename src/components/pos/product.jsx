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
	width: 31%;
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
		/* width: 100%; */
		background-color: rgba(248, 248, 248, 1);
		width: 247.36px;
		height: 180.34px;
		top: 347px;
		left: 692.53px;
		border-radius: 8px;
	}

	button {
		margin-top: 27px;
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
	height: 23px;
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

const ProductComponent = ({ product, onClick }) => (
	<Product key={product.product_id} onClick={() => (product.quantity_in_stock <= 0 ? null : onClick())} unclickable={product.quantity_in_stock <= 0}>
		<Image src="/sabon.png" width={200} height={200} alt="Product image" />
		<ProductTitle>{product.product_name}</ProductTitle>
		<PriceTitle>P{product.product_price / 100}</PriceTitle>
		<p>{product.category.name}</p>
		<StockTitleContainer>
			<StockTitle>Stock: {product.quantity_in_stock}</StockTitle>
		</StockTitleContainer>
	</Product>
);

export default ProductComponent;
