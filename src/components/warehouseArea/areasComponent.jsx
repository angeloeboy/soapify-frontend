import React, { useState, useEffect } from "react";
import { getAreasByWarehouseId } from "@/api/warehouse";
import { TableData, TableRows, TableHeadings } from "@/styled-components/TableComponent";
import Table from "@/styled-components/TableComponent";
// import {
//   PopupContent,
//   PopupOverlay,
//   CloseButton,
//   FieldContainer,
// } from PopUp
import { PopupContent, PopupOverlay, CloseButton, FieldContainer } from "../styled-components/PopUpForAreasComponent";
import { HeaderTitle } from "@/styled-components/ItemActionModal";
import { ButtonsContainer } from "../styled-components/PopUpForAreasComponent";
import StyledPanel from "@/styled-components/StyledPanel";

const AreasComponent = ({ warehouse_id, onClose, setShowAddArea }) => {
	const [warehouseArea, setWarehouseArea] = useState([]);

	useEffect(() => {
		const fetchAreas = async () => {
			try {
				const response = await getAreasByWarehouseId(warehouse_id);
				if (response && response.data && response.data.length > 0) {
					setWarehouseArea(response.data);
				} else {
					setWarehouseArea([]);
				}
			} catch (error) {
				console.error("Error fetching areas:", error);
			}
		};

		fetchAreas();
	}, [warehouse_id]);

	const handleClose = () => {
		setShowAddArea(false); // Close the modal using setShowAddArea
		onClose(); // Trigger the onClose function passed as a prop
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle> Warehouse Area </HeaderTitle>
				{/* <FieldContainer>
					{warehouseArea && warehouseArea.length > 0 ? (
						<Table>
							<thead>
								<TableRows>
									<TableHeadings>Area Name</TableHeadings>
									<TableHeadings>Max Capacity</TableHeadings>
								</TableRows>
							</thead>
							<tbody>
								{warehouseArea.map((area) => (
									<TableRows key={area.area_id}>
										<TableData>{area.area_name}</TableData>
										<TableData>{area.max_capacity}</TableData>
									</TableRows>
								))}
							</tbody>
						</Table>
					) : (
						<p>No areas found for Warehouse ID: {warehouse_id}</p>
					)}
				</FieldContainer>
				<ButtonsContainer>
					<CloseButton onClick={handleClose}>Close</CloseButton>
				</ButtonsContainer> */}

				<FieldContainer>
					{warehouseArea && warehouseArea.length > 0 && (
						<div>
							{warehouseArea.map((area) => (
								<div key={area.area_id}>
									<h3>Area Name: {area.area_name}</h3>
									<h3>Max Capacity: {area.max_capacity}</h3>
								</div>
							))}
						</div>
					)}
				</FieldContainer>

				<ButtonsContainer>
					<CloseButton onClick={() => onClose()}>Close</CloseButton>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default AreasComponent;
