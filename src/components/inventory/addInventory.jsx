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
import { addProduct, getProducts } from "@/api/products";

const AddInventoryComponent = ({ onClose, onButtonClick, GetProducts }) => {
	const [fileUploaded, setFileUploaded] = useState(false);
	const [product, setProduct] = useState({
		product_name: "",
		product_desc: "",
		product_price: 0,
		category_id: 0,
		supplier_id: 0,
		quantity_in_stock: 0,
	});

	const [products, setProducts] = useState([]);

	const getProductsFunc = () => {
		getProducts().then((res) => {
			console.log(res);
			res ? setProducts(res.products) : setProducts([]);
			// setProductsLoading(false);
		});
	};

	useEffect(() => {
		getProductsFunc();
	}, []);
	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => AddProduct(e)} enctype="multipart/form-data">
					<HeaderTitle>Add Inventory</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>General Information</Label>{" "}
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Product</FieldTitleLabel>
							<Select>
								{/* <Option value="Dishawashing Liquid">Dishawashing Liquid</Option>
								<Option value="Soap">Soap</Option>
								<Option value="General Items">General Items</Option> */}

								{products.map((product) => {
									return (
										<Option value="General Items" key={product.product_id}>
											{product.product_name}
										</Option>
									);
								})}
							</Select>
						</div>
						<div>
							<FieldTitleLabel notFirst>SKU</FieldTitleLabel>
							<InputHolder type="number" placeholder="" />
						</div>
						<div>
							<FieldTitleLabel notFirst>Quantity</FieldTitleLabel>
							<InputHolder type="text" placeholder="Enter your minimum stock" />
						</div>
						<div>
							<FieldTitleLabel notFirst>Quantity Remaining</FieldTitleLabel>
							<InputHolder type="text" placeholder="Quantity received" />
						</div>
						<div>
							<FieldTitleLabel notFirst>Date Received</FieldTitleLabel>
							<InputHolder type="date" placeholder="Enter your Quantity Remaining" />
						</div>

						<LabelContainer>
							<Label>Category</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Category</FieldTitleLabel>
							<Select>
								<Option value="Dishawashing Liquid">Dishawashing Liquid</Option>
								<Option value="Soap">Soap</Option>
								<Option value="General Items">General Items</Option>
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

export default AddInventoryComponent;
