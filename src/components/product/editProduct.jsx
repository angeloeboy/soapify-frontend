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
import Image from "next/image";
import { getParentProduct } from "@/api/parent_product";

const EditProduct = ({ productId, onClose, fetchProducts }) => {
	const [categories, setCategories] = useState([]);
	const [attributes, setAttributes] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [subCategories, setSubCategories] = useState([]);
	const [parentProducts, setParentProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [product, setProduct] = useState({
		product_name: null,
		product_desc: "dfasdfasdfd",
		product_price: 0,
		category_id: 0,
		supplier_id: 0,
		subcategory_id: 0,
		quantity_in_stock: 0,
		minimum_reorder_level: 1,
		parent_product_id: null,
		pcsPerBox: 0,
		attributes: [],
		attribute: [],
	});

	useEffect(() => {
		fetchSuppliers();
		fetchProductData();
		fetchProductCategories();
		fetchParentProducts();
	}, []);

	useEffect(() => {
		console.log(product);
	}, [product]);

	const fetchProductData = async () => {
		try {
			const productData = await getProduct(productId);
			setProduct({
				...productData.product,
				product_price: productData.product.product_price / 100,
				parent_product_id: productData.product.parent_product_id !== null ? productData.product.parent_product_id : 0,
			});

			//get the category of the product and load the subcategory of that category
			const category = categories.find((category) => category.category_id === productData.product.category_id);
			setSubCategories(category.subcategories);
		} catch (error) {
			console.log(error);
		}
	};

	let fetchProductCategories = async () => {
		try {
			const res = await getProductCategories();

			if (res && res.categories) {
				// Sort categories to make 'Uncategorized' the last item
				const sortedCategories = res.categories.sort((a, b) => {
					if (a.name === "Uncategorized") return 1;
					if (b.name === "Uncategorized") return -1;
					return 0;
				});

				setCategories(sortedCategories);
				console.log(sortedCategories);

				// // Set subcategories of the first category by default, if available
				// if (sortedCategories.length > 0) {
				// 	setSubCategories(sortedCategories[0].subcategories || []);
				// 	console.log("sorted second: ", sortedCategories[0]);
				// } else {
				// 	setSubCategories([]);
				// }
			} else {
				setCategories([]);
				setSubCategories([]);
			}
		} catch (error) {
			console.error("Error fetching product categories:", error);
			setCategories([]);
			setSubCategories([]);
		}
	};

	let fetchSuppliers = async () => {
		const res = await getSuppliers();
		res ? setSuppliers(res.suppliers) : setSuppliers([]);
	};

	//fetch parent products
	let fetchParentProducts = async () => {
		const res = await getParentProduct();
		res ? setParentProducts(res.parentProducts) : setParentProducts([]);
	};

	// Destructure the needed properties from the product state
	const { category_id, subcategory_id, supplier_id } = product;

	const updateProductAttributes = (initialAttributes) => {
		let attributeArray = [];

		initialAttributes.forEach((attribute) => {
			// Find the corresponding attribute in the product
			const productAttribute = product.attribute.find((pa) => pa.attribute_id === attribute.attribute_id);

			// If the product has this attribute, use its value; otherwise, use the first available value from the subcategory
			const attributeValueId = productAttribute ? productAttribute.value_id : attribute.values[0].attribute_value_id;

			attributeArray.push({
				attribute_id: attribute.attribute_id,
				attribute_value_id: attributeValueId,
			});
		});

		setProduct((prevProduct) => ({
			...prevProduct,
			attributes: attributeArray,
		}));
	};

	useEffect(() => {
		if (!product.product_name || product.product_name === "" || categories.length === 0) return;

		let category = categories.find((c) => c.category_id === category_id);
		if (!category) return;

		let subcategory = category.subcategories.find((sc) => sc.subcategory_id === subcategory_id);
		if (!subcategory) return;

		let initialAttributes = subcategory.attributes;
		// Call the update function with the initial attributes
		updateProductAttributes(initialAttributes);
		setSubCategories(category.subcategories);
		setAttributes(initialAttributes);
	}, [category_id, subcategory_id, categories, product.attribute]); // Add product.attribute as a dependency

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
		// setLoading(true);
		// const res = await editProduct(product, productId);
		// console.log(res);
		// if (res.status == "Success") {
		// 	toast.success("Product updated successfully");
		// 	fetchProducts();
		// 	onClose();
		// 	setLoading(false);

		// 	return;
		// }

		let formData = new FormData();

		// Append the image to formData
		formData.append("product_image", e.target.elements.product_image.files[0]);

		// Append each property in the product object to formData
		for (let key in product) {
			if (product.hasOwnProperty(key)) {
				if (key === "attributes" || key === "boxDetails" || key === "pcDetails") {
					formData.append(key, JSON.stringify(product[key]));
				} else {
					formData.append(key, product[key]);
				}
			}
		}

		const res = await editProduct(formData, productId);
		console.log(res);
		if (res.status == "Success") {
			toast.success("Product updated successfully");
			fetchProducts();
			onClose();
			setLoading(false);

			return;
		}

		setLoading(false);

		toast.error(res.errors[0].message);
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
									const validPositiveNumberRegex = /^[0-9]*(\.[0-9]+)?$/;

									if (e.target.value === "") {
										setProduct({
											...product,
											product_price: "",
										});
									} else if (validPositiveNumberRegex.test(e.target.value)) {
										setProduct({
											...product,
											product_price: Number(e.target.value),
										});
									}
								}}
								pattern="^[0-9]*(\.[0-9]+)?$"
								title="Please enter a valid positive number. Decimals are allowed."
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
							<FieldTitleLabel>Pieces per Box</FieldTitleLabel>
							<InputHolder
								type="number"
								min="0"
								onChange={(e) => {
									// Regular expression to allow only positive whole numbers
									const validPositiveWholeNumberRegex = /^[0-9]+$/;

									if (e.target.value === "") {
										setProduct({
											...product,
											pcsPerBox: "",
										});
									} else if (validPositiveWholeNumberRegex.test(e.target.value)) {
										setProduct({
											...product,
											pcsPerBox: Number(e.target.value),
										});
									}
								}}
								pattern="^[0-9]+$"
								title="Please enter a valid positive whole number."
								required
								value={product.pcsPerBox}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Image </FieldTitleLabel>
							<ProfilePictureContainer>
								<Centered image={product.image_link}>
									<input type="file" name="product_image" />
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

												let value_id = Number(e.target.value);
												console.log(e.target.value);
												if (value_id === 0 || value_id === null || value_id == NaN || e.target.value === "Undefined") {
													newAttributes[index].attribute_value_id = null;
													setProduct({ ...product, attributes: newAttributes });
													console.log("here");
													return;
												}

												newAttributes[index].attribute_value_id = Number(e.target.value);

												setProduct({ ...product, attributes: newAttributes });
											}}
										>
											<Option value={null} key={0}>
												Undefined
											</Option>
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
							<Label>Parent Product</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Parent Product </FieldTitleLabel>
							<Select
								value={product.parent_product_id}
								onChange={(e) => {
									if (e.target.value === "Undefined") {
										setProduct({
											...product,
											parent_product_id: null,
										});

										return;
									}

									setProduct({
										...product,

										parent_product_id: Number(e.target.value),
									});
								}}
							>
								<Option value={0} key={0}>
									Undefined
								</Option>
								{parentProducts.map((parentProduct) => (
									<Option value={parentProduct.parent_product_id} key={parentProduct.parent_product_id}>
										{parentProduct.name}
									</Option>
								))}
							</Select>
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={onClose}>Close</CloseButton>
						<Button type="submit">{loading ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Save"}</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditProduct;
