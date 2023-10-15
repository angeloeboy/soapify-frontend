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
import { getProduct, editProduct, getProductCategories, getSubCategories } from "@/api/products";
import { getSuppliers } from "@/api/supplier";

const EditProductComponent = ({ productId, onClose, fetchProducts }) => {
	const [categories, setCategories] = useState([]);
	const [attributes, setAttributes] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [product, setProduct] = useState({
		product_name: null,
		product_desc: "dfasdfasdfd",
		product_price: 0,
		category_id: 0,
		supplier_id: 0,
		subcategory_id: 0,
		quantity_in_stock: 0,
		minimum_reorder_level: 1,
		attributes: [],
	});

	useEffect(() => {
		fetchSuppliers();
		fetchSubCategories();
		fetchProductData();
		fetchProductCategories();
		fetchProductAttributes();
		// Fetch attributes when the component mounts
	}, []);

	useEffect(() => {
		console.log(product);
	}, [product]);

	const fetchProductData = async () => {
		try {
			const productData = await getProduct(productId);
			setProduct({ ...productData.product, product_price: productData.product.product_price / 100 });
			console.log(product);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchProductCategories = async () => {
		try {
			const categoryData = await getProductCategories();
			setCategories(categoryData.categories);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchProductAttributes = async () => {
		try {
			// const attributesData = await getProductAttributes(productId);
			setAttributes(product.attributes);
			console.log(product.attributes);
		} catch (error) {
			console.log(error);
		}
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

	const fetchSuppliers = async () => {
		const res = await getSuppliers();
		res ? setSuppliers(res.suppliers) : setSuppliers([]);
	};

	useEffect(() => {
		if (categories.length == 0) return;
		if (suppliers.length == 0) return;
		if (subCategories.length == 0) return;
		if (product.product_name == null) return;
		console.log("testing");
		setSubCategories(categories[product.category_id]?.subcategories);
		setAttributes(categories[product.category_id]?.subcategories[0]?.attributes);

		// set initial att  ributes

		let initialAttributes = categories[product.category_id]?.subcategories[product.subcategory_id]?.attributes;
		// console.log(categories[0].subcategories[0].subcategory_id);
		// let attributeArray = [];

		// initialAttributes.forEach((attribute) => {
		// 	attributeArray.push({
		// 		attribute_id: attribute.attribute_id,
		// 		attribute_value_id: attribute.values[0].attribute_value_id,
		// 	});
		// });

		setProduct({
			...product,
			supplier_id: suppliers[product.supplier_id]?.supplier_id ?? 0,
			category_id: categories[product.category_id]?.category_id,
			subcategory_id: categories[product.category_id]?.subcategories[0].subcategory_id,
			// attributes: attributeArray,
		});
	}, [categories, suppliers, subCategories]);

	let handleCategoryChange = (e) => {
		let subcategory_id = categories.find((category) => category.category_id == e.target.value).subcategories[0].subcategory_id;
		let initialAttributes = categories.find((category) => category.category_id == e.target.value).subcategories[0].attributes;

		let attributeArray = [];

		initialAttributes.forEach((attribute) => {
			attributeArray.push({
				attribute_id: attribute.attribute_id,
				attribute_value_id: attribute.values[0].attribute_value_id,
			});
		});

		setProduct({
			...product,
			category_id: Number(e.target.value),
			subcategory_id: subcategory_id,
			attributes: attributeArray,
		});
		setSubCategories(categories.find((category) => category.category_id == e.target.value).subcategories);
		setAttributes(categories.find((category) => category.category_id == e.target.value).subcategories[0].attributes);
	};

	let handleSubCategoryChange = (e) => {
		let initialAttributes = subCategories.find((subcategory) => subcategory.subcategory_id == e.target.value).attributes;

		let attributeArray = [];

		initialAttributes.forEach((attribute) => {
			attributeArray.push({
				attribute_id: attribute.attribute_id,
				attribute_value_id: attribute.values[0].attribute_value_id,
			});
		});

		setProduct({
			...product,
			subcategory_id: Number(e.target.value),
			attributes: attributeArray,
		});
		setAttributes(subCategories.find((subcategory) => subcategory.subcategory_id == e.target.value).attributes);
	};

	const handleFormSubmit = (e) => {
		e.preventDefault();
		// Append fields to formData for editing
		console.log(product);
		editProduct(product, productId)
			.then((res) => {
				console.log(res);
				fetchProducts();
			})
			.then(() => {});
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => handleFormSubmit(e)} enctype="multipart/form-data">
					<HeaderTitle>Edit Product {product.product_name}</HeaderTitle>
					<FieldContainer>
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
										setProduct({
											...product,
											category_id: Number(e.target.value),
											subcategory_id: 0,
										});
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
								value={product.subcategory_id}
								onChange={(e) => {
									handleSubCategoryChange(e);
								}}
							>
								{subCategories?.map((subcategory) => (
									<Option value={subcategory.subcategory_id} key={subcategory.subcategory_id}>
										{subcategory.subcategory_name}
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
								placeholder="Edit your Product Name"
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
								type="number"
								placeholder="Enter your Price"
								onChange={(e) => {
									setProduct({
										...product,
										product_price: parseInt(e.target.value, 10),
									});
								}}
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
									setProduct({
										...product,
										minimum_reorder_level: parseInt(e.target.value, 10),
									});
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

						{/* {attributes.map((attribute, index) => {
							return (
								<div key={attribute.attribute_id}>
									<FieldTitleLabel notFirst>{attribute.attribute_name}</FieldTitleLabel>
									<Select
										value={product.attributes[index]?.attribute_value_id}
										onChange={(e) => {
											let newAttributes = [...product.attributes];
											newAttributes[index].attribute_value_id = Number(e.target.value);
											setProduct({ ...product, attributes: newAttributes });
										}}
									>
										{attribute.values.map((attributeValue) => (
											<Option value={attributeValue.attribute_value_id} key={attributeValue.attribute_value_id}>
												{attributeValue.attribute_value}
											</Option>
										))}
									</Select>
								</div>
							);
						})} */}

						<LabelContainer>
							<Label>Supplier</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Supplier</FieldTitleLabel>
							<Select
								value={product.supplier_id}
								onChange={(e) => {
									setProduct({
										...product,
										supplier_id: Number(e.target.value),
									});
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
						<Button type="submit" onClick={(e) => handleFormSubmit(e)}>
							Save
						</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditProductComponent;
