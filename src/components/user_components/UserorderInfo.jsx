/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect, useState } from "react";
import {
	Button,
	FieldContainer,
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
import { reportOrder, requestForCancelTransaction, requestOrderReturnRefund, setTransactionStatus } from "@/api/transaction";
import { toast } from "react-toastify";
import styled from "styled-components";
import Image from "next/image";
import { getUser } from "@/api/users";
import { WebSocketContext } from "../context/WebsocketContext";

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
	max-width: 100%;
	min-width: 100%;
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

export const FieldTitleLabel = styled.h3`
	color: rgba(0, 32, 86, 0.5);
	font-family: DM Sans;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: normal;
	padding: 15px;
	padding-left: 0px;
	margin-top: 14px;
	margin-top: ${(props) => (props.notFirst ? "14px" : "0")};
`;

export const Select = styled.select`
	color: #1a69f0;
	/* width: 700.824px; */
	height: 41px;
	padding: 10px;
	margin-bottom: 10px;
	display: block;
	border: 1px solid #ccc;
	border-radius: 11px;
	font-size: 16px;
	font-family: DM Sans;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-right: 23.92px;
	width: calc(100% - (23.92px * 2));
	width: 100%;
`;

export const Option = styled.option`
	font-family: DM Sans;
	font-size: 14px;
	font-style: normal;
	font-weight: 700;
	line-height: normal;
	margin-left: 23.92px;
`;

const PromoCodedisplay = ({ promo_code }) => {
	return (
		<div>
			<p className="total">Promo code: {promo_code?.promo_code}</p>

			{promo_code?.promo_code_type !== "PERCENTAGE" && (
				<p className="total">
					Value: {promo_code?.promo_code_value} {promo_code?.promo_code_type == "PERCENTAGE" ? "%" : "PHP"}
				</p>
			)}
		</div>
	);
};

const UserOrdersInfo = ({ setShowOrderInfo, selectedTransaction, getTransactions }) => {
	const [notes, setNotes] = useState("");
	const [contact, setContact] = useState(undefined);
	const [reason_name, setReasonName] = useState("Other");
	const [transaction, setTransaction] = useState(selectedTransaction); // Initialize with an empty array

	const { userTransactions, getUserTransaction } = useContext(WebSocketContext);

	useEffect(() => {
		getUserInfo();
	}, []);

	useEffect(() => {
		//get the transaction fomr transaction list
		const transaction = userTransactions.find((transaction) => transaction.transaction_id == selectedTransaction.transaction_id);

		setTransaction(transaction);
	}, [userTransactions]);

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
		const res = await requestForCancelTransaction(transaction.transaction_id, notes, contact);

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
		const res = await requestOrderReturnRefund(transaction.transaction_id, notes, contact);

		if (res.status === "Success") {
			toast.success("Request for return/refund sent");
			setShowOrderInfo(false);
			getTransactions();
			return;
		}

		toast.error(res.errors[0].message);
	};

	const reportOrderIssue = async () => {
		if (notes == "") {
			toast.error("Please enter a reason for cancellation");
			return;
		}
		const res = await reportOrder(transaction.transaction_id, notes, contact, reason_name);

		if (res.status === "Success") {
			toast.success("Report sent. A representative will contact you shortly via the contact number you provided.");
			setShowOrderInfo(false);
			getTransactions();
			return;
		}

		toast.error(res.errors[0].message);
	};

	const isDiscounted = (product_id) => {
		//check if the product is discounted based on the promo_code_object.promos

		let isDiscounted = false;

		if (transaction.promo_code_object) {
			transaction.promo_code_object.products.forEach((promo) => {
				if (promo.product_id === product_id) {
					isDiscounted = true;
				}
			});
		}

		console.log(product_id);

		return isDiscounted;
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Order {transaction.transaction_unique_id} </HeaderTitle>
				<FieldContainer>
					<LabelContainer>
						<Label>Order Status</Label>
					</LabelContainer>
					<OrdersWrapper>
						<h5>Status: {transaction.status}</h5>
						<h5>Pickup date: {convertToDateFormat(transaction.pickup_date)}</h5>
					</OrdersWrapper>
					<LabelContainer>
						<Label>Payment Information</Label>
					</LabelContainer>
					<OrdersWrapper>
						<h5>Payment Details</h5>
						<h5>Payment method: {transaction.payment_method ? transaction.payment_method.name : "Deleted"}</h5>

						<h5>Reference number: {transaction.transaction_number}</h5>
						{transaction.transaction_screenshot && (
							<>
								<p>Screenshot of payment</p>
								<ImageScreenshot>
									<img src={transaction.transaction_screenshot} alt="Payment image" />
								</ImageScreenshot>
							</>
						)}
					</OrdersWrapper>
					<LabelContainer first>
						<Label>Items</Label>
					</LabelContainer>
					<OrdersWrapper>
						{transaction.items.map((item) => (
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
											<p>
												PHP {item.price / 100}
												{isDiscounted(item.product_id) &&
													` ${
														transaction.promo_code_object.promo_code_type == "PERCENTAGE"
															? "(Discounted by " + transaction.promo_code_object.promo_code_value + "%)"
															: ""
													}`}
											</p>
											<p>Quantity: {item.quantity}</p>
										</div>

										<div className="total">
											<p>PHP {(item.price * item.quantity) / 100}</p>
										</div>
									</div>
								</div>
							</Product>
						))}
						{selectedTransaction.promo_code_object && <PromoCodedisplay promo_code={selectedTransaction.promo_code_object} />}

						<p className="total">Total: P{transaction.total_amount / 100}</p>
					</OrdersWrapper>
					{transaction.status !== "CANCELLED" &&
						transaction.status !== "REFUNDED" &&
						transaction.status !== "AWAITING PAYMENT" &&
						transaction.status !== "RELEASED" &&
						transaction.status !== "RETURNED" &&
						transaction.current_stage != 4 && (
							<>
								<LabelContainer>
									<Label>Action {transaction.current_stage}</Label>
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
									<div>
										<FieldTitleLabel notFirst>Reason </FieldTitleLabel>
										<Select value={reason_name} onChange={(e) => setReasonName(e.target.value)}>
											<Option value={"Damaged"} key={1}>
												Damaged
											</Option>
											<Option value={"Wrong Item"} key={2}>
												Wrong item
											</Option>
											<Option value={"Expired"} key={3}>
												Expired
											</Option>
											<Option value={"Other"} key={4}>
												Other
											</Option>
										</Select>
									</div>

									<ButtonReport onClick={(e) => requestForCancellationFunc(e)}>Request Cancellation</ButtonReport>
								</OrdersWrapper>
							</>
						)}

					{transaction.status === "RELEASED" && (
						<>
							<LabelContainer>
								<Label>Action</Label>
							</LabelContainer>
							<OrdersWrapper>
								<TextArea type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />

								<FieldTitleLabel>
									Contact number: <span>(Admin will contact you to this number. Make sure to stay open)</span>{" "}
								</FieldTitleLabel>
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
								<div>
									<FieldTitleLabel notFirst>Reason </FieldTitleLabel>
									<Select value={reason_name} onChange={(e) => setReasonName(e.target.value)}>
										<Option value={"Damaged"} key={1}>
											Damaged
										</Option>
										<Option value={"Wrong Item"} key={2}>
											Wrong item
										</Option>
										<Option value={"Expired"} key={3}>
											Expired
										</Option>
										<Option value={"Other"} key={4}>
											Other
										</Option>
									</Select>
								</div>

								<ButtonReport onClick={(e) => reportOrderIssue(e)}>Report Issue</ButtonReport>

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
