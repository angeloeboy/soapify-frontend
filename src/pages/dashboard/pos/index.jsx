import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import StyledPanel, { BigTitle, FieldTitle } from "@/styled-components/StyledPanel";
import { styled } from "styled-components";
import Sidebar from "@/components/sidebar";
import DashboardLayout from "@/components/dashboardLayout";
import Image from "next/image";
import Button from "@/components/button";
import POSactions from "@/components/pos/posActions";

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
	border-right: 1px solid #dddd;
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

const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const products = Array.from({ length: 7 }, () => {
			return {
				id: Math.floor(Math.random() * 1000),
				name: "Max Glow Yellow BOX",
				stock: Math.floor(Math.random() * 100),
				price: Math.floor(Math.random() * 100),
				image: "/sabon.png",
			};
		});

		setProducts(products);
	}, []);

	useEffect(() => {
		console.log(cart);
	}, [cart]);

	// create an array with 7 products object with random price and random stock and random name
	const addToCart = (product) => {
		const existingProduct = cart.find((item) => item.id === product.id);

		if (existingProduct) {
			const updatedCart = cart.map((item) => {
				if (item.id === product.id) {
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
	const router = useRouter();

	return (
		<DashboardLayout>
			<BigTitle>POS</BigTitle>

			<StyledPanel flex>
				<ProductsListContainer>
					<FieldTitle>Search for Product</FieldTitle>

					<SearchBarContainer>
						<SearchIcon src="search.png" alt="Search Icon" />
						<SearchBar type="text" placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
						<CategoriesButton onClick={() => router.push("/categories")}>
							<FilterIcon src="Filter.PNG" alt="Filter Icon" />
							<AllText>All</AllText>
						</CategoriesButton>
					</SearchBarContainer>

					<ProductsList>
						{products.map((product) => {
							return (
								<Product key={product.id}>
									<Image src="/sabon.png" width={200} height={200} alt="Product image" />

									<InfoContainer>
										<ProductNameAndStock>
											<p>{product.name}</p>
											<p>Stock: {product.stock}</p>
										</ProductNameAndStock>
										<Price>P{product.price}</Price>
									</InfoContainer>
									<Button onClick={() => addToCart(product)} width={"100%"}>
										Add
									</Button>
								</Product>
							);
						})}
					</ProductsList>
				</ProductsListContainer>
				<POSactions cart={cart} />
			</StyledPanel>
		</DashboardLayout>
	);
};

export default Home;
