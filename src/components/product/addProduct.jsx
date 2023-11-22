import {
	Button,
	Select,
	LabelContainer,
	Label,
	Option,
	FieldContainer,
	ProfilePictureContainer,
	Centered,
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
import { toast } from "react-toastify";
import { getParentProduct } from "@/api/parent_product";
import Image from "next/image";

const AddProduct = ({ setIsAddPopUpOpen, onButtonClick, GetProducts }) => {
	const [categories, setCategories] = useState([]);
	const [suppliers, setSuppliers] = useState([]);
	const [attributes, setAttributes] = useState([]);

	const [loading, setLoading] = useState(false);

	const [subCategories, setSubCategories] = useState([]);
	const [parentProducts, setParentProducts] = useState([]);
	const [product, setProduct] = useState({
		// product_name: "",
		// product_desc: "test description",
		// product_price: 0,
		// category_id: 1,
		// supplier_id: 0,
		// subcategory_id: 0,
		// quantity_in_stock: 0,
		// minimum_reorder_level: 1,
		// isVariant: false,
		// parent_product_id: 0,
		// attributes: [],

		product_name: "",
		product_desc: "test description",
		category_id: 1,
		supplier_id: 0,
		subcategory_id: 0,
		parent_product_id: null,
		attributes: [],
		addAsBox: false,
		addAsPc: true,
		boxDetails: {
			product_price: 0,
			minimum_reorder_level: 0,
			pcsPerBox: 0,
		},
		pcDetails: {
			product_price: 0,
			minimum_reorder_level: 0,
		},
	});

	// const [product, setProduct] =

	useEffect(() => {
		fetchProductCategories();
		fetchSuppliers();
		fetchParentProducts();
	}, []);

	useEffect(() => {
		console.log(product);
	}, [product]);

	let AddProduct = async (e) => {
		e.preventDefault();
		setLoading(true);
		let formData = new FormData();

		// Append the image to formData
		formData.append("product_image", e.target.elements.product_image.files[0]);

		// Append each property in the product object to formData
		for (let key in product) {
			if (product.hasOwnProperty(key)) {
				// Check if the property is 'attributes', 'boxDetails', or 'pcDetails'
				if (key === "attributes" || key === "boxDetails" || key === "pcDetails") {
					// Convert the object to a JSON string and append it
					formData.append(key, JSON.stringify(product[key]));
				} else {
					// Append other properties as they are
					formData.append(key, product[key]);
				}
			}
		}

		const res = await addProduct(formData);
		console.log(res);
		setLoading(false);

		if (!res) return;
		if (res.status !== "Success") return toast.error(res.errors[0].message);

		toast.success("Product added successfully");
		GetProducts();
		setIsAddPopUpOpen(false);
	};

	let fetchProductCategories = async () => {
		const res = await getProductCategories();

		//get categories that are active
		const activeCategories = res.categories.filter((category) => category.isActive == 1);
		const activeSubcategories = res.categories[0].subcategories.filter((subcategory) => subcategory.isActive == 1);

		console.log(activeCategories);

		res ? setCategories(activeCategories) : setCategories([]);
		res ? setSubCategories(activeSubcategories) : setSubCategories([]);
	};

	let fetchSuppliers = async () => {
		const res = await getSuppliers();

		const activeSuppliers = res.suppliers.filter((supplier) => supplier.isActive == 1);

		res ? setSuppliers(activeSuppliers) : setSuppliers([]);
	};

	const fetchParentProducts = async () => {
		const res = await getParentProduct();

		if (!res) return;

		setParentProducts(res.parentProducts);
	};

	useEffect(() => {
		if (categories.length == 0) return;

		let initialAttributes = categories[0]?.subcategories[0]?.attributes;

		let attributeArray = [];

		initialAttributes.forEach((attribute) => {
			attributeArray.push({
				attribute_id: attribute.attribute_id,
				attribute_value_id: attribute.values[0].attribute_value_id,
			});
		});

		setProduct({
			...product,
			supplier_id: suppliers[0]?.supplier_id ?? 0,
			category_id: categories[0]?.category_id,
			subcategory_id: categories[0]?.subcategories[0].subcategory_id,
			attributes: attributeArray,
		});

		setAttributes(categories[0]?.subcategories[0]?.attributes);
	}, [categories]);

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

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => AddProduct(e)} enctype="multipart/form-data">
					<FieldContainer>
						<HeaderTitle>Add Products</HeaderTitle>
						<LabelContainer first>
							<Label>Basic Information</Label>
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
							<FieldTitleLabel notFirst>Image (optional)</FieldTitleLabel>
							<ProfilePictureContainer>
								<Centered>
									<input type="file" name="product_image" required />
								</Centered>
							</ProfilePictureContainer>
						</div>
						<LabelContainer first>
							<Label>Category and Subcategory</Label>
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
										{attribute.values.map((attribute) => (
											<Option value={attribute.attribute_value_id} key={attribute.attribute_value_id + 1}>
												{attribute.attribute_value}
											</Option>
										))}
									</Select>
								</div>
							);
						})}

						<LabelContainer>
							<Label>Box and Pc Information (If applicable)</Label>
						</LabelContainer>

						<div>
							<FieldTitleLabel>Sell As</FieldTitleLabel>
							<Select
								value={product.addAsBox && product.addAsPc ? "Both" : product.addAsBox ? "Box" : "Piece"}
								onChange={(e) => {
									if (e.target.value === "Both") {
										setProduct({
											...product,
											addAsBox: true,
											addAsPc: true,
										});

										return;
									}

									if (e.target.value === "Box") {
										setProduct({
											...product,
											addAsBox: true,
											addAsPc: false,
										});

										return;
									}

									if (e.target.value === "Piece") {
										setProduct({
											...product,
											addAsBox: false,
											addAsPc: true,
										});

										return;
									}
								}}
							>
								<Option value={"Piece"}>Piece</Option>
								<Option value={"Box"}>Box</Option>
								<Option value={"Both"}>Both</Option>
							</Select>
						</div>
						<LabelContainer>
							<Label>Pricing and Stock Information</Label>
						</LabelContainer>
						{product.addAsBox && (
							<>
								<div>
									<FieldTitleLabel>Box Price</FieldTitleLabel>
									<InputHolder
										type="number"
										min="0"
										onChange={(e) => {
											// Regular expression to allow only positive numbers and decimals
											const validPositiveNumberRegex = /^[0-9]*(\.[0-9]+)?$/;

											if (e.target.value === "") {
												setProduct({
													...product,
													boxDetails: {
														...product.boxDetails,
														product_price: "",
													},
												});
											} else if (validPositiveNumberRegex.test(e.target.value)) {
												setProduct({
													...product,
													boxDetails: {
														...product.boxDetails,
														product_price: Number(e.target.value),
													},
												});
											}
										}}
										pattern="^[0-9]*(\.[0-9]+)?$"
										title="Please enter a valid positive number. Decimals are allowed."
										required
										value={product.boxDetails.product_price}
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
													boxDetails: {
														...product.boxDetails,
														pcsPerBox: "",
													},
												});
											} else if (validPositiveWholeNumberRegex.test(e.target.value)) {
												setProduct({
													...product,
													boxDetails: {
														...product.boxDetails,
														pcsPerBox: Number(e.target.value),
													},
												});
											}
										}}
										pattern="^[0-9]+$"
										title="Please enter a valid positive whole number."
										required
										value={product.boxDetails.pcsPerBox}
									/>
								</div>
								<div>
									<FieldTitleLabel notFirst>Box Reorder Threshold</FieldTitleLabel>
									<InputHolder
										type="number"
										min="0"
										onChange={(e) => {
											// Regular expression to allow only positive whole numbers
											const validPositiveWholeNumberRegex = /^[0-9]+$/;

											if (e.target.value === "") {
												setProduct({
													...product,
													boxDetails: {
														...product.boxDetails,
														minimum_reorder_level: "",
													},
												});
											} else if (validPositiveWholeNumberRegex.test(e.target.value)) {
												setProduct({
													...product,
													boxDetails: {
														...product.boxDetails,
														minimum_reorder_level: Number(e.target.value),
													},
												});
											}
										}}
										pattern="^[0-9]+$"
										title="Please enter a valid positive whole number."
										required
										value={product.boxDetails.minimum_reorder_level}
									/>
								</div>
							</>
						)}

						{product.addAsPc && (
							<>
								<div>
									<FieldTitleLabel>Per piece Price</FieldTitleLabel>
									<InputHolder
										type="number"
										min="0"
										onChange={(e) => {
											const validPositiveNumberRegex = /^[0-9]*(\.[0-9]+)?$/;

											if (e.target.value === "") {
												setProduct({
													...product,
													pcDetails: {
														...product.pcDetails,
														product_price: "",
													},
												});
											} else if (validPositiveNumberRegex.test(e.target.value)) {
												setProduct({
													...product,
													pcDetails: {
														...product.pcDetails,
														product_price: Number(e.target.value),
													},
												});
											}
										}}
										pattern="^[0-9]*(\.[0-9]+)?$"
										title="Please enter a valid positive number. Decimals are allowed."
										required
										value={product.pcDetails.product_price}
									/>
								</div>
								<div>
									<FieldTitleLabel notFirst>Per piece Reorder Threshold</FieldTitleLabel>

									<InputHolder
										type="text"
										onChange={(e) => {
											const validPositiveWholeNumberRegex = /^[0-9]+$/; // Regex updated to allow only whole numbers

											if (e.target.value === "") {
												setProduct({
													...product,
													pcDetails: {
														...product.pcDetails,
														minimum_reorder_level: "",
													},
												});
											} else if (validPositiveWholeNumberRegex.test(e.target.value)) {
												setProduct({
													...product,
													pcDetails: {
														...product.pcDetails,
														minimum_reorder_level: Number(e.target.value),
													},
												});
											}
										}}
										pattern="^[0-9]+$" // Pattern attribute updated to match the regex
										title="Please enter a valid positive whole number."
										required
										value={product.pcDetails.minimum_reorder_level} // Assuming the correct state path
									/>
								</div>
							</>
						)}

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
								<Option value={null} key={0}>
									Undefined
								</Option>
								{parentProducts.map((parentProduct) => (
									<Option value={parentProduct.parent_product_id} key={parentProduct.parent_product_id}>
										{parentProduct.name}
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
						<CloseButton onClick={() => setIsAddPopUpOpen(false)}>Close</CloseButton>
						<Button type="submit">{loading ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Save"} </Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddProduct;
