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
import styled from "styled-components";
//import { addPromo } from "@/api/promos"; // Adjust the API import based on your requirements

const ButtonAdd = styled.button`
	background-color: #0b20dd;
	color: #fff;
	padding: 10px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	margin-top: 10px;
	margin-right: 6px;
	margin-left: 24px;
`;

const EditPromo = ({ setIsEditPopUpOpen, getPromotionsFunc, selectedPromo }) => {
	const currentDate = new Date().toISOString();
	const [products, setProducts] = useState([]);
	const [chosen_products, setchosen_products] = useState([]);
	const [product, setProduct] = useState(null);
	const [isloading, setIsLoading] = useState(false);
	const [isUnli, setIsUnli] = useState(false);

	useEffect(() => {
		fetchProducts();
	}, []);

	const [promo, setPromo] = useState({
		// promo_code: "",
		// promo_code_type: "PERCENTAGE",
		// promo_code_value: 0,
		// promo_code_max_use: 1,
		// promo_code_expiry: currentDate,
	});

	useEffect(() => {
		if (selectedPromo === null) return;

		setPromo(selectedPromo);

		//map the product ids to the products array and add it to chosen products
		const products = selectedPromo.products.map((product) => product.Product);
		setchosen_products(products);
	}, [selectedPromo]);

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
					<HeaderTitle>Edit Promotion</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>General Information</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel>Promo code</FieldTitleLabel>
							<InputHolder type="text" onChange={(e) => setPromo({ ...promo, promo_code: e.target.value })} value={promo.promo_code} readOnly />
						</div>

						<div>
							<FieldTitleLabel>Promo type</FieldTitleLabel>
							<Select value={promo.promo_code_type} readOnly>
								<Option value="PERCENTAGE">Percentage</Option>
								<Option value="FIXED">Fixed</Option>
							</Select>
						</div>

						<div>
							<FieldTitleLabel>Code value </FieldTitleLabel>
							<InputHolder type="number" onChange={(e) => setPromo({ ...promo, promo_code_value: e.target.value })} value={promo.promo_code_value} readOnly />
						</div>

						<div>
							<FieldTitleLabel>Unlimited Use?</FieldTitleLabel>

							<Select
								value={isUnli}
								// onChange={(e) => {
								// 	if (e.target.value == "true") {
								// 		setPromo({ ...promo, promo_code_max_use: null });
								// 		setIsUnli(true);
								// 	} else {
								// 		setIsUnli(false);
								// 		setPromo({ ...promo, promo_code_max_use: 1 });
								// 	}
								// }}
								readOnly
							>
								<Option value={true} key={1}>
									Yes
								</Option>
								<Option value={false} key={2}>
									No
								</Option>
							</Select>
							{!isUnli && (
								<>
									<FieldTitleLabel>Max Use</FieldTitleLabel>

									<InputHolder
										type="text"
										onChange={(e) => setPromo({ ...promo, promo_code_max_use: e.target.value })}
										value={promo.promo_code_max_use === null ? "Unlimited" : promo.promo_code_max_use}
										readOnly
									/>
								</>
							)}
						</div>

						<div>
							<FieldTitleLabel>Expiry</FieldTitleLabel>
							<InputHolder
								type="date"
								placeholder="Enter end date"
								onChange={(e) => setPromo({ ...promo, promo_code_expiry: e.target.value })}
								value={
									//display the date in the format yyyy-mm-dd
									promo.promo_code_expiry?.split("T")[0]
								}
								readOnly
							/>
						</div>

						<div>
							<FieldTitleLabel notFirst>Products</FieldTitleLabel>

							{chosen_products.map((product) => {
								return (
									<div key={product.Pproduct_code}>
										<span>
											{product.product_code} - {product.product_name}
										</span>
									</div>
								);
							})}
						</div>
					</FieldContainer>
					<ButtonsContainer>
						<CloseButton type="button" onClick={() => setIsEditPopUpOpen(false)}>
							Close
						</CloseButton>
						{/* <Button type="submit">{isloading ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Save"} </Button> */}
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditPromo;
