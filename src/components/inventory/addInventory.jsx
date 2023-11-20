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
import { toast } from "react-toastify";
import Image from "next/image";

const AddInventory = ({ setIsAddPopUpOpen, getInventoryFunc, productId }) => {
	const currentDate = new Date().toISOString();

	const [loading, setLoading] = useState(false);
	const [inventory, setInventory] = useState({
		product_id: productId ? parseInt(productId) : 0,
		quantity: 1,
		date_added: currentDate,
		date_updated: currentDate,
	});

	const [products, setProducts] = useState([]);

	const fetchProducts = () => {
		getProducts().then((res) => {
			console.log(res);
			const activeProducts = res.products.filter((product) => product.isActive);

			res ? setProducts(activeProducts) : setProducts([]);
			// if (res.products.length > 0) {
			// 	setInventory({ ...inventory, product_id: res.products[0].product_id });
			// }
		});

		console.log(inventory);
	};

	const addInventoryFunc = async (e) => {
		e.preventDefault();
		setLoading(true);
		// await addInventory(inventory).then((res) => {
		// 	console.log(res);
		// });
		// toast.success("Successfully added inventory");
		// await getInventoryFunc();

		const res = await addInventory(inventory);

		if (res.status == "Success") {
			toast.success("Successfully added inventory");
			await getInventoryFunc();
			setIsAddPopUpOpen(false);
		} else {
			toast.error(res.errors[0].message);
		}

		setLoading(false);
	};

	useEffect(() => {
		fetchProducts();
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
							<Select value={inventory.product_id} onChange={(e) => setInventory({ ...inventory, product_id: e.target.value })}>
								{products.map((product) => {
									return (
										<Option value={product.product_id} key={product.product_id}>
											{product.product_code} - {product.product_name}
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
						<CloseButton onClick={() => setIsAddPopUpOpen(false)}>Close</CloseButton>
						<Button type="submit">{loading ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Save"} </Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddInventory;
