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

const AllText = styled.span`
	font-size: 16px;
	font-weight: bold;
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
	}

	button {
		margin-top: 27px;
	}
`;

const ProductsListContainer = styled.div`
	margin-right: 16px;
`;

const InfoContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between; /* Add this property to create space between the two elements */
	width: 100%;
	margin-top: 16px;
	@media (max-width: 768px) {
		flex-direction: column;
		align-items: center; /* Adjust as per your design needs */
		padding: 10px 16px;
	}
`;

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

	return (
		<DashboardLayout>
			<PageTitle title="POS" />

			<POSWrapper>
				<StyledPanel pos>
					<FieldTitle>Search for Product</FieldTitle>

					<SearchBarContainer>
						<SearchIcon src="./search.png" alt="Search Icon" />
						<SearchBar type="text" placeholder="Search" value={searchQuery} onChange={(e) => searchProduct(e)} />
						<CategoriesButton>
							<FilterIcon src="./Filter.png" alt="Filter Icon" />
							<AllText>All</AllText>
						</CategoriesButton>
					</SearchBarContainer>

					<ProductsList>
						{productDisplay.map((product) => {
							return (
								<Product key={product.product_id}>
									<Image src="/sabon.png" width={200} height={200} alt="Product image" />

									<InfoContainer>
										<ProductNameAndStock>
											<p>{product.product_name}</p>
											<p>Stock: {product.quantity_in_stock}</p>
										</ProductNameAndStock>
										<Price>P{product.product_price / 100}</Price>
									</InfoContainer>
									<Button onClick={() => addToCart(product)} width={"100%"}>
										Add
									</Button>
								</Product>
							);
						})}
					</ProductsList>
				</StyledPanel>
				<StickyContainer>
					<Sticky enabled={true} top={20}>
						<POSactions cart={cart} minusToCart={minusToCart} addToCart={addToCart} />
					</Sticky>
				</StickyContainer>

				{/* <POSactions cart={cart} minusToCart={minusToCart} addToCart={addToCart} /> */}
			</POSWrapper>
		</DashboardLayout>
	);
};

export default Home;
