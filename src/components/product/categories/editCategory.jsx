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
import { editCategory, editProduct, getProductCategories } from "@/api/products";
import { toast } from "react-toastify";

const EditCategory = ({ category_id, onClose, fetchCategories, selectedCategory }) => {
	const [category, setCategory] = useState({
		name: "",
	});

	useEffect(() => {
		if (selectedCategory) {
			setCategory(selectedCategory);
		}

		console.log(selectedCategory);
	}, [selectedCategory]);

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Append fields to formData for editing
		console.log(category);
		getProductCategories(category, category_id)
			.then((res) => {
				console.log(res);
				fetchCategories();
			})
			.then(() => {});
	};

	const editCategoryFunc = async (e) => {
		e.preventDefault();

		const res = await editCategory(category, category.category_id);

		if (!res) return;
		if (res.status === "Success") {
			toast.success(res.message);

			fetchCategories();
			onClose();
			return;
		}

		toast.error(res.errors[0].message);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => editCategoryFunc(e)}>
					<FieldContainer>
						<HeaderTitle>Edit Category</HeaderTitle>

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
								// required
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

export default EditCategory;
