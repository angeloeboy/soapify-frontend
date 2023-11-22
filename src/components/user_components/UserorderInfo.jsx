/* eslint-disable @next/next/no-img-element */
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
	OrdersWrapper,
} from "@/styled-components/ItemActionModal";
import { CloseButton } from "../styled-components/PopUp";
import { requestForCancelTransaction, setTransactionStatus } from "@/api/transaction";
import { toast } from "react-toastify";
import styled from "styled-components";
import Image from "next/image";

const Product = styled.div`
	/* display: flex; */
	margin-bottom: 38px;
	/* flex-direction: column; */
	flex-wrap: wrap;
	img {
		background-color: white;
	}

	.productInformation {
		margin-top: 16px;

		.productName {
			color: #536686;
			font-size: 14px;
			font-weight: 700;
		}

		.productPrice {
			color: #005eff;
			font-size: 14px;
			font-weight: 700;
			margin-top: 16px;
		}

		.wrapper {
			display: flex;
			p {
				margin-left: 12px;
			}
		}
	}

	.quantity {
		display: inline-flex;
		/* margin-left: auto; */
		align-items: center;
		align-self: flex-end;
		font-size: 16px;
		margin-top: 16px;
		margin-right: auto;
		p {
			padding: 0px 16px;
		}

		input {
			border: none;
			background-color: transparent;
			width: 70px;
			text-align: center;
			outline: none;
		}
		span {
			border-radius: 4px;
			background: #1a69f0;
			width: 21px;
			height: 21px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 8px;
			font-size: 10px;
			cursor: pointer;
			svg {
				color: #ffffff;

				path {
					color: #ffffff;
				}
			}
		}
	}

	.total {
		margin-left: auto;
		margin-top: 16px;
		p {
			font-size: 14px;
			font-weight: 700;
		}
	}
`;

const ImageScreenshot = styled.div`
	width: 70%;

	img {
		width: 100%;
	}
`;

const UserOrdersInfo = ({ setShowOrderInfo, selectedTransaction, getTransactions }) => {
	const [notes, setNotes] = useState("");

	useEffect(() => {
		console.log(selectedTransaction.items);
	}, []);

	const convertToDateFormat = (date) => {
		let newDate = new Date(date);
		let formattedDate = newDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		return formattedDate;
	};

	const requestForCancellationFunc = async () => {
		const res = await requestForCancelTransaction(selectedTransaction.transaction_id, notes);

		if (res.status === "Success") {
			toast.success("Request for cancellation sent");
			setShowOrderInfo(false);
			getTransactions();
			return;
		}

		toast.error(res.errors[0].message);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Order {selectedTransaction.transaction_id} </HeaderTitle>
				<FieldContainer>
					<LabelContainer first>
						<Label>Items</Label>
					</LabelContainer>
					<OrdersWrapper>
						{selectedTransaction.items.map((item) => (
							<Product key={item.id} active={item.quantity > 1}>
								<div className="productInformation">
									<div className="wrapper">
										<Image
											src={item.product.image_link == "testing" ? "/sabon.png" : item.product.image_link.replace(/\\/g, "/")}
											width={80}
											height={80}
											alt="Product image"
										/>

										<div className="productName">
											<p>
												{item.product.product_code} | {item.product.product_name}
											</p>
											<p>PHP {item.price / 100}</p>
											<p>Quantity: {item.quantity}</p>
										</div>

										<div className="total">
											<p>PHP {(item.price * item.quantity) / 100}</p>
										</div>
									</div>
								</div>
							</Product>
						))}

						<p className="total">Total: P{selectedTransaction.total_amount / 100}</p>

						{selectedTransaction.status === "AWAITING PAYMENT" && <button onClick={() => acceptTransactionFunc()}>Verify Payment</button>}
					</OrdersWrapper>

					<LabelContainer>
						<Label>Payment Information</Label>
					</LabelContainer>
					<OrdersWrapper>
						<h5>Payment Details</h5>
						<p>Transaction number: {selectedTransaction.transaction_number}</p>
						{selectedTransaction.transaction_screenshot && (
							<>
								<p>Screenshot of payment</p>
								<ImageScreenshot>
									<img src={selectedTransaction.transaction_screenshot} alt="Payment image" />
								</ImageScreenshot>
							</>
						)}
					</OrdersWrapper>

					<LabelContainer>
						<Label>Order Status</Label>
					</LabelContainer>
					<OrdersWrapper>
						<h5>Status: {selectedTransaction.status}</h5>
						<p>Pickup date: {convertToDateFormat(selectedTransaction.pickup_date)}</p>
						{selectedTransaction.status !== "CANCELLED" && selectedTransaction.status !== "DONE" && selectedTransaction.status !== "AWAITING PAYMENT" && (
							<>
								<button onClick={() => requestForCancellationFunc()}>Request Cancellation</button>
								<textarea type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
							</>
						)}
						{/* <button onClick={() => requestForCancellationFunc()}>Request Cancellation</button> */}
					</OrdersWrapper>
				</FieldContainer>

				<ButtonsContainer>
					<CloseButton onClick={() => setShowOrderInfo(false)}>Close </CloseButton>

					{/* <Button onClick={() => addPaymentMethodFunc()}>Save</Button> */}
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default UserOrdersInfo;
