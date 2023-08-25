import { useEffect, useState } from "react";
import StyledPanel from "@/styled-components/StyledPanel";
import { styled } from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import Image from "next/image";
import POSactions from "@/components/pos/posActions";
import { getProductCategories, getProducts } from "@/api/products";
import PageTitle from "@/components/misc/pageTitle";
import Sticky from "react-stickynode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faMagnifyingGlass, faSearch } from "@fortawesome/free-solid-svg-icons";
import { ButtonAddAccountType } from "@/styled-components/ItemActionModal";
import SearchBarComponent from "./../../../components/pos/searchBarAndFilters";
import ProductComponent from "./../../../components/pos/product";

const ProductsList = styled.div`
	display: flex;
	flex-wrap: wrap;
	/* max-width: 1200px; */
	align-items: center;
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

const Pos = () => {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [productDisplay, setProductDisplay] = useState([]);
	const [productCategories, setProductCategories] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		setProductDisplay(products);
	}, [products]);

	const fetchProducts = async () => {
		const response = await getProducts();
		setProducts(response.products || []);
		console.log(response.products);
	};

	const updateCart = (product, operation) => {
		const existingProduct = cart.find((item) => item.product_id === product.product_id);

		let updatedCart;
		if (operation === "add") {
			updatedCart = existingProduct
				? cart.map((item) => (item.product_id === product.product_id ? { ...item, quantity: item.quantity + 1 } : item))
				: [...cart, { ...product, quantity: 1 }];
		} else if (operation === "subtract" && existingProduct) {
			updatedCart =
				existingProduct.quantity === 1
					? cart.filter((item) => item.product_id !== product.product_id)
					: cart.map((item) => (item.product_id === product.product_id ? { ...item, quantity: item.quantity - 1 } : item));
		}
		setCart(updatedCart);
	};

	return (
		<DashboardLayout>
			<PageTitle title="POS" />

			<POSWrapper>
				<StyledPanel pos>
					<SearchBarComponent products={products} setProductDisplay={setProductDisplay} />

					<ProductsList>
						{productDisplay.map((product) => (
							<ProductComponent product={product} onClick={() => updateCart(product, "add")} key={product.product_id} />
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
