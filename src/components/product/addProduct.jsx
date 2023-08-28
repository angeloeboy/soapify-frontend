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
import { addProduct, getProductCategories, getProducts } from "@/api/products";

const AddProductComponent = ({ onClose, onButtonClick, GetProducts }) => {
	const [fileUploaded, setFileUploaded] = useState(false);
	const [categories, setCategories] = useState([]);
	const [product, setProduct] = useState({
		product_name: "",
		product_desc: "",
		product_price: 0,
		category_id: 0,
		supplier_id: 0,
		quantity_in_stock: 0,
		minimum_reorder_level: 1,
	});

	useEffect(() => {
		fetchProductCategories();
	}, []);

	let AddProduct = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("product_image", e.target.elements.product_image.files[0]);

		// Append each property in the product object to formData
		for (let key in product) {
			formData.append(key, product[key]);
		}

		console.log(product);

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

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => AddProduct(e)} enctype="multipart/form-data">
					<HeaderTitle>Add Products</HeaderTitle>
					<FieldContainer>
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
								type="number"
								placeholder="Enter your Price"
								onChange={(e) => {
									setProduct({ ...product, product_price: parseInt(e.target.value, 10) });
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
									{/* <SecondaryButton onClick={onButtonClick}>
										{fileUploaded ? "You've uploaded a file" : "Click to Upload or Drag and drop an Image"}
									</SecondaryButton> */}
									{/* <FileInput ref={fileInput} onChange={handleFileUpload} /> */}
									<input type="file" name="product_image" required />
								</Centered>
							</ProfilePictureContainer>
						</div>

						<LabelContainer>
							<Label>Category</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Category</FieldTitleLabel>
							<Select
								value={product.category_id}
								onChange={(e) => {
									setProduct({ ...product, category_id: e.target.value });
								}}
							>
								{categories.map((category) => (
									<Option value={category.id} key={category.id}>
										{category.name}
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
