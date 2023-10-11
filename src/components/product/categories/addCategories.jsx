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

const AddCategoriesComponent = ({ setIsAddPopUpOpen, fetchCategories }) => {
	const [category, setCategory] = useState({
		name: "",
	});

	// useEffect(() => {
	// 	fetchProductCategories();
	// }, []);

	let AddCategory = (e) => {
		e.preventDefault();


		addCategory(category).then((res) => {
			console.log(res);
			fetchCategories();
		});
	};

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
								onChange={(e) => {
									setCategory({ ...category, name: e.target.value });
								}}
								required
								value={category.name}
							/>
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={() => setIsAddPopUpOpen(false)}>Close</CloseButton>
						<Button type="submit">Save</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddCategoriesComponent;
