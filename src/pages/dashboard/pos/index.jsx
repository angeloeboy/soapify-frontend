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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
 
const SearchBarContainer = styled.div`
	display: flex;
	align-items: center;
	position: relative;
	background-color: transparent; /* Make the background transparent */
	margin-bottom: 20px; /* Add margin-bottom to create a gap between SearchBar and CategoriesButton */
`;

 

const SearchBar = styled.input`
	width: 592px;
	padding: 10px 30px 10px 50px; /* Add padding on both sides for the icon */
	border: 1px solid #dddd;
	border-radius: 4px;
	font-size: 14px;
	border-radius: 12px;
	margin-right:1;
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
		background-color: #F8F8F8;
		width: 247px;
        height: 180px;
        border-radius:8px;

	}

	button {
		margin-top: 27px;
	}
`;
 
const InfoContainer = styled.div`
display: flex;
flex-direction: column; /* Align items vertically */
justify-content: space-between;
align-items: left; /* Align items to the left */
width: 100%;
margin-top: 16px;
@media (max-width: 768px) {
	flex-direction: column;
	align-items: center; /* Adjust as per your design needs */
	padding: 10px 16px;
}
`;

  
const POSWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

const StockTitleContainer = styled.div`
  display: flex;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  margin-top: 30px; 
  width: 87.54px;
  height: 27.29px;
  background-color: #1A69F0;
  border-radius: 8px;
`;

const StockTitle = styled.p`
  font-size: 14px;
  font-weight: normal;
  margin: 0;
  color: #FFFFFF;
 
`;

const PriceTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #005eff;
  margin-top: 8px;
  margin: 0;
`;

const ProductTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 32px;
  color: #000000;
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
 
const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [productDisplay, setProductDisplay] = useState([]);

	useEffect(() => {
		getProductsFunc();
	}, []);

	useEffect(() => {
		setProductDisplay(products);
	}, [products]);

	const getProductsFunc = () => {
		getProducts().then((res) => {
			console.log(res);
			res.products ? setProducts(res.products) : setProducts([]);
			// setProductsLoading(false);
		});
	};

	const searchProduct = (e) => {
		setSearchQuery(e.target.value);

		if (e.target.value.length > 0) {
			const filteredProducts = products.filter((product) => {
				return product.product_name.toLowerCase().includes(e.target.value.toLowerCase());
			});

			setProductDisplay(filteredProducts);
		} else {
			getProductsFunc();
		}
	};

	const addToCart = (product) => {
		const existingProduct = cart.find((item) => item.product_id === product.product_id);

		if (existingProduct) {
			const updatedCart = cart.map((item) => {
				if (item.product_id === product.product_id) {
					return {
						...item,
						quantity: item.quantity + 1,
					};
				}

				return item;
			});

			setCart(updatedCart);
		} else {
			setCart([...cart, { ...product, quantity: 1 }]);
		}
	};

	//minus to cart
	const minusToCart = (product) => {
		const existingProduct = cart.find((item) => item.product_id === product.product_id);

		if (existingProduct.quantity === 1) {
			const updatedCart = cart.filter((item) => item.product_id !== product.product_id);
			setCart(updatedCart);
		} else {
			console.log(cart);

			console.log(product.product_id);
			const updatedCart = cart.map((item) => {
				if (item.product_id === product.product_id) {
					return {
						...item,
						quantity: item.quantity - 1,
					};
				} else {
					return item;
				}
			});

			console.log(updatedCart);

			setCart(updatedCart);
		}
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
						{productDisplay.map((product) => {
							return (
								<Product key={product.product_id}>
									<Image src="/sabon.png" width={200} height={200} alt="Product image" />

									<InfoContainer>
										 
										<ProductTitle>	{product.product_name}</ProductTitle>
										<PriceTitle>P{product.product_price / 100}</PriceTitle>
										<StockTitleContainer><StockTitle> Stock: {product.quantity_in_stock} </StockTitle> </StockTitleContainer>	  
										<Button onClick={() => updateCart(product, "add")} width={"100%"}>
									         Add
								        </Button>
									</InfoContainer>
									 
								</Product>
							);
						})}
					</ProductsList>
				</StyledPanel>

				<POSactions cart={cart} minusToCart={(product) => updateCart(product, "subtract")} addToCart={(product) => updateCart(product, "add")} />
 
				{/* <POSactions cart={cart} minusToCart={minusToCart} addToCart={addToCart} /> */}
			</POSWrapper>
		</DashboardLayout>
	);
};

export default Home;