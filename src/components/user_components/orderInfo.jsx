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
} from "@/styled-components/ItemActionModal";
import { CloseButton } from "../styled-components/PopUp";
import { setTransactionStatus } from "@/api/transaction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Image from "next/image";

const Product = styled.div`
	display: flex;
	margin-bottom: 38px;
	/* flex-direction: column; */
	flex-wrap: wrap;
	img {
		background-color: white;
	}

	.productInformation {
		/* margin-left: 16px; */
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
`;

const ImageScreenshot = styled.div`
	width: 70%;

	img {
		width: 100%;
	}
`;

const UserOrdersInfo = ({ setShowOrderInfo, selectedTransaction, getTransactions }) => {
	useEffect(() => {
		console.log(selectedTransaction.items);
	}, []);

	return (
		<PopupOverlay>
			<PopupContent>
				<HeaderTitle>Order {selectedTransaction.transaction_unique_id} </HeaderTitle>
				<FieldContainer>
					<div>
						{selectedTransaction.createdAt}
						{selectedTransaction.items.map((item) => (
							<Product key={item.id} active={item.quantity > 1}>
								<div className="productInformation">
									<div className="wrapper">
										<Image
											src={item.product.image_link == "testing" ? "/sabon.png" : item.product.image_link.replace(/\\/g, "/")}
											width={60}
											height={60}
											alt="Product image"
										/>
										<p className="productName">
											{item.product.product_code} | {item.product.product_name}
										</p>
									</div>

									<p className="productPrice">P{item.product.product_price / 100}</p>
								</div>
							</Product>
						))}
						<p>Pickup date: {selectedTransaction.pickup_date}</p>

						<p>Total: P{selectedTransaction.total_amount / 100}</p>

						<p>Status: {selectedTransaction.status}</p>

						<h3>Payment Details</h3>
						<p>{selectedTransaction.transaction_number}</p>
						{selectedTransaction.transaction_screenshot && (
							<>
								<p>Screenshot of payment</p>
								<ImageScreenshot>
									<img src={selectedTransaction.transaction_screenshot} alt="Payment image" />
								</ImageScreenshot>
							</>
						)}
					</div>

					<Button>Cancel Order</Button>
					<Button>Refund/Return</Button>
				</FieldContainer>

				<ButtonsContainer>
					<CloseButton onClick={() => setShowOrderInfo(false)}>Close </CloseButton>
					<Button onClick={() => addPaymentMethodFunc()}>Save</Button>
				</ButtonsContainer>
			</PopupContent>
		</PopupOverlay>
	);
};

export default UserOrdersInfo;
