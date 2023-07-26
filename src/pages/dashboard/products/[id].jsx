import { useRouter } from "next/router";

let ProductView = () => {
	const router = useRouter();
	const { id } = router.query;

	return (
		<div>
			<h1>Product: {id}</h1>
		</div>
	);
};

export default ProductView;
