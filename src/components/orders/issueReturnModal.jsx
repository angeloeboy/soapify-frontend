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
import { acceptCancelTransaction, acceptOrderReturnRefund, acceptTransaction, issueReturn, setTransactionStatus } from "@/api/transaction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

const IssueReturn = ({ setIsIssueReturnOpen, selectedTransaction, fetchTransactions }) => {
	const [returnedItems, setReturnedItems] = useState([]);

	useEffect(() => {
		console.log(selectedTransaction);
	}, [selectedTransaction]);

	const batchInfo = (batch_info) => {
		let jsonBatchInfo = JSON.parse(batch_info);
		return jsonBatchInfo;
	};

	useEffect(() => {
		// Initialize returnedItems with batch information
		const initialReturnedItems = selectedTransaction.items.map((item) => ({
			transaction_item_id: item.transaction_item_id,
			product_id: item.product_id,
			isDamaged: false,
			batch_info: JSON.parse(item.batch_info).map((batch) => ({
				batch_no: batch.batch_no,
				quantity: batch.quantity, // Initial return quantity for each batch is set to 0
				maxQuantity: batch.quantity, // Maximum quantity that can be returned for each batch
				damaged: 0, // Initial damaged quantity for each batch is set to 0
			})),
			item: item,
		}));
		setReturnedItems(initialReturnedItems);
	}, [selectedTransaction]);

	const handleBatchQuantityChange = (itemIndex, batchIndex, quantity) => {
		const newReturnedItems = [...returnedItems];
		newReturnedItems[itemIndex].batch_info[batchIndex].quantity = Math.min(quantity, newReturnedItems[itemIndex].batch_info[batchIndex].maxQuantity);
		//add the number of damaged items to the bathc info

		setReturnedItems(newReturnedItems);
	};

	const handleDamageQuantityChange = (itemIndex, batchIndex, quantity) => {
		const newReturnedItems = [...returnedItems];
		newReturnedItems[itemIndex].batch_info[batchIndex].damaged = Math.min(quantity, newReturnedItems[itemIndex].batch_info[batchIndex].maxQuantity);
		//add the number of damaged items to the bathc info

		setReturnedItems(newReturnedItems);
	};

	const handleDamageToggle = (itemIndex) => {
		const newReturnedItems = [...returnedItems];
		newReturnedItems[itemIndex].isDamaged = !newReturnedItems[itemIndex].isDamaged;
		setReturnedItems(newReturnedItems);
	};

	const handleSubmit = async () => {
		const payload = {
			transaction_id: selectedTransaction.transaction_id,
			returnedItems: returnedItems.map((item) => ({
				transaction_item_id: item.transaction_item_id,
				product_id: item.product_id,
				quantityToReturn: item.batch_info.reduce((total, batch) => total + batch.quantity, 0),
				isDamaged: item.isDamaged,
				batch_info: JSON.stringify(item.batch_info.filter((batch) => batch.quantity > 0)),
			})),
		};
		console.log(payload);

		const res = await issueReturn(selectedTransaction.transaction_id, payload);

		if (res.status === "Success") {
			toast.success("Return request sent");
			setIsIssueReturnOpen(false);
			fetchTransactions();
			return;
		}

		// Here you can make your API call to backend with 'payload'
	};

	return (
		<PopupContent>
			<HeaderTitle>Return Items from order # {selectedTransaction.transaction_unique_id} </HeaderTitle>
			<FieldContainer>
				<LabelContainer first>
					<Label>Items</Label>
				</LabelContainer>
				<OrdersWrapper>
					{returnedItems.map((item, itemIndex) => (
						<div key={item.transaction_item_id}>
							<Product key={item.item.id} active={item.item.quantity > 1}>
								<div className="productInformation">
									<div className="wrapper">
										<Image
											src={item.item.product.image_link == "testing" ? "/sabon.png" : item.item.product.image_link.replace(/\\/g, "/")}
											width={80}
											height={80}
											alt="Product image"
										/>

										<div className="productName">
											<p>
												{item.item.product.product_code} | {item.item.product.product_name}
											</p>
											<p>Quantity: {item.item.quantity}</p>
										</div>
									</div>
								</div>
							</Product>
							{item.batch_info.map((batch, batchIndex) => (
								<BatchInfo key={batch.batch_no}>
									<label>
										<p>Batch {batch.batch_no}, </p>

										<p>Return Quantity (quantity of products returned)</p>
										<input
											type="number"
											value={batch.quantity}
											onChange={(e) => handleBatchQuantityChange(itemIndex, batchIndex, parseInt(e.target.value))}
											min="0"
											max={batch.maxQuantity}
										/>
										<p>Quantity of damaged items (wont be returned to inventory)</p>
										<input
											type="number"
											value={batch.damaged}
											onChange={(e) => handleDamageQuantityChange(itemIndex, batchIndex, parseInt(e.target.value))}
											min="0"
											max={batch.maxQuantity - batch.quantity}
										/>
									</label>
								</BatchInfo>
							))}
						</div>
					))}
					<ButtonAccept onClick={handleSubmit}>Submit Return</ButtonAccept>
				</OrdersWrapper>
			</FieldContainer>

			<ButtonsContainer>
				<CloseButton onClick={() => setIsIssueReturnOpen(false)}>Close </CloseButton>
			</ButtonsContainer>
		</PopupContent>
	);
};

export default IssueReturn;
