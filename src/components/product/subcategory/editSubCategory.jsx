import { getAttributes } from "@/api/attributes";
import { getProductCategories } from "@/api/products";
import { editSubCategory } from "@/api/subcategories";
import {
	Button,
	LabelContainer,
	Label,
	FieldContainer,
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
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

const AttrValue = styled.div`
	/* display: flex;
	align-items: center;
	justify-content: space-between; */
	padding: 8px;
	font-size: 10px;
	cursor: pointer;

	input {
		max-width: 90% !important;
	}
	svg {
		margin-right: 8px;
	}
`;

const EditSubCategory = ({ setEditSubCatOpen, fetchSubCategories, selectedSubCat }) => {
	const [subCategory, setSubCategory] = useState({
		name: "",
		category_id: null,
		attributes: [],
	});

	const [chosenAttribute, setChosenAttribute] = useState([]);
	const [categories, setCategories] = useState([]);
	const [attributes, setAttributes] = useState([]);

	useEffect(() => {
		// setSubCategory(selectedSubCat);

		//map the attributes to the subcategory
		let attrArr = [];
		selectedSubCat.attributes.map((attr) => {
			let attrObj = {
				attribute_id: attr.attribute_id,
				attribute_name: attr.attribute_name,
			};

			attrArr.push(attrObj);
		});

		setSubCategory({
			...subCategory,
			name: selectedSubCat.subcategory_name,
			attributes: attrArr,
			category_id: selectedSubCat.category_id,
		});

		console.log(selectedSubCat.attributes);
		fetchProductCategories(categories);
		fetchAttributes();
		console.log(selectedSubCat);
	}, [selectedSubCat]);

	const editSubCategoryFunc = async (e) => {
		e.preventDefault();

		if (subCategory.attributes.length == 0) {
			toast.error("Please add attributes");
			return;
		}

		const res = await editSubCategory(selectedSubCat.subcategory_id, subCategory);

		if (!res) {
			toast.error("Failed to edit subcategory");
			return;
		}

		toast.success("Successfully edited subcategory");
		setEditSubCatOpen(false);
		fetchSubCategories();
	};

	let fetchProductCategories = async () => {
		const res = await getProductCategories();

		res.categories ? setCategories(res.categories) : setCategories([]);

		res.categories = res.categories.filter((category) => category.name != "Uncategorized");
		res.categories ? setCategories(res.categories) : setCategories([]);

		console.log(res.categories);
	};

	let fetchAttributes = async () => {
		const res = await getAttributes();
		res.attributes ? setAttributes(res.attributes) : setAttributes([]);
		console.log(res.attributes);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => editSubCategoryFunc(e)}>
					<FieldContainer>
						<HeaderTitle>Edit Subcategory</HeaderTitle>

						<LabelContainer first>
							<Label>General Information</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel> Subcategory Name </FieldTitleLabel>
							<InputHolder
								type="text"
								onChange={(e) => {
									setSubCategory({ ...subCategory, name: e.target.value });
								}}
								required
								value={subCategory.name}
							/>
						</div>

						<div>
							<FieldTitleLabel> Category </FieldTitleLabel>

							<Select
								value={subCategory.category_id}
								onChange={(e) => {
									console.log(e.target.value);
									setSubCategory({
										...subCategory,
										category_id: e.target.value,
									});
								}}
							>
								{categories.map((subCategory) => (
									<Option value={subCategory.category_id} key={subCategory.category_id}>
										{subCategory.name}
									</Option>
								))}
							</Select>
						</div>

						<LabelContainer>
							<Label>Attributes</Label>
						</LabelContainer>

						<div>
							<FieldTitleLabel> Attribute Name </FieldTitleLabel>

							{attributes.length > 0 && (
								<Select
									value={chosenAttribute.attribute_id}
									placeholder="Select an option"
									onChange={(e) => {
										if (e.target.value == "none") return;

										let attr = attributes.find((value) => value.attribute_id == Number(e.target.value));
										setChosenAttribute(attr);
										let attrArr = subCategory.attributes;
										if (attrArr.find((value) => value.attribute_id == attr.attribute_id)) {
											return;
										}
										let attrObj = {
											attribute_id: attr.attribute_id,
											attribute_name: attr.attribute_name,
										};

										attrArr.push(attrObj);
										setSubCategory({ ...subCategory, attributes: attrArr });
									}}
								>
									<Option value="none">Select an option</Option>
									{attributes.map((value) => (
										<Option value={value.attribute_id} key={value.attribute_id}>
											{value.attribute_name}
										</Option>
									))}
								</Select>
							)}
						</div>

						<div>
							<FieldTitleLabel> Attribute List </FieldTitleLabel>

							{subCategory.attributes.map((attribute, index) => (
								<AttrValue key={index}>
									<InputHolder type="text" readOnly value={attribute.attribute_name} />
									<FontAwesomeIcon
										icon={faTrash}
										onClick={() => {
											let attrArr = subCategory.attributes;
											attrArr.splice(index, 1);
											setSubCategory({ ...subCategory, attributes: attrArr });
										}}
									/>
								</AttrValue>
							))}
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={() => setEditSubCatOpen(false)}>Close</CloseButton>
						<Button type="submit" onClick={(e) => editSubCategoryFunc(e)}>
							Save
						</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditSubCategory;
