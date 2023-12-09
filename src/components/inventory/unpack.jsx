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
import { addInventory, convertBoxToPcs, convertPcsToBox, moveInventory } from "@/api/inventory";
import { toast } from "react-toastify";
import Image from "next/image";
import { getAllWarehouse } from "@/api/warehouse";

const UnpackInventory = ({ setIsUnpackPopUpOpen, getInventoryFunc, selectedInventory }) => {
	const [loading, setLoading] = useState(false);

	const [warehouses, setWarehouses] = useState([]);
	const [areas, setAreas] = useState([]);

	const [inventory, setInventory] = useState({
		inventory_id: 0,
		quantity: 1,
		warehouse_id: 0,
		area_id: 0,
	});

	const [quantity, setQuantity] = useState(0);
	const fetchWarehouses = async () => {
		const res = await getAllWarehouse();

		if (!res) return;

		if (res && res.warehouses.length > 0) {
			let activeWarehouses = res.warehouses.filter((warehouse) => warehouse.isActive);
			//select only warehouses with areas
			activeWarehouses = activeWarehouses.filter((warehouse) => warehouse.areas.length > 0);

			setWarehouses(activeWarehouses);
			setAreas(activeWarehouses[0].areas);
		}
	};

	//

	useEffect(() => {
		const selectedWarehouse = warehouses.find((warehouse) => warehouse.warehouse_id === inventory.warehouse_id);
		if (selectedWarehouse) {
			setAreas(selectedWarehouse.areas);
			if (selectedWarehouse.areas.length > 0) {
				setInventory((inv) => ({ ...inv, area_id: selectedWarehouse.areas[0].area_id }));
			} else {
				setInventory((inv) => ({ ...inv, area_id: 0 }));
			}
		}
	}, [inventory.warehouse_id, warehouses]);

	useEffect(() => {
		if (warehouses.length > 0) {
			setInventory((inv) => ({ ...inv, warehouse_id: warehouses[0].warehouse_id }));
		}
	}, [warehouses]);

	useEffect(() => {
		fetchWarehouses();
	}, []);

	useEffect(() => {
		if (selectedInventory) {
			setInventory((inv) => ({ ...inv, inventory_id: selectedInventory.inventory_id }));
		}
	}, [selectedInventory]);

	useEffect(() => {
		console.log(inventory);
	}, [inventory]);

	const convertBoxToPcsFunc = async (e) => {
		e.preventDefault();
		const res = await convertBoxToPcs(inventory, quantity);

		console.log(res);
		if (res.status == "Success") {
			toast.success("Inventory converted successfully");
			getInventoryFunc();
			setIsUnpackPopUpOpen(false);
			return;
		}

		toast.error(res.errors[0].message);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => convertBoxToPcsFunc(e)}>
					<HeaderTitle>Unpack boxes </HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>Quantity</Label>
						</LabelContainer>

						<div>
							<FieldTitleLabel notFirst>How many boxes?</FieldTitleLabel>

							<InputHolder
								type="number"
								min="0"
								onChange={(e) => {
									// Regular expression to allow only positive numbers and decimals
									const validPositiveNumberRegex = /^[0-9]*(\.[0-9]+)?$/;

									if (e.target.value === "") {
										setQuantity("");
									} else if (validPositiveNumberRegex.test(e.target.value)) {
										setQuantity(Number(e.target.value));
									}
								}}
								pattern="^[0-9]*(\.[0-9]+)?$"
								title="Please enter a valid positive number. Decimals are allowed."
								required
								value={quantity}
							/>
						</div>

						<LabelContainer>
							<Label>Position </Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Warehouse</FieldTitleLabel>
							<Select value={inventory.warehouse_id} onChange={(e) => setInventory({ ...inventory, warehouse_id: Number(e.target.value) })}>
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
								<Select value={inventory.area_id} onChange={(e) => setInventory({ ...inventory, area_id: Number(e.target.value) })}>
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
						<CloseButton type="button" onClick={() => setIsUnpackPopUpOpen(false)}>
							Close
						</CloseButton>
						<Button type="submit">{loading ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Convert"} </Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default UnpackInventory;
