import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StyledPanel, { BigTitle, FieldTitle } from "@/styled-components/StyledPanel";
import { styled } from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import Image from "next/image";
import Button from "@/components/misc/button";
import POSactions from "@/components/pos/posActions";
import { getProducts } from "@/api/products";
import PageTitle from "@/components/misc/pageTitle";
import Sticky from "react-stickynode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ButtonAddAccountType } from "@/styled-components/ItemActionModal";
const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	background-color: transparent; /* Make the background transparent */
	margin-bottom: 20px; /* Add margin-bottom to create a gap between SearchBar and CategoriesButton */
`;

const SearchIcon = styled.img`
	position: absolute;
	top: 50%;
	left: 20px; /* Adjust the left position as needed */
	transform: translateY(-50%);
	width: 20px;
	height: 20px;
	cursor: pointer;
`;

const SearchBar = styled.input`
	width: 592px;
	padding: 10px 30px 10px 50px; /* Add padding on both sides for the icon */
	border: 1px solid #dddd;
	border-radius: 4px;
	font-size: 14px;
	border-radius: 12px;
	margin: 0;
`;

const CategoriesButton = styled.button`
	color: black;
	background-color: transparent; /* Make the background transparent */
	border: 1px solid #dddd; /* Add a border around the button */
	font-size: 6px;
	cursor: pointer;
	padding: 8px 15px;
	display: flex;
	align-items: center;
	gap: 10px;
	border-radius: 12px;
	margin-left: 16px;
	min-width: 108px;
`;

const FilterIcon = styled.img`
	width: 20px;
	height: 20px;
`;
const ButtonFilter = styled.button`
	color: black;
	border-radius: 12px;
	padding: 10px 20px;
	border: none;
	margin: 5px;
	font-size: 16px;
	cursor: pointer;
	width: 130.027px;
	height: 45.2px;
	flex-shrink: 0;
	font-family: Arial;
	background-color: #f8f8f8;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
`;

const ProductsList = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 1200px;
	align-items: center;
`;

const Product = styled.div`
	/* display: flex; */
	align-items: center;
	justify-content: center;
	border: 1px solid #dddd;
	flex-direction: column;
	border-radius: 18px;
	padding: 25px;
	margin: 8px;
	/* width: 262px; */
	width: 31%;
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

const ProductsListContainer = styled.div`
	margin-right: 16px;
`;

// const InfoContainer = styled.div`
// 	display: flex;
// 	align-items: center;
// 	justify-content: space-between; /* Add this property to create space between the two elements */
// 	width: 100%;
// 	margin-top: 16px;
// 	@media (max-width: 768px) {
// 		flex-direction: column;
// 		align-items: center; /* Adjust as per your design needs */
// 		padding: 10px 16px;
// 	}
// `;

const Price = styled.p`
	font-size: 14px;
	font-weight: bold;
	color: #005eff;

	@media (max-width: 768px) {
		margin-top: 10px;
	}
`;

const ProductNameAndStock = styled.div`
	max-width: 70%;
	p {
		color: rgba(0, 32, 86, 0.5);
		font-family: DM Sans;
		font-size: 14px;
		font-style: normal;
		font-weight: 500;
		line-height: normal;
		/* padding: 15px; */
		margin-bottom: 6px;
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

const POSWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StickyContainer = styled.div`
	position: relative;
	width: 100%;
	max-width: 500px;
	margin-top: 48px;
`;

const ButtonAll = styled.button`
    color: black;
	border-radius: 12px;
	padding: 10px 20px;
	border: none;
	margin: 5px;
	font-size: 16px;
	cursor: pointer;
     height:  40.2px;
    flex-shrink: 0;
	font-family: Arial;
	background-color: #F8F8F8;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	width: 108.85px;
   

`

const Pos = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [productDisplay, setProductDisplay] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		setProductDisplay(products);
	}, [products]);

	const fetchProducts = async () => {
		const response = await getProducts();
		const productData = response.products || [];
		setProducts(productData);
	};

	const handleSearch = (e) => {
		const query = e.target.value;
		setSearchQuery(query);

		const filteredProducts = query ? products.filter((product) => product.product_name.toLowerCase().includes(query.toLowerCase())) : products;

		setProductDisplay(filteredProducts);
	};

	const updateCart = (product, operation) => {
		const existingProduct = cart.find((item) => item.product_id === product.product_id);

		if (operation === "add") {
			if (existingProduct) {
				setCart(cart.map((item) => (item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item)));
			} else {
				setCart([...cart, { ...product, quantity: 1 }]);
			}
		} else if (operation === "subtract") {
			if (existingProduct?.quantity === 1) {
				setCart(cart.filter((item) => item.product_id !== product.product_id));
			} else {
				setCart(cart.map((item) => (item.product_id === product.product_id ? { ...item, quantity: item.quantity - 1 } : item)));
			}
		}
	};

	return (
		<DashboardLayout>
			<PageTitle title="POS" />

			<POSWrapper>
				<StyledPanel pos>
				<SearchBarContainer>
  <div className="searchBar" style={{ display: "flex", alignItems: "center" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginRight: "16px" }} className="searchBarInput">
      <p style={{ marginBottom: "8px", color: "black" }}>Search for Product</p>
      <input
        style={{
          width: "592.5px",
          padding: "8px 8px 8px 36px", // Add padding on the left for the icon
          border: "1px solid #ddd",
          borderRadius: "12px",
          fontSize: "14px",
          backgroundImage: `url("/Search.png")`,
          backgroundPosition: "10px center", // Adjust position as needed
          backgroundRepeat: "no-repeat",
          backgroundSize: "20px auto", // Adjust size as needed
        }}
        type="text"
        placeholder="Search"
      />
    </div>

    <div style={{ display: "flex", marginLeft: "16px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "36px" }}>
        <p style={{ marginBottom: "0", textAlign: "center" }}>Categories</p>
        <ButtonAll>
          <FontAwesomeIcon icon={faFilter} />
          All
        </ButtonAll>
      </div>
    </div>
  </div>
</SearchBarContainer>

					<ProductsList>
						{productDisplay.map((product) => (
							<Product key={product.product_id}>
								<Image src="/sabon.png" width={200} height={200} alt="Product image" />
								<ProductTitle>{product.product_name}</ProductTitle>
								<PriceTitle>P{product.product_price / 100}</PriceTitle>
								<StockTitleContainer>
									<StockTitle>Stock: {product.quantity_in_stock}</StockTitle>
								</StockTitleContainer>
								<Button onClick={() => updateCart(product, "add")} width={"100%"}>
									Add
								</Button>
							</Product>
						))}
					</ProductsList>
				</StyledPanel>

				<StickyContainer>
					<Sticky enabled={true} top={20}>
						<POSactions cart={cart} minusToCart={(product) => updateCart(product, "subtract")} addToCart={(product) => updateCart(product, "add")} />
					</Sticky>
				</StickyContainer>
			</POSWrapper>
		</DashboardLayout>
	);
};

export default Pos;
