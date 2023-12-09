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
import { requestForCancelTransaction, requestOrderReturnRefund, setTransactionStatus } from "@/api/transaction";
import { toast } from "react-toastify";
import styled from "styled-components";
import Image from "next/image";
import { getUser } from "@/api/users";

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

const TextArea = styled.textarea`
	width: 100%;
	height: 100px;
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 10px;
	margin-top: 10px;
`;

const ButtonReport = styled.button`
	background-color: #dd0b39;
	color: #fff;
	padding: 10px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	margin-top: 10px;
`;

const ContactNumber = styled.input`
	width: 100%;
	height: 40px;
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 10px;
	margin-top: 10px;
`;

const UserOrdersInfo = ({ setShowOrderInfo, selectedTransaction, getTransactions }) => {
	const [notes, setNotes] = useState("");
	const [contact, setContact] = useState(undefined);

	useEffect(() => {
		getUserInfo();
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

	const getUserInfo = async () => {
		const res = await getUser();
		if (res.status === "Success") {
			setContact(res.user.phone_number);
		}
	};

	const requestForCancellationFunc = async (e) => {
		e.preventDefault();
		if (notes == "") {
			toast.error("Please enter a reason for cancellation");
			return;
		}

		if (contact == undefined || contact == "" || contact.length < 11) {
			toast.error("Please enter a valid contact number");
			return;
		}
		const res = await requestForCancelTransaction(selectedTransaction.transaction_id, notes, contact);

		if (res.status === "Success") {
			toast.success("Report sent. A representative will contact you shortly via the contact number you provided.");
			setShowOrderInfo(false);
			getTransactions();
			return;
		}

		toast.error(res.errors[0].message);
	};

	const requestForReturnRefundFunc = async () => {
		if (notes == "") {
			toast.error("Please enter a reason for cancellation");
			return;
		}
		const res = await requestOrderReturnRefund(selectedTransaction.transaction_id, notes, contact);

		if (res.status === "Success") {
			toast.success("Request for return/refund sent");
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
					<LabelContainer>
						<Label>Order Status</Label>
					</LabelContainer>
					<OrdersWrapper>
						<h5>Status: {selectedTransaction.status}</h5>
						<h5>Pickup date: {convertToDateFormat(selectedTransaction.pickup_date)}</h5>
					</OrdersWrapper>
					<LabelContainer>
						<Label>Payment Information</Label>
					</LabelContainer>
					<OrdersWrapper>
						<h5>Payment Details</h5>
						<h5>Payment method: {selectedTransaction.payment_method.name}</h5>
						<h5>Transaction number: {selectedTransaction.transaction_number}</h5>
						{selectedTransaction.transaction_screenshot && (
							<>
								<p>Screenshot of payment</p>
								<ImageScreenshot>
									<img src={selectedTransaction.transaction_screenshot} alt="Payment image" />
								</ImageScreenshot>
							</>
						)}
					</OrdersWrapper>
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
					</OrdersWrapper>
					{selectedTransaction.status !== "CANCELLED" &&
						selectedTransaction.status !== "REFUNDED" &&
						selectedTransaction.status !== "AWAITING PAYMENT" &&
						selectedTransaction.status !== "RELEASED" && (
							<>
								<LabelContainer>
									<Label>Action</Label>
								</LabelContainer>
								<OrdersWrapper>
									<TextArea type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />

									<p>
										Contact number: <span>(Admin will contact you to this number. Make sure to stay open)</span>{" "}
									</p>
									<ContactNumber
										type="text"
										maxlength="12"
										placeholder="Enter phone number"
										value={contact}
										onChange={(e) => {
											const value = e.target.value;
											// Remove anything that is not a digit
											const sanitizedValue = value.replace(/[^0-9]/g, "");
											setContact(sanitizedValue);
										}}
										required
									/>

									<ButtonReport onClick={(e) => requestForCancellationFunc(e)}>Request Cancellation</ButtonReport>
								</OrdersWrapper>
							</>
						)}

					{selectedTransaction.status === "RELEASED" && (
						<>
							<LabelContainer>
								<Label>Action</Label>
							</LabelContainer>
							<OrdersWrapper>
								<TextArea type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />

								<p>
									Contact number: <span>(Admin will contact you to this number. Make sure to stay open)</span>{" "}
								</p>
								<ContactNumber
									type="text"
									maxlength="12"
									placeholder="Enter phone number"
									value={contact}
									onChange={(e) => {
										const value = e.target.value;
										// Remove anything that is not a digit
										const sanitizedValue = value.replace(/[^0-9]/g, "");
										setContact(sanitizedValue);
									}}
									required
								/>

								<ButtonReport onClick={(e) => requestForReturnRefundFunc(e)}>Report Issue</ButtonReport>

								<p>
									Important Notice: We understand that plans can change, and you may need to cancel an order occasionally. However, to maintain the efficiency
									of our services and fairness to all customers, we apply penalties for frequent cancellations.
								</p>
							</OrdersWrapper>
						</>
					)}
				</FieldContainer>

				<ButtonsContainer>
					<CloseButton onClick={() => setShowOrderInfo(false)}>Close </CloseButton>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default UserOrdersInfo;
