import DashboardLayout from "@/components/misc/dashboardLayout";
import { useRouter } from "next/router";
import PageTitle from "./../../../components/pageTitle";
import { getProduct } from "@/api/products";
import { useEffect, useState } from "react";
import StyledPanel, { BigTitle, FieldTitle, InfoContainer, Input, InputContainer } from "@/styled-components/StyledPanel";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

let ProductView = () => {
	const router = useRouter();

	const { id } = router.query;

	const [product, setProduct] = useState({});
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!id) return;

		getProduct(id).then((res) => {
			res ? setProduct(res.product) : setProduct({});
			setLoading(false);
			console.log(res.product);
		});
	}, [id]);
	return (
		<DashboardLayout>
			{!loading ? product ? <PageTitle title={product.product_name} /> : <PageTitle title="Product not found" /> : <Skeleton width={160} height={40} />}

			<StyledPanel>
				<BigTitle>Product Details</BigTitle>
				<InfoContainer>
					{!loading ? (
						product ? (
							<>
								<InputContainer>
									<FieldTitle>Product Picture</FieldTitle>
									<Input type="text" readOnly />
								</InputContainer>

								<InputContainer>
									<FieldTitle>Minimum Stock</FieldTitle>
									<Input type="number" />
								</InputContainer>

								<InputContainer>
									<FieldTitle>Price</FieldTitle>
									<Input type="text" />
								</InputContainer>

								<InputContainer>
									<FieldTitle>Category</FieldTitle>
									<Input type="text" />
								</InputContainer>
							</>
						) : null
					) : (
						<>
							<InputContainer>
								<Skeleton width={100} height={20} />
								<Skeleton width={300} height={40} />
							</InputContainer>

							<InputContainer>
								<Skeleton width={100} height={20} />
								<Skeleton width={300} height={40} />
							</InputContainer>

							<InputContainer>
								<Skeleton width={100} height={20} />
								<Skeleton width={300} height={40} />
							</InputContainer>

							<InputContainer>
								<Skeleton width={100} height={20} />
								<Skeleton width={300} height={40} />
							</InputContainer>
						</>
					)}
				</InfoContainer>
			</StyledPanel>
		</DashboardLayout>
	);
};

export default ProductView;
