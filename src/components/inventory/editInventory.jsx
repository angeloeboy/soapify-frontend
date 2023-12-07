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
import { getInventory } from "@/api/inventory";
import { getProducts } from "@/api/products";

const EditInventoryComponent = ({ setIsEditPopUpOpen, getInventoryFunc }) => {
	const currentDate = new Date().toISOString();

	const [inventory, setInventory] = useState({
		product_id: 0,
		quantity: 1,
		date_added: currentDate,
		date_updated: currentDate,
	});

	const [products, setProducts] = useState([]);

	useEffect(() => {
		console.log(inventory);
	}, [inventory]);

	const fetchInventory = () => {
		getProducts().then((res) => {
			console.log(res);
			res ? setProducts(res.products) : setProducts([]);
			if (res.products.length > 0) {
				setInventory({ ...inventory, product_id: res.products[0].product_id });
			}
		});
	};

	const editInventoryFunc = async (e) => {
		e.preventDefault();
		await editInventory(inventory).then((res) => {
			console.log(res);
		});

		await getInventoryFunc();
	};

	useEffect(() => {
		fetchInventory();
	}, []);

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => editInventoryFunc(e)}>
					<HeaderTitle>Edit Inventory</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>General Information</Label>{" "}
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Product</FieldTitleLabel>
							<Select value={inventory.product_id} onChange={(e) => setInventory({ ...inventory, product_id: e.target.value })}>
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
							<FieldTitleLabel notFirst>Quantity</FieldTitleLabel>
							<InputHolder
								type="number"
								placeholder="Enter your minimum stock"
								onChange={(e) => setInventory({ ...inventory, quantity: e.target.value })}
								value={inventory.quantity}
							/>
						</div>
						<div>
							<FieldTitleLabel notFirst>Date Received</FieldTitleLabel>
							<InputHolder
								type="date"
								placeholder="Enter your Quantity Remaining"
								onChange={(e) => setInventory({ ...inventory, date_added: e.target.value })}
							/>
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={() => setIsEditPopUpOpen(false)}>Close</CloseButton>
						<Button type="submit">Save</Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default EditInventoryComponent;
