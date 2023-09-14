import {
	Button,
	Select,
	LabelContainer,
	Label,
	Option,
	FieldContainer,
	ProfilePictureContainer,
	FileInput,
	Centered,
	SecondaryButton,
	CloseButton,
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
} from "@/styled-components/ItemActionModal";

import { useEffect, useState } from "react";
import { addProduct, getProductCategories, getProducts } from "@/api/products";

const AddCategoriesComponent = ({ onClose, onButtonClick, GetProducts }) => {
	const [fileUploaded, setFileUploaded] = useState(false);
	const [categories, setCategories] = useState([]);
	const [product, setProduct] = useState({
		product_name: "",
		product_desc: "",
		product_price: 0,
		category_id: 1,
		supplier_id: 0,
		quantity_in_stock: 0,
		minimum_reorder_level: 1,
	});

	useEffect(() => {
		fetchProductCategories();
	}, []);

	let AddProduct = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("product_image", e.target.elements.product_image.files[0]);

		// Append each property in the product object to formData
		for (let key in product) {
			formData.append(key, product[key]);
		}

		console.log(product);

		addProduct(formData)
			.then((res) => {
				console.log(res);
			})
			.then(() => {
				GetProducts();
			});
	};

	let fetchProductCategories = async () => {
		const res = await getProductCategories();
		console.log(res);
		setCategories(res.categories);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => AddProduct(e)} enctype="multipart/form-data">
					<FieldContainer>
						<HeaderTitle>Add Category</HeaderTitle>

						<LabelContainer first>
							<Label>General Information</Label>{" "}
						</LabelContainer>
						<div>
							<FieldTitleLabel> Category Name </FieldTitleLabel>
							<InputHolder
								type="text"
								placeholder="Enter your Category Name"
								onChange={(e) => {
									setProduct({ ...product, product_name: e.target.value });
								}}
								required
								value={product.product_name}
							/>
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={onClose}>Close</CloseButton>
						<Button type="submit">Save</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddCategoriesComponent;
