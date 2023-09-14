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
import { addCategory, addProduct, getProductCategories, getProducts } from "@/api/products";

const AddCategoriesComponent = ({ onClose, onButtonClick, fetchCategories }) => {
	const [category, setCategory] = useState({
		name: "",
	});

	// useEffect(() => {
	// 	fetchProductCategories();
	// }, []);

	let AddCategory = (e) => {
		e.preventDefault();

		// const formData = new FormData();
		// formData.append("product_image", e.target.elements.product_image.files[0]);

		// // Append each property in the product object to formData
		// for (let key in product) {
		// 	formData.append(key, product[key]);
		// }

		addCategory(category).then((res) => {
			console.log(res);
			fetchCategories();
		});
	};

	// let fetchProductCategories = async () => {
	// 	const res = await getProductCategories();
	// 	console.log(res);
	// 	setCategories(res.categories);
	// };

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => AddCategory(e)} enctype="multipart/form-data">
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
									setCategory({ ...category, name: e.target.value });
								}}
								required
								value={category.name}
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
