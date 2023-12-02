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
import { addInventory, moveInventory } from "@/api/inventory";
import { toast } from "react-toastify";
import Image from "next/image";
import { getAllWarehouse } from "@/api/warehouse";

const MoveInventory = ({ setIsMovePopUpOpen, getInventoryFunc, selectedInventory }) => {
	const [loading, setLoading] = useState(false);
	const [inventory, setInventory] = useState({
		inventory_id: 0,
		quantity: 1,
		warehouse_id: 0,
		area_id: 0,
	});

	const [warehouses, setWarehouses] = useState([]);
	const [areas, setAreas] = useState([]);

	const fetchWarehouses = async () => {
		const res = await getAllWarehouse();

		if (!res) return;

		if (res && res.warehouses.length > 0) {
			let activeWarehouses = res.warehouses.filter((warehouse) => warehouse.isActive);
			setWarehouses(activeWarehouses);
			setAreas(activeWarehouses[0].areas);
		}
	};

	const moveInventoryFunc = async (e) => {
		e.preventDefault();

		setLoading(true);
		const res = await moveInventory(inventory);
		setLoading(false);

		if (!res) return;

		if (res.errors) return toast.error(res.errors[0].message);
		toast.success("Inventory moved successfully");
		getInventoryFunc();
		setIsMovePopUpOpen(false);
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

	return (
		<PopupOverlay>
			<PopupContent>
				<form onSubmit={(e) => moveInventoryFunc(e)}>
					<HeaderTitle>Add Inventory</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>General Information</Label>{" "}
						</LabelContainer>

						<div>
							<FieldTitleLabel notFirst>Quantity to move</FieldTitleLabel>
							<InputHolder type="number" onChange={(e) => setInventory({ ...inventory, quantity: Number(e.target.value) })} value={inventory.quantity} />
						</div>

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
						<CloseButton type="button" onClick={() => setIsMovePopUpOpen(false)}>
							Close
						</CloseButton>
						<Button type="submit">{loading ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Save"} </Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default MoveInventory;
