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

import { useEffect, useState } from "react";
import { getProductCategories } from "@/api/products";
import { getAttributes } from "@/api/attributes";
import { addSubCategory } from "@/api/subcategories";

const AddSubCategory = ({ onClose, onButtonClick, fetchProductSubcategories }) => {
	const [subCategory, setSubCategory] = useState({
		name: "",
		category_id: undefined,
		attributes: [],
	});

	const [categories, setCategories] = useState([]);

	const [attributes, setAttributes] = useState([]);
	const [chosenAttribute, setChosenAttribute] = useState([]);

	useEffect(() => {
		fetchAttributes();
		fetchProductCategories();
	}, []);

	useEffect(() => {
		console.log(subCategory);
	}, [subCategory]);

	useEffect(() => {
		console.log(chosenAttribute.attribute_name);
	}, [chosenAttribute]);

	let fetchAttributes = async () => {
		const res = await getAttributes();
		res.attributes ? setAttributes(res.attributes) : setAttributes([]);
		console.log(res.attributes);
	};

	let fetchProductCategories = async () => {
		const res = await getProductCategories();
		res.categories ? setCategories(res.categories) : setCategories([]);
		console.log(res.categories);

		if (res.categories.length > 0) {
			setSubCategory({ ...subCategory, category_id: res.categories[0].category_id });
		}
	};

	let addSubcategory = async (e) => {
		e.preventDefault();
		const res = await addSubCategory(subCategory);
		console.log(res);

		fetchProductSubcategories();
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => addSubcategory(e)} enctype="multipart/form-data">
					<FieldContainer>
						<HeaderTitle>Add Subcategory</HeaderTitle>

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
									setSubCategory({ ...subCategory, category_id: e.target.value });
								}}
							>
								{categories.map((category) => (
									<Option value={category.category_id} key={category.category_id}>
										{category.name}
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
								<>
									<InputHolder type="text" key={index} readOnly value={attribute.attribute_name} />
									<p> Delete </p>
								</>
							))}
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

export default AddSubCategory;
