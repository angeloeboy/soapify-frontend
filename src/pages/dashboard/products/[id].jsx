import DashboardLayout from "@/components/dashboardLayout";
import { useRouter } from "next/router";
import PageTitle from "./../../../components/pageTitle";
import { getProduct } from "@/api/products";
import { useEffect, useState } from "react";
import StyledPanel, { BigTitle, FieldTitle, InfoContainer, Input, InputContainer } from "@/components/styled-components/StyledPanel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

let ProductView = () => {
	const router = useRouter();

	const { id } = router.query;

	const [product, setProduct] = useState({});

	useEffect(() => {
		if (!id) return;

		getProduct(id).then((res) => {
			res ? setProduct(res.product) : setProduct({});
			console.log(res.product);
		});
	}, [id]);
	return (
		<DashboardLayout>
			{product.product_name ? <PageTitle title={product.product_name} /> : <Skeleton width={160} height={40} />}

			<StyledPanel>
				<BigTitle>Product Details</BigTitle>
				<InfoContainer>
					<InputContainer>
						<FieldTitle>Profile Picture</FieldTitle>
						<Input type="text" />
					</InputContainer>

					<InputContainer>
						<FieldTitle>Minimum Stock</FieldTitle>
						<Input type="text" />
					</InputContainer>

					<InputContainer>
						<FieldTitle>Price</FieldTitle>
						<Input type="text" />
					</InputContainer>

					<InputContainer>
						<FieldTitle>Category</FieldTitle>
						<Input type="text" />
					</InputContainer>
				</InfoContainer>
			</StyledPanel>
		</DashboardLayout>
	);
};

export default ProductView;
