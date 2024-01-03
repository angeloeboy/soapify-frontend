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
import { getAllWarehouse, getWarehouse } from "@/api/warehouse";
import Link from "next/link";
import { getSuppliers } from "@/api/supplier";

const AddInventory = ({ setIsAddPopUpOpen, getInventoryFunc, productId, openModal, fromProducts, fetchProductsFunc }) => {
	const currentDate = new Date().toISOString();

	const getCurrentDateTime = () => {
		const now = new Date();
		return now.toISOString().split("T")[0] + " " + now.toTimeString().split(" ")[0];
	};

	const [loading, setLoading] = useState(false);
	const [inventory, setInventory] = useState({
		product_id: productId && openModal ? parseInt(productId) : 0,
		quantity: 1,
		date_added: getCurrentDateTime(),
		date_updated: getCurrentDateTime(),
		expiry_date: getCurrentDateTime(),
		warehouse_id: 0,
		area_id: 0,
		supplier_id: 0,
	});

	const [products, setProducts] = useState([]);
	const [warehouses, setWarehouses] = useState([]);
	const [areas, setAreas] = useState([]);
	const [suppliers, setSuppliers] = useState([]);

	const fetchProducts = async () => {
		getProducts().then((res) => {
			const activeProducts = res.products.filter((product) => product.isActive);

			res ? setProducts(activeProducts) : setProducts([]);

			if (productId && openModal) return;
			setInventory({ ...inventory, product_id: activeProducts[0].product_id });
		});
	};

	const appendCurrentTime = (date) => {
		const now = new Date();
		const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
		return `${date} ${time}`; // Combine date and time
	};

	const fetchWarehouses = async () => {
		const res = await getAllWarehouse();

		if (!res) return;

		if (res && res.warehouses.length > 0) {
			let activeWarehouses = res.warehouses.filter((warehouse) => warehouse.isActive);
			console.log(res);
			//select only warehouse with areas
			// activeWarehouses = activeWarehouses.filter((warehouse) => warehouse.areas.length > 0);

			setWarehouses(activeWarehouses);

			setAreas(activeWarehouses[0]?.areas ? activeWarehouses[0].areas : []);
		}
	};

	const fetchSuppliers = async () => {
		const res = await getSuppliers();

		if (!res) return;

		if (res && res.suppliers.length > 0) {
			setSuppliers(res.suppliers);
		}
	};

	const addInventoryFunc = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (inventory.warehouse_id === 1) {
			let warehouse = await getWarehouse(1);
			warehouse = warehouse.warehouse;

			if (warehouse && warehouse.inventory?.length > 0) {
				console.log(warehouse.inventory);

				let theresStillinventory = false;

				warehouse.inventory.forEach((inv) => {
					if (inv.product_id === inventory.product_id && inv.current_quantity > 0) {
						theresStillinventory = true;
					}
				});

				if (theresStillinventory) {
					toast.warning("You cannot add this inventory to Front store because there is an older inventory of this product");
					setLoading(false);
					return;
				}
			}
		}

		const res = await addInventory(inventory);

		if (res.status && res.status == "Success") {
			toast.success("Successfully added inventory");
			setIsAddPopUpOpen(false);

			if (fromProducts) {
				await fetchProductsFunc();
				return;
			}

			await getInventoryFunc();
		} else {
			toast.error(res.errors[0].message);
		}

		setLoading(false);
	};

	useEffect(() => {
		const selectedWarehouse = warehouses.find((warehouse) => warehouse.warehouse_id === inventory.warehouse_id);
		if (selectedWarehouse) {
			setAreas(selectedWarehouse.areas);
			if (selectedWarehouse.areas.length > 0) {
				setInventory((inv) => ({ ...inv, area_id: selectedWarehouse.areas[0].area_id, supplier_id: suppliers[0]?.supplier_id }));
			} else {
				setInventory((inv) => ({ ...inv, area_id: 0 }));
			}
		}
	}, [inventory.warehouse_id, warehouses, suppliers]);

	useEffect(() => {
		if (warehouses.length > 0) {
			setInventory((inv) => ({ ...inv, warehouse_id: warehouses[0].warehouse_id, supplier_id: suppliers[0]?.supplier_id }));
		}

		if (products.length > 0) {
			if (productId && openModal) return;
			setInventory((inv) => ({ ...inv, product_id: products[0].product_id, supplier_id: suppliers[0]?.supplier_id }));
		}
	}, [warehouses, products]);

	useEffect(() => {
		setup();
	}, []);

	const setup = async () => {
		await fetchWarehouses();
		await fetchProducts();
		await fetchSuppliers();
	};

	useEffect(() => {
		console.log(inventory);
	}, [inventory]);

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
							<FieldTitleLabel notFirst>Quantity</FieldTitleLabel>
							<InputHolder
								type="number"
								placeholder="Enter your minimum stock"
								onChange={(e) => setInventory({ ...inventory, quantity: e.target.value })}
								value={inventory.quantity}
							/>
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
						{areas.length > 0 ? (
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
						) : (
							<Link className="sml-link" href="/dashboard/warehouse">
								A warehouse needs an area. Add area first
							</Link>
						)}

						<LabelContainer>
							<Label>Supplier</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel notFirst>Supplier</FieldTitleLabel>
							<Select
								value={inventory.supplier_id}
								onChange={(e) => {
									setInventory({
										...inventory,
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

							{suppliers.length == 0 && (
								<Link className="sml-link" href="/dashboard/suppliers?add=true">
									Add Supplier
								</Link>
							)}
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton
							onClick={() => {
								//remove the ?productId=1&openModal=true from the url
								window.history.replaceState(null, null, window.location.pathname);
								setIsAddPopUpOpen(false);
							}}
							type="button"
						>
							Close
						</CloseButton>
						<Button type="submit">{loading ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Save"} </Button>
					</ButtonsContainer>
				</form>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AddInventory;
