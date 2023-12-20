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
import { getAllWarehouse, getWarehouse } from "@/api/warehouse";

import styled from "styled-components";

const DeactivateModalContainer = styled.div`
	backdrop-filter: blur(2px);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999999999;
	background-color: rgba(3, 10, 22, 0.768627451) !important;

	.inner {
		background-color: white;
		width: 90%;
		max-width: 400px;
		padding: 1.75rem;
		width: 100%;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: white;
		border-radius: 0.5rem;
		position: absolute;
		max-height: 90vh;
		overflow: auto;
		box-shadow: 0px 1px 3px rgba(7, 14, 35, 0.06), 0px 2px 8px rgba(7, 14, 35, 0.05);
		outline: none;
		max-width: 400px;
		overflow: hidden;
		.modal-icon {
			width: 3rem;
			min-width: 3rem;
			height: 3rem;
			border-radius: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			margin-bottom: 1.5rem;
			background-color: #fee2e2;
		}

		.modal-header {
			font-size: 16px;
			line-height: 19px;
			color: #121417;
			margin-bottom: 0.5rem;
			padding: 0;
			border: 0;
			display: flex;
			justify-content: center;
		}

		.modal-description {
			font-weight: 400;
			font-size: 13px;
			line-height: 18px;
			text-align: center;
			color: #555d67;
		}

		.modal-item-text {
			font-size: 1rem;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 1rem;
			background: #e8edf0;
			padding: 1rem;
			border-radius: 0.5rem;
		}

		.buttons-container {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: nowrap;
			border-top: none;
			margin-top: 1.75rem;
			padding: 0;
			gap: 1rem;
		}

		.cancel {
			color: #555d67;
			background-color: white;
			border: 1px solid #dfe5e9;
			box-shadow: 0 1px 2px rgba(18, 20, 23, 0.06);
			font-weight: 500;
		}
	}
`;

const DeactivateModal = ({ type, text, close, confirm }) => {
	const handleConfirmation = () => {
		// Perform delete or other actions based on the specific logic
		confirm();
		// Close the modal or perform any other action after confirmation
		close(false);
	};

	return (
		<DeactivateModalContainer>
			<div className="inner">
				<div class="modal-icon error">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 9V11M12 15V15.01" stroke="#E16727" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
						<path
							d="M4.99921 19H18.9992C19.3255 18.9977 19.6463 18.9156 19.9336 18.7609C20.2209 18.6061 20.466 18.3834 20.6474 18.1122C20.8289 17.841 20.9412 17.5295 20.9747 17.2049C21.0081 16.8803 20.9616 16.5525 20.8392 16.25L13.7392 4C13.5663 3.6874 13.3127 3.42683 13.005 3.24539C12.6972 3.06394 12.3465 2.96825 11.9892 2.96825C11.632 2.96825 11.2812 3.06394 10.9735 3.24539C10.6657 3.42683 10.4122 3.6874 10.2392 4L3.13921 16.25C3.01915 16.5456 2.97155 16.8656 3.00036 17.1833C3.02918 17.501 3.13359 17.8073 3.30486 18.0764C3.47614 18.3456 3.70932 18.5698 3.98494 18.7305C4.26056 18.8912 4.57061 18.9836 4.88921 19"
							stroke="#E16727"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
				</div>
				<p className="modal-header">You want to move an Inventory</p>

				<p className="modal-description">You are transferring inventory to the Front Store, but there is still stock of the product youre moving. Continue? </p>

				<div className="buttons-container">
					<Button className="cancel" width="49%" onClick={() => close(false)}>
						Cancel
					</Button>
					<Button width="49%" onClick={handleConfirmation}>
						Confirm
					</Button>
				</div>
			</div>
		</DeactivateModalContainer>
	);
};

const MoveInventory = ({ setIsMovePopUpOpen, getInventoryFunc, selectedInventory }) => {
	const [loading, setLoading] = useState(false);
	const [inventory, setInventory] = useState({
		inventory_id: 0,
		quantity: 1,
		warehouse_id: 0,
		area_id: 0,
	});

	const [warning, setWarning] = useState(false);

	const [warehouses, setWarehouses] = useState([]);
	const [areas, setAreas] = useState([]);

	const moveInventoryFunc = async (e) => {
		e.preventDefault();

		if (inventory.warehouse_id === 1) {
			let warehouse = await getWarehouse(1);
			warehouse = warehouse.warehouse;

			if (warehouse && warehouse.inventory?.length > 0) {
				const inventory = warehouse.inventory.find((inv) => inv.product_id === selectedInventory.product_id);

				if (inventory) {
					setWarning(true);
					return;
				}
			}
		}

		setLoading(true);
		const res = await moveInventory(inventory);
		setLoading(false);

		if (!res) return;

		if (res.errors) return toast.error(res.errors[0].message);
		toast.success("Inventory moved successfully");
		getInventoryFunc();
		setIsMovePopUpOpen(false);
	};

	const moveInventoryFuncConfirm = async (e) => {
		setLoading(true);
		const res = await moveInventory(inventory);
		setLoading(false);

		if (!res) return;

		if (res.errors) return toast.error(res.errors[0].message);
		toast.success("Inventory moved successfully");
		getInventoryFunc();
		setIsMovePopUpOpen(false);
	};

	const fetchWarehouses = async () => {
		const res = await getAllWarehouse();

		if (!res) return;

		if (res && res.warehouses.length > 0) {
			let activeWarehouses = res.warehouses.filter((warehouse) => warehouse.isActive);
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

			{warning && <DeactivateModal type="product" text="Product Name" close={setWarning} confirm={moveInventoryFuncConfirm} />}
		</PopupOverlay>
	);
};

export default MoveInventory;
