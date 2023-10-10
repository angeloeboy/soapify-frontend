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
import { addProduct, getProductCategories, getProducts, getSubCategories } from "@/api/products";
import { getSuppliers } from "@/api/supplier";

const AddProductComponent = ({ setIsAddPopUpOpen, onButtonClick, GetProducts }) => {
	const [categories, setCategories] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [attributes, setAttributes] = useState([]);

	const [subCategories, setSubCategories] = useState([]);

	const [product, setProduct] = useState({
		product_name: "",
		product_desc: "test description",
		product_price: 0,
		category_id: 1,
		supplier_id: 0,
		subcategory_id: 0,
		quantity_in_stock: 0,
		minimum_reorder_level: 1,
		attributes: [],
	});

	useEffect(() => {
		fetchSubCategories();
		fetchProductCategories();
		fetchSuppliers();
	}, []);

	useEffect(() => {
		console.log(product);
	}, [product]);

	useEffect(() => {
		if (categories.length == 0) return;
		if (suppliers.length == 0) return;
		if (subCategories.length == 0) return;

		setSubCategories(categories[0]?.subcategories);
		setAttributes(categories[0]?.subcategories[0]?.attributes);
		//set initial attributes

		let initialAttributes = categories[0]?.subcategories[0]?.attributes;
		// console.log(categories[0].subcategories[0].subcategory_id);
		let attributeArray = [];

		initialAttributes.forEach((attribute) => {
			attributeArray.push({ attribute_id: attribute.attribute_id, attribute_value_id: attribute.values[0].attribute_value_id });
		});

		setProduct({
			...product,
			supplier_id: suppliers[0]?.supplier_id ?? 0,
			category_id: categories[0]?.category_id,
			subcategory_id: categories[0]?.subcategories[0].subcategory_id,
			attributes: attributeArray,
		});
	}, [categories, suppliers, subCategories]);

	let AddProduct = (e) => {
		e.preventDefault();

		let formData = new FormData();

		// Append the image to formData
		formData.append("product_image", e.target.elements.product_image.files[0]);

		// Append each property in the product object to formData
		for (let key in product) {
			if (product.hasOwnProperty(key)) {
				if (key === "attributes") {
					formData.append(key, JSON.stringify(product[key]));
				} else {
					formData.append(key, product[key]);
				}
			}
		}

		addProduct(formData)
			.then((res) => {
				console.log(res);
				GetProducts();
			})
			.catch((error) => {
				console.error("Error adding product:", error);
			});
	};

	let fetchProductCategories = async () => {
		const res = await getProductCategories();
		console.log(res.categories);
		res ? setCategories(res.categories) : setCategories([]);
	};

	let fetchSuppliers = async () => {
		const res = await getSuppliers();
		res ? setSuppliers(res.suppliers) : setSuppliers([]);
	};

	let fetchSubCategories = async () => {
		const res = await getSubCategories();

		if (!res) {
			setSubCategories([]);
			setAttributes([]);
			return;
		}

		setSubCategories(res.subcategories);
	};

	let handleCategoryChange = (e) => {
		let subcategory_id = categories.find((category) => category.category_id == e.target.value).subcategories[0].subcategory_id;
		let initialAttributes = categories.find((category) => category.category_id == e.target.value).subcategories[0].attributes;

		let attributeArray = [];

		initialAttributes.forEach((attribute) => {
			attributeArray.push({ attribute_id: attribute.attribute_id, attribute_value_id: attribute.values[0].attribute_value_id });
		});

		setProduct({ ...product, category_id: Number(e.target.value), subcategory_id: subcategory_id, attributes: attributeArray });
		setSubCategories(categories.find((category) => category.category_id == e.target.value).subcategories);
		setAttributes(categories.find((category) => category.category_id == e.target.value).subcategories[0].attributes);
	};

	let handleSubCategoryChange = (e) => {
		let initialAttributes = subCategories.find((subcategory) => subcategory.subcategory_id == e.target.value).attributes;

		let attributeArray = [];

		initialAttributes.forEach((attribute) => {
			attributeArray.push({ attribute_id: attribute.attribute_id, attribute_value_id: attribute.values[0].attribute_value_id });
		});

		setProduct({ ...product, subcategory_id: Number(e.target.value), attributes: attributeArray });
		setAttributes(subCategories.find((subcategory) => subcategory.subcategory_id == e.target.value).attributes);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => AddProduct(e)} enctype="multipart/form-data">
					<FieldContainer>
						<HeaderTitle>Add Products</HeaderTitle>
						<LabelContainer first>
							<Label>Category</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Category</FieldTitleLabel>
							<Select
								value={product.category_id}
								onChange={(e) => {
									if (categories.find((category) => category.category_id == e.target.value).subcategories.length == 0) {
										setSubCategories([]);
										setAttributes([]);
										setProduct({ ...product, category_id: Number(e.target.value), subcategory_id: 0 });
										return;
									}

									handleCategoryChange(e);
								}}
							>
								{categories !== undefined &&
									categories.map((category) => (
										<Option value={category.category_id} key={category.category_id}>
											{category.name}
										</Option>
									))}
							</Select>
						</div>

						<div>
							<FieldTitleLabel>Sub category</FieldTitleLabel>
							<Select
								value={product.template_id}
								onChange={(e) => {
									handleSubCategoryChange(e);
								}}
							>
								{subCategories.map((subcategory) => (
									<Option value={subcategory.subcategory_id} key={subcategory.subcategory_id}>
										{subcategory.subcategory_name}
									</Option>
								))}
							</Select>
						</div>

						<LabelContainer first>
							<Label>General Information</Label>
						</LabelContainer>

						<div>
							<FieldTitleLabel> Product Name </FieldTitleLabel>
							<InputHolder
								type="text"
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

						{attributes.map((attribute, index) => {
							return (
								<div key={attribute.attribute_id}>
									<FieldTitleLabel notFirst>{attribute.attribute_name}</FieldTitleLabel>

									<Select
										value={product.attributes[index]?.attribute_value_id}
										onChange={(e) => {
											let newAttributes = [...product.attributes];
											console.log(newAttributes);
											newAttributes[index].attribute_value_id = Number(e.target.value);
											setProduct({ ...product, attributes: newAttributes });
										}}
									>
										{attribute.values.map((attribute) => (
											<Option value={attribute.attribute_value_id} key={attribute.attribute_value_id}>
												{attribute.attribute_value}
											</Option>
										))}
									</Select>
								</div>
							);
						})}

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
						<CloseButton onClick={() => setIsAddPopUpOpen(false)}>Close</CloseButton>
						<Button type="submit">Save</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddProductComponent;
