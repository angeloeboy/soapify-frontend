import { getProducts } from "@/api/products";
import { addPromo } from "@/api/promos";
import {
	Label,
	Button,
	LabelContainer,
	FieldContainer,
	Centered,
	CloseButton,
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
	Select,
	Option,
} from "@/styled-components/ItemActionModal";
import Image from "next/image";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
//import { addPromo } from "@/api/promos"; // Adjust the API import based on your requirements

const AddPromo = ({ setIsAddPopUpOpen, getPromotionsFunc }) => {
	const currentDate = new Date().toISOString();
	const [products, setProducts] = useState([]);
	const [chosen_products, setchosen_products] = useState([]);
	const [product, setProduct] = useState(null);
	const [isloading, setIsLoading] = useState(false);
	useEffect(() => {
		fetchProducts();
	}, []);

	const [promo, setPromo] = useState({
		promo_code: "",
		promo_code_type: "PERCENTAGE",
		promo_code_value: 0,
		promo_code_max_use: 1,
		promo_code_expiry: currentDate,
	});

	const addPromoFunc = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (promo.promo_code === "") {
			toast.error("Please enter a promo code");
			setIsLoading(false);
			return;
		}

		if (promo.promo_code_value === 0) {
			toast.error("Please enter a promo code value");
			setIsLoading(false);

			return;
		}

		if (promo.promo_code_max_use === 0) {
			toast.error("Please enter a promo code max use");
			setIsLoading(false);

			return;
		}

		if (promo.promo_code_expiry === "") {
			toast.error("Please enter a promo code expiry");
			setIsLoading(false);

			return;
		}

		if (chosen_products.length === 0) {
			toast.error("Please choose at least one product");
			setIsLoading(false);

			return;
		}
		const product_ids = chosen_products.map((product) => product.product_id);

		const promoData = {
			...promo,
			product_ids,
		};

		const res = await addPromo(promoData);
		console.log(res);

		if (res) {
			toast.success("Successfully added promo");
			setIsAddPopUpOpen(false);
		} else {
			toast.error("Failed to add promo");
		}
		setIsLoading(false);

		await getPromotionsFunc();
	};

	const fetchProducts = async () => {
		const res = await getProducts();

		if (!res) {
			return;
		}

		const activeProducts = res.products.filter((product) => product.isActive);
		setProducts(activeProducts);
		setProduct(activeProducts[0]);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => addPromoFunc(e)}>
					<HeaderTitle>Add Promotion</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>General Information</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel>Promo code</FieldTitleLabel>
							<InputHolder type="text" onChange={(e) => setPromo({ ...promo, promo_code: e.target.value })} value={promo.promo_code} />
						</div>

						<div>
							<FieldTitleLabel>Promo type</FieldTitleLabel>
							<Select value={promo.promo_code_type} onChange={(e) => setPromo({ ...promo, promo_code_type: e.target.value })}>
								<Option value="PERCENTAGE">Percentage</Option>
								<Option value="FIXED">Fixed</Option>
							</Select>
						</div>

						<div>
							<FieldTitleLabel>Code value </FieldTitleLabel>
							<InputHolder type="number" onChange={(e) => setPromo({ ...promo, promo_code_value: e.target.value })} value={promo.promo_code_value} />
						</div>

						<div>
							<FieldTitleLabel>Max Use</FieldTitleLabel>
							<InputHolder type="number" onChange={(e) => setPromo({ ...promo, promo_code_max_use: e.target.value })} value={promo.promo_code_max_use} />
						</div>

						<div>
							<FieldTitleLabel>Expiry</FieldTitleLabel>
							<InputHolder
								type="date"
								placeholder="Enter end date"
								onChange={(e) => setPromo({ ...promo, promo_code_expiry: e.target.value })}
								value={promo.promo_code_expiry}
							/>
						</div>

						<div>
							<FieldTitleLabel notFirst>Products</FieldTitleLabel>
							{product !== null && (
								<>
									<Select
										value={product.product_id}
										onChange={(e) => {
											setProduct(products.find((product) => product.product_id == e.target.value));
										}}
									>
										{products.map((product) => (
											<Option value={product.product_id} key={product.product_id}>
												{product.product_code} - {product.product_name}
											</Option>
										))}
									</Select>
									<button
										type="button"
										onClick={(e) => {
											if (chosen_products.find((chosen_product) => chosen_product.product_id == product.product_id)) {
												return;
											}

											setchosen_products([...chosen_products, product]);
										}}
									>
										Add Product
									</button>
								</>
							)}

							{chosen_products.map((product) => {
								return (
									<div key={product.product_code}>
										<span>
											{product.product_code} - {product.product_name}
										</span>
										<button onClick={() => setchosen_products(chosen_products.filter((chosen_product) => chosen_product.product_id !== product.product_id))}>
											Remove
										</button>
									</div>
								);
							})}
						</div>
					</FieldContainer>
					<ButtonsContainer>
						<CloseButton onClick={() => setIsAddPopUpOpen(false)}>Close</CloseButton>
						<Button type="submit">{isloading ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Save"} </Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddPromo;
