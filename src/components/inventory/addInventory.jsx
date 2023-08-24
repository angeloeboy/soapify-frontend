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
import { addInventory } from "@/api/inventory";

const AddInventoryComponent = ({ onClose, onButtonClick, getInventoryFunc }) => {
	const [inventory, setInventory] = useState({
		product_id: 1,
		quantity: 1,
		date_added: "2023-08-12T08:00:00Z",
		date_updated: "2023-08-12T08:00:00Z",
	});

	const [products, setProducts] = useState([]);

	const getProductsFunc = () => {
		getProducts().then((res) => {
			console.log(res);
			res ? setProducts(res.products) : setProducts([]);
		});
	};

	const addInventoryFunc = (e) => {
		e.preventDefault();
		addInventory(inventory).then((res) => {
			console.log(res);
			res ? setInventory(res.inventory) : setInventory([]);
		});
	};

	useEffect(() => {
		getProductsFunc();
	}, []);

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => addInventoryFunc(e)}>
					<HeaderTitle>Add Inventory</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>General Information</Label>{" "}
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Product</FieldTitleLabel>
							<Select onChange={(e) => setInventory({ ...inventory, product_id: e.target.value })} value={inventory.product_id}>
								{products.map((product) => {
									return (
										<Option value={product.product_id} key={product.product_id}>
											{product.product_name}
										</Option>
									);
								})}
							</Select>
						</div>
						<div>
							<FieldTitleLabel notFirst>SKU</FieldTitleLabel>
							<InputHolder type="text" placeholder="" />
						</div>
						<div>
							<FieldTitleLabel notFirst>Quantity</FieldTitleLabel>
							<InputHolder
								type="text"
								placeholder="Enter your minimum stock"
								onChange={(e) => setInventory({ ...inventory, quantity: e.target.value })}
								value={inventory.quantity}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Date Received</FieldTitleLabel>
							<InputHolder type="date" placeholder="Enter your Quantity Remaining" />
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
