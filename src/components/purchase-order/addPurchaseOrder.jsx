import styled from "styled-components";
// import { addPurchaseOrder } from "@/api/purchase-order"; // Adjust the API import based on your requirements
import ReportDiscrepancyModal from "../misc/reportDiscrepancyModal";
import ConfirmPurchaseOrderModalContainer from "../misc/confirmPurchaseOrderModal";
import { useEffect, useState } from "react";
import {
	Label,
	Button,
	LabelContainer,
	FieldContainer,
	Centered,
	CloseButton,
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
	Select,
	Option,
} from "@/styled-components/ItemActionModal";
import Image from "next/image";
import ConfirmPurchaseOrder from "../misc/confirmPurchaseOrderModal";

// Import additional libraries as needed

const AddPurchaseOrder = ({ setIsAddPurchaseOrderPopUpOpen, setIsAddPopUpOpen }) => {
	const [isConfirmReceivedOpen, setIsReceiveConfirmOpen] = useState(false);

	const [suppliers, setSuppliers] = useState([]); // This should be filled with actual data from API or state
	const [selectedSupplier, setSelectedSupplier] = useState(""); // This will hold the selected supplier ID or name
	useEffect(() => {
		// Fetch or define suppliers here
		// Example:
		setSuppliers([
			{ id: "supplier1", name: "Supplier One" },
			{ id: "supplier2", name: "Supplier Two" },
			// ... more suppliers
		]);
	}, []);
	return (
		<PopupOverlay>
			<PopupContent>
				<form>
					<HeaderTitle>Create Purchase Order</HeaderTitle>
					<FieldContainer>
						<LabelContainer first>
							<Label>Product</Label>
						</LabelContainer>

						<LabelContainer first>
							<Label>Supplier</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel>Supplier</FieldTitleLabel>
							<Select value={selectedSupplier} onChange={(e) => setSelectedSupplier(e.target.value)}>
								<Option value="">Select a supplier</Option>
								{suppliers.map((supplier) => (
									<Option key={supplier.id} value={supplier.id}>
										{supplier.name}
									</Option>
								))}
							</Select>
						</div>

						<div>
							<FieldTitleLabel>Address</FieldTitleLabel>

							<InputHolder type="text" />
						</div>
						<LabelContainer first>
							<Label>Notes (if applicable)</Label>
						</LabelContainer>
						<div>
							<FieldTitleLabel>Name</FieldTitleLabel>
							<InputHolder type="text" />
						</div>
					</FieldContainer>

					<ButtonsContainer>
						<CloseButton onClick={() => setIsAddPopUpOpen(false)} type="button">
							Close
						</CloseButton>
						<Button onClick={() => setIsReceiveConfirmOpen(true)} type="button">
							Receive
						</Button>
						{/* <Button onClick={() => setIsReportDiscrepancyOpen(true)} type="button">
							Report Discrepancy
						</Button> */}
					</ButtonsContainer>
				</form>
			</PopupContent>

			{isConfirmReceivedOpen && (
				<ConfirmPurchaseOrderModalContainer
					purchaseOrderId={"Your Purchase Order ID"} // pass the relevant ID
					close={() => setIsReceiveConfirmOpen(false)}
					// report={/* Function to handle discrepancy report */}
				/>
			)}

			{/* {isReportDiscrepancyOpen && (
				<ReportDiscrepancyModal
					purchaseOrderId={"Your Purchase Order ID"} // pass the relevant ID
					close={() => setIsReportDiscrepancyOpen(false)}
				 
				/>
			)} */}
		</PopupOverlay>
	);
};

export default AddPurchaseOrder;
