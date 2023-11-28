import {
	Button,
	Select,
	LabelContainer,
	Label,
	Option,
	FieldContainer,
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
import { getAllWarehouse } from "@/api/warehouse";

const AddInventory = ({ setIsAddPopUpOpen, getInventoryFunc, productId }) => {
	const currentDate = new Date().toISOString();

	const [loading, setLoading] = useState(false);
	const [inventory, setInventory] = useState({
		product_id: productId ? parseInt(productId) : 0,
		quantity: 1,
		date_added: currentDate,
		date_updated: currentDate,
		expiry_date: currentDate,
		warehouse_id: 0,
		area_id: 0,
	});

	const [products, setProducts] = useState([]);
	const [warehouses, setWarehouses] = useState([]);
	const [areas, setAreas] = useState([]);
	const fetchProducts = () => {
		getProducts().then((res) => {
			console.log(res);
			const activeProducts = res.products.filter((product) => product.isActive);

			res ? setProducts(activeProducts) : setProducts([]);
			// if (res.products.length > 0) {
			// 	setInventory({ ...inventory, product_id: res.products[0].product_id });
			// }

			setInventory({ ...inventory, product_id: activeProducts[0].product_id });
		});

		console.log(inventory);
	};

	const fetchWarehouses = async () => {
		const res = await getAllWarehouse();
		console.log(res);

		if (!res) return;

		if (res.warehouses.length > 0) {
			setInventory({ ...inventory, warehouse_id: res.warehouses[0].warehouse_id, area_id: res.warehouses[0].areas[0]?.area_id });
			setAreas(res.warehouses[0]?.areas);
		}

		res ? setWarehouses(res.warehouses) : setWarehouses([]);
	};

	const addInventoryFunc = async (e) => {
		e.preventDefault();
		setLoading(true);

		const res = await addInventory(inventory);

		if (res.status == "Success") {
			toast.success("Successfully added inventory");
			await getInventoryFunc();
			setIsAddPopUpOpen(false);
		} else {
			// toast.error(res.errors[0].message);
			console.log(res);
		}

		setLoading(false);
	};

	useEffect(() => {
		setInventory({ ...inventory, area_id: 0 });
		warehouses.map((warehouse) => {
			if (warehouse.warehouse_id != inventory.warehouse_id) return;
			setAreas(warehouse.areas);
		});
	}, [inventory.warehouse_id]);

	useEffect(() => {
		fetchProducts();
		fetchWarehouses();
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

						<div>
							<FieldTitleLabel notFirst>Expiration date</FieldTitleLabel>
							<InputHolder type="date" placeholder="" onChange={(e) => setInventory({ ...inventory, expiry_date: e.target.value })} />
						</div>

						<div>
							<FieldTitleLabel notFirst>Warehouse</FieldTitleLabel>
							<Select value={inventory.warehouse_id} onChange={(e) => setInventory({ ...inventory, warehouse_id: e.target.value })}>
								{warehouses.map((warehouse) => {
									return (
										<Option value={warehouse.warehouse_id} key={warehouse.warehouse_id}>
											{warehouse.warehouse_name}
										</Option>
									);
								})}
							</Select>
						</div>
						{areas.length > 0 && (
							<div>
								<FieldTitleLabel notFirst>Area</FieldTitleLabel>
								<Select value={inventory.area_id} onChange={(e) => setInventory({ ...inventory, area_id: e.target.value })}>
									{areas.map((area) => {
										return (
											<Option value={area.area_id} key={area.area_id}>
												{area.area_name}
											</Option>
										);
									})}
								</Select>
							</div>
						)}
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
