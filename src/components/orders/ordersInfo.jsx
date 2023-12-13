/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
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
import { acceptCancelTransaction, acceptOrderReturnRefund, acceptTransaction, setTransactionStatus } from "@/api/transaction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Image from "next/image";
import IssueReturn from "./issueReturnModal";

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

const ButtonAccept = styled.button`
	background-color: #0b20dd;
	color: #fff;
	padding: 10px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 16px;
	margin-top: 10px;
	margin-right: 6px;
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

const ContactNumber = styled.input`
	width: 100%;
	height: 40px;
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 10px;
	margin-top: 10px;
`;

const BatchInfo = styled.div`
	border: 1px solid #ddd;
	border-radius: 5px;
	padding: 10px;
	margin-top: 10px;
	font-size: 6px;

	p {
		font-size: 12px !important;
	}
`;

const FieldTitleLabel = styled.h3`
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

const Input = styled.input`
	border-radius: 11px;
	border: 1px solid #eee;
	padding: 8px 16px;
	width: 100%;
	height: 41px;
	flex-shrink: 0;
	&:focus {
		outline: 1px solid #0070f3;
	}
`;

const OrdersInfo = ({ setIsOrdersInfoOpen, selectedTransaction, fetchTransactions }) => {
	const [isIssueReturnOpen, setIsIssueReturnOpen] = useState(false);

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

	const convertToDateFormat = (date) => {
		let newDate = new Date(date);
		let formattedDate = newDate.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
		return formattedDate;
	};

	const batchInfo = (batch_info) => {
		let jsonBatchInfo = JSON.parse(batch_info);
		return jsonBatchInfo;
	};

	const acceptTransactionFunc = async () => {
		const res = await acceptTransaction(selectedTransaction.transaction_id);
		console.log(res.message);

		if (res.status === "Success") {
			toast.success("Transaction accepted");
			setIsOrdersInfoOpen(false);
			fetchTransactions();
			return;
		}

		toast.error(res.errors[0].message);
	};

	const acceptCancellationFunc = async () => {
		const res = await acceptCancelTransaction(selectedTransaction.transaction_id);
		console.log(res.message);

		if (res.status === "Success") {
			toast.success("Transaction cancelled");
			setIsOrdersInfoOpen(false);
			fetchTransactions();
			return;
		}

		toast.error(res.errors[0].message);
	};

	const acceptReturnRefundFunc = async () => {
		const res = await acceptOrderReturnRefund(selectedTransaction.transaction_id);
		console.log(res.message);

		if (res.status === "Success") {
			toast.success(res.message);
			setIsOrdersInfoOpen(false);
			fetchTransactions();
			return;
		}

		toast.error(res.errors[0].message);
	};

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Order {selectedTransaction.transaction_unique_id} </HeaderTitle>
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

									{item.batch_info &&
										batchInfo(item.batch_info).map((info, index) => {
											return (
												<BatchInfo key={index}>
													<p className="productName">Batch Number: {info.batch_no}</p>
													<p className="productName">Quantity: {info.quantity}</p>
												</BatchInfo>
											);
										})}
								</div>
							</Product>
						))}

						<p className="total">Total: P{selectedTransaction.total_amount / 100}</p>
					</OrdersWrapper>

					<LabelContainer>
						<Label>Payment Information</Label>
					</LabelContainer>
					<OrdersWrapper>
						<h5>Payment Details</h5>
						<p>Payment method: {selectedTransaction.payment_method ? selectedTransaction.payment_method.name : "Deleted"}</p>
						<p>Transaction number: {selectedTransaction.transaction_number ? selectedTransaction.transaction_number : "N/A"}</p>
						{selectedTransaction.transaction_screenshot && (
							<>
								<p>Screenshot of payment</p>
								<ImageScreenshot>
									<img src={selectedTransaction.transaction_screenshot} alt="Payment image" />
								</ImageScreenshot>
							</>
						)}

						{selectedTransaction.status === "AWAITING PAYMENT" && <ButtonAccept onClick={() => acceptTransactionFunc()}>Verify Payment</ButtonAccept>}
					</OrdersWrapper>

					<LabelContainer>
						<Label>Order Status</Label>
					</LabelContainer>
					<OrdersWrapper>
						<h5>Status: {selectedTransaction.status}</h5>
						<p>Pickup date: {convertToDateFormat(selectedTransaction.pickup_date)}</p>

						{selectedTransaction.status === "UNDER REVIEW" && (
							<>
								<FieldTitleLabel>Notes: </FieldTitleLabel>

								<TextArea type="text" value={selectedTransaction.status_notes} readOnly />
								<FieldTitleLabel>Contact Number: </FieldTitleLabel>

								<ContactNumber type="text" maxlength="12" value={selectedTransaction.contact_number} readOnly />

								<FieldTitleLabel>Reason: </FieldTitleLabel>

								{selectedTransaction.reason && <Input type="text" value={selectedTransaction.reason} readOnly />}
								{selectedTransaction.current_stage != 4 ? (
									<ButtonAccept onClick={() => acceptCancellationFunc()}>Cancel Order </ButtonAccept>
								) : (
									<>
										<ButtonAccept onClick={() => acceptReturnRefundFunc()}>Issue Refund</ButtonAccept>
										<ButtonAccept onClick={() => acceptCancellationFunc()}>Modify Items</ButtonAccept>
										<ButtonAccept onClick={() => setIsIssueReturnOpen(true)}>Issue Return</ButtonAccept>
									</>
								)}
							</>
						)}

						{selectedTransaction.status === "PAID" && <ButtonAccept onClick={() => updateStatus("RELEASED")}>Mark as released</ButtonAccept>}
					</OrdersWrapper>
				</FieldContainer>

				<ButtonsContainer>
					<CloseButton onClick={() => setIsOrdersInfoOpen(false)}>Close </CloseButton>
				</ButtonsContainer>
			</PopupContent>

			{isIssueReturnOpen && (
				<IssueReturn setIsIssueReturnOpen={setIsIssueReturnOpen} selectedTransaction={selectedTransaction} fetchTransactions={fetchTransactions} />
			)}
		</PopupOverlay>
	);
};

export default OrdersInfo;
