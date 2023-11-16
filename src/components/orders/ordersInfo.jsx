import React, { useEffect, useState } from "react";
import {
	Button,
	FieldContainer,
	FieldTitleLabel,
	InputHolder,
	Label,
	LabelContainer,
	PopupContent,
	PopupOverlay,
	HeaderTitle,
	ButtonsContainer,
} from "@/styled-components/ItemActionModal";
import { CloseButton } from "../styled-components/PopUp";
import { setTransactionStatus } from "@/api/transaction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrdersInfo = ({ setIsOrdersInfoOpen, selectedTransaction, fetchTransactions }) => {
	useEffect(() => {
		console.log(selectedTransaction.items);
	}, []);

	const updateStatus = async (status) => {
		const res = await setTransactionStatus(selectedTransaction.transaction_id, status);
		console.log(res);

		if (res.status === "Success") {
			toast.success("Transaction status updated");
			setIsOrdersInfoOpen(false);
			console.log("Success");
			fetchTransactions();
			return;
		}

		toast.error(res.message);
	};

	const markAsPending = async () => {
		await updateStatus("PENDING");
	};

	const markAsPaid = async () => {
		await updateStatus("PAID");
	};

	const markAsCancelled = async () => {
		await updateStatus("CANCELLED");
	};

	const markAsRefunded = async () => {
		await updateStatus("REFUNDED");
	};

	const markAsDone = async () => {
		await updateStatus("DONE");
	};

	const batchInfo = (batch_info) => {
		let jsonBatchInfo = JSON.parse(batch_info);
		return jsonBatchInfo;
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Edit Order {selectedTransaction.transaction_id} </HeaderTitle>
				<FieldContainer>
					{selectedTransaction.createdAt}
					{selectedTransaction.items.map((item) => (
						<div key={item.id}>
							<p>Name: {item.product.product_name}</p>
							<p>Price: {item.product.product_price}</p>
							<p>Quantity: {item.quantity}</p>
							
							<div>
								{batchInfo(item.batch_info).map((info, index) => {
									return (
										<div key={index}>
											<p>Batch Number: {info.batch_no}</p>
											<p>Quantity: {info.quantity}</p>
										</div>
									);
								})}
							</div>
						</div>
					))}

					<p>Status: {selectedTransaction.status}</p>
					<button onClick={() => markAsPending()}>Mark as pending</button>
					<button onClick={() => markAsPaid()}>Mark as paid</button>
					<button onClick={() => markAsCancelled()}>Mark as cancelled</button>
					<button onClick={() => markAsRefunded()}>Mark as refunded</button>
					<button onClick={() => markAsDone()}>Mark as done</button>
				</FieldContainer>

				<ButtonsContainer>
					<CloseButton onClick={() => setIsOrdersInfoOpen(false)}>Close </CloseButton>
					<Button onClick={() => addPaymentMethodFunc()}>Save</Button>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default OrdersInfo;
