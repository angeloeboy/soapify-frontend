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
import { addProduct, getProductCategories, getProductTemplates, getProducts } from "@/api/products";
import { getSuppliers } from "@/api/supplier";

const AddProductComponent = ({ onClose, onButtonClick, GetProducts }) => {
	const [categories, setCategories] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [templates, setTemplates] = useState([]);
	const [attributes, setAttributes] = useState([]);
	const [product, setProduct] = useState({
		product_name: "",
		product_desc: "test description",
		product_price: 0,
		category_id: 1,
		supplier_id: 0,
		template_id: 0,
		quantity_in_stock: 0,
		minimum_reorder_level: 1,
		attributes: [],
	});

	useEffect(() => {
		fetchProductCategories();
		fetchProductTemplates();
		fetchSuppliers();
	}, []);

	useEffect(() => {
		console.log(product);
	}, [product]);

	useEffect(() => {
		if (templates.length == 0) return;
		if (categories.length == 0) return;
		if (suppliers.length == 0) return;

		let defaultAttributes = templates[0]?.attributes.map((attribute) => {
			return {
				attribute_id: attribute.attribute_id,
				value_id: attribute.values[0].value_id,
				atrribute_name: attribute.attribute_name,
				value_name: attribute.values[0].value_name,
			};
		});
		setAttributes(templates[0]?.attributes);
		setProduct({
			...product,
			supplier_id: suppliers[0]?.supplier_id,
			template_id: templates[0]?.template_id,
			category_id: categories[0]?.category_id,
			attributes: defaultAttributes,
		});
		setAttributes(templates[0]?.attributes);
	}, [categories, suppliers, templates]);

	let AddProduct = (e) => {
		e.preventDefault();

		let formData = new FormData();
		formData.append("product_image", e.target.elements.product_image.files[0]);

		// Append each property in the product object to formData
		for (let key in product) {
			if (key === "attributes") {
				formData.append(key, JSON.stringify(product[key]));
			} else {
				formData.append(key, product[key]);
			}
		}

		const formDataObject = Object.fromEntries(formData.entries());

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

	let fetchProductTemplates = async () => {
		const res = await getProductTemplates();
		setTemplates(res.templates);
		console.log(res);
	};

	let fetchSuppliers = async () => {
		const res = await getSuppliers();
		setSuppliers(res.suppliers);
	};

	let handleTemplateChange = (e) => {
		console.log("Template changed");
		let template = templates.find((template) => template.template_id == Number(e.target.value));

		console.log(template);
		//set default values of attribute and value
		let newAttributes = template.attributes.map((attribute) => {
			let newAttribute = { ...attribute };
			newAttribute.attribute_value = attribute.values[0].value_id;
			return newAttribute;
		});

		let defaultAttributes = template.attributes.map((attribute) => {
			return {
				attribute_id: attribute.attribute_id,
				value_id: attribute.values[0].value_id,
				atrribute_name: attribute.attribute_name,
				value_name: attribute.values[0].value_name,
			};
		});

		setAttributes(newAttributes);

		setProduct({ ...product, attributes: defaultAttributes, template_id: Number(e.target.value) });
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => AddProduct(e)} enctype="multipart/form-data">
					<FieldContainer>
						<HeaderTitle>Add Products</HeaderTitle>

						<LabelContainer first>
							<Label>Product Template</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel></FieldTitleLabel>
							<Select
								value={product.template_id}
								onChange={(e) => {
									handleTemplateChange(e);
								}}
							>
								{templates.map((template) => (
									<Option value={template.template_id} key={template.template_id}>
										{template.template_name}
									</Option>
								))}
							</Select>
						</div>

						<LabelContainer first>
							<Label>General Information</Label>{" "}
						</LabelContainer>

						<div>
							<FieldTitleLabel> Product Name </FieldTitleLabel>
							<InputHolder
								type="text"
								placeholder="Enter your Product Name"
								onChange={(e) => {
									setProduct({ ...product, product_name: e.target.value });
								}}
								required
								value={product.product_name}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Price</FieldTitleLabel>
							<InputHolder
								type="text"
								placeholder="Enter your Price"
								onChange={(e) => {
									// Regular expression to match valid numbers and decimals
									const validNumberRegex = /^[0-9]*(\.[0-9]*)?$/;

									if (e.target.value === "") {
										setProduct({ ...product, product_price: "" });
									} else if (validNumberRegex.test(e.target.value)) {
										setProduct({ ...product, product_price: e.target.value });
									}
								}}
								pattern="^[0-9]*(\.[0-9]+)?$"
								title="Please enter a valid number. Decimals are allowed."
								required
								value={product.product_price}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Minimum Stock</FieldTitleLabel>
							<InputHolder
								type="number"
								placeholder="Enter your minimum stock"
								onChange={(e) => {
									setProduct({ ...product, minimum_reorder_level: parseInt(e.target.value, 10) });
								}}
								required
								value={product.minimum_reorder_level}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Image (optional)</FieldTitleLabel>
							<ProfilePictureContainer>
								<Centered>
									<input type="file" name="product_image" required />
								</Centered>
							</ProfilePictureContainer>
						</div>
						<LabelContainer>
							<Label>Attributes</Label>
						</LabelContainer>
						{attributes?.length > 0 &&
							attributes.map((attribute, index) => (
								<div key={index}>
									<FieldTitleLabel notFirst>{attribute.attribute_name}</FieldTitleLabel>
									<Select
										value={product.attributes[index].attribute_value}
										onChange={(e) => {
											console.log(e.target.value);
											let newAttributes = [...product.attributes];
											newAttributes[index].value_name = attribute.values.find((value) => value.value_id == e.target.value).value_name;
											newAttributes[index].value_id = Number(e.target.value);
											setProduct({ ...product, attributes: newAttributes });
										}}
									>
										{attribute.values.map((value) => (
											<Option value={value.value_id} key={value.value_id}>
												{value.value_name}
											</Option>
										))}
									</Select>
								</div>
							))}
						<LabelContainer>
							<Label>Category</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Category</FieldTitleLabel>
							<Select
								value={product.category_id}
								onChange={(e) => {
									setProduct({ ...product, category_id: Number(e.target.value) });
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
							<Label>Supplier</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Supplier</FieldTitleLabel>
							<Select
								value={product.supplier_id}
								onChange={(e) => {
									setProduct({ ...product, supplier_id: Number(e.target.value) });
								}}
							>
								{suppliers.map((supplier) => (
									<Option value={supplier.supplier_id} key={supplier.supplier_id}>
										{supplier.supplier_name}
									</Option>
								))}
							</Select>
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

export default AddProductComponent;
