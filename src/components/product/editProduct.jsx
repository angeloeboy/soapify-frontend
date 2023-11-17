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
import { useCallback, useEffect, useState } from "react";
import { getProduct, editProduct, getProductCategories, getSubCategories } from "@/api/products";
import { getSuppliers } from "@/api/supplier";
import { toast } from "react-toastify";
import "react-loading-skeleton/dist/skeleton.css";

const EditProduct = ({ productId, onClose, fetchProducts }) => {
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
		attribute: [],
	});

	useEffect(() => {
		fetchSuppliers();
		fetchProductData();
		fetchProductCategories();
	}, []);

	// useEffect(() => {
	// 	console.log(product);
	// }, [product]);

	const fetchProductData = async () => {
		try {
			const productData = await getProduct(productId);
			setProduct({
				...productData.product,
				product_price: productData.product.product_price / 100,
			});
		} catch (error) {
			console.log(error);
		}
	};

	let fetchProductCategories = async () => {
		const res = await getProductCategories();
		res ? setCategories(res.categories) : setCategories([]);
		res ? setSubCategories(res.categories[0].subcategories) : setSubCategories([]);
	};

	let fetchSuppliers = async () => {
		const res = await getSuppliers();
		res ? setSuppliers(res.suppliers) : setSuppliers([]);
	};

	// Destructure the needed properties from the product state
	const { category_id, subcategory_id, supplier_id } = product;

	// Refactor the product update into its own function outside of your effects
	const updateProductAttributes = (attributes) => {
		let attributeArray = [];

		attributes.forEach((attribute) => {
			attributeArray.push({
				attribute_id: attribute.attribute_id,
				attribute_value_id: product.attribute.find((productAttribute) =>
					productAttribute.attribute_id === attribute.attribute_id ? productAttribute.value_id : attribute.values[0].attribute_value_id
				).value_id,
			});
		});

		console.log(attributeArray);

		setProduct((prevProduct) => ({
			...prevProduct,
			attributes: attributeArray,
		}));
	};

	// Now, your useEffect only runs when the specific properties change, not the entire product object
	useEffect(() => {
		if (!product.product_name || product.product_name == "" || categories.length === 0) return;

		let category = categories.find((category) => category.category_id === category_id);
		if (!category) return;

		let subcategory = category.subcategories.find((subcategory) => subcategory.subcategory_id === subcategory_id);
		if (!subcategory) return;

		let initialAttributes = subcategory.attributes;

		updateProductAttributes(initialAttributes); // Call the update function
		setSubCategories(category.subcategories);
		setAttributes(initialAttributes);
	}, [category_id, subcategory_id, categories]); // Dependencies are now specific properties

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

		setProduct((prevProduct) => ({
			...prevProduct,
			category_id: Number(e.target.value),
			subcategory_id: subcategory_id,
			attributes: attributeArray,
		}));

		setSubCategories(categories.find((category) => category.category_id == e.target.value).subcategories);
		setAttributes(categories.find((category) => category.category_id == e.target.value).subcategories[0].attributes);
	};

	let handleSubCategoryChange = (e) => {
		let initialAttributes = subCategories.find((subcategory) => subcategory.subcategory_id == e.target.value).attributes;
		console.log(initialAttributes);

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

	let saveProduct = async (e) => {
		e.preventDefault();
		const res = await editProduct(product, productId);
		console.log(res);

		fetchProducts();

		toast.success("Product updated successfully");
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => saveProduct(e)} enctype="multipart/form-data">
					<HeaderTitle>
						{product.product_code} {product.product_name}
					</HeaderTitle>
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

						{product.attributes &&
							attributes.map((attribute, index) => {
								return (
									<div key={attribute.attribute_id}>
										<FieldTitleLabel notFirst>
											{attribute.attribute_name} {index}
										</FieldTitleLabel>
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
							})}

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
						<Button type="submit" onClick={(e) => saveProduct(e)}>
							Save
						</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditProduct;
