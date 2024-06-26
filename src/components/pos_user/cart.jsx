import styled from "styled-components";
import { ComponentTitle } from "./../../styled-components/pos";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../misc/button";
import Image from "next/image";
import { useContext, useMemo, useEffect } from "react";
// import { TransactionContext } from "@/pages/dashboard/pos";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { PDFDocument, rgb } from "pdf-lib";
import { getTransaction } from "@/api/transaction";
import { TransactionContext } from "../context/TransactionContext";
import PromoCode from "../pos/promo_code";

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

			.dashed {
				text-decoration: line-through;
				color: red;
				opacity: 0.7;
			}
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

	.minus {
		opacity: ${(props) => (props.active ? "1" : "0.5")};
	}

	.delete {
		align-self: center;
		cursor: pointer;
		margin-right: 16px;
		path {
			color: #bebebe !important;
		}

		&:hover {
			path {
				color: #f88181 !important;
			}
		}
	}

	.remove {
		font-size: 14px;
		color: #ff00007d;
		text-decoration: underline;
		cursor: pointer;
		margin-top: 16px;
	}
`;

const ItemsContainer = styled.div`
	margin-top: 48px;
	min-height: 200px;

	.item-enter {
		opacity: 0;
		transform: translateX(-20px);
	}

	.item-enter-active {
		opacity: 1;
		transition: all 0.4s ease-in-out;
		transform: translateX(0px);
	}

	.item-exit {
		opacity: 1;
	}

	.item-exit-active {
		opacity: 0;
		transition: all 0.4s ease-in-out;
		transform: translateX(-50px);
	}
`;

const Total = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 24px 0px;
	border-top: 1px solid #dddd;
	padding-top: 24px;
	p {
		text-transform: uppercase;
		font-weight: bold;
	}
`;

const PromoCodeDiscount = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 24px 0px;
	border-top: 1px solid #dddd;
	padding-top: 24px;
	p {
		text-transform: uppercase;
		font-weight: bold;
		/* fonts-size: 14px; */
	}
`;

const UserCart = ({ setActiveAction }) => {
	const { cart, setCart, updateCart, transaction, promoCodeResponse, setTransaction } = useContext(TransactionContext);

	const total = useMemo(() => {
		return cart.reduce((acc, item) => acc + item.quantity * (item.product_price / 100), 0).toFixed(2);
	}, [cart]);

	useEffect(() => {
		const handleUnload = (event) => {
			if (cart && cart.length > 0) {
				// Preventing the default action (refresh) and showing a warning message
				event.preventDefault();
				event.returnValue = "You have items in your cart. Are you sure you want to leave?";
			}
		};

		// Attaching the event listener
		window.addEventListener("beforeunload", handleUnload);

		// Cleanup: remove the event listener on component unmount
		return () => {
			window.removeEventListener("beforeunload", handleUnload);
		};
	}, [cart]); // Watching the cartItems for changes

	let createReceipt = async () => {
		const transation = await getTransaction(15);

		const pdfDoc = await PDFDocument.create();
		const page = pdfDoc.addPage([600, 400]);

		const { transaction } = transation;

		// Define some basic colors and font size
		const colorBlack = rgb(0, 0, 0);
		const fontSize = 16;

		// Define starting positions
		let xPosition = 50;
		let yPosition = 350;

		// Add Transaction Details
		page.drawText(`Transaction Number: ${transaction.transaction_number}`, { start: { x: xPosition, y: yPosition }, size: fontSize, color: colorBlack });
		yPosition -= 20;
		page.drawText(`Total Amount: ${transaction.total_amount}`, { x: xPosition, y: yPosition, size: fontSize, color: colorBlack });
		yPosition -= 20;
		page.drawText(`Payment Method: ${transaction.payment_method.name}`, { x: xPosition, y: yPosition, size: fontSize, color: colorBlack });
		yPosition -= 20;

		// Add a separator
		yPosition -= 20;
		page.drawLine({
			start: { x: xPosition, y: yPosition },
			end: { x: xPosition + 500, y: yPosition },
			color: colorBlack,
		});
		yPosition -= 20;

		// List out items
		for (let item of transaction.items) {
			page.drawText(`Product: ${item.product.product_name}`, { x: xPosition, y: yPosition, size: fontSize, color: colorBlack });
			yPosition -= 20;
			page.drawText(`Quantity: ${item.quantity}`, { x: xPosition, y: yPosition, size: fontSize, color: colorBlack });
			yPosition -= 20;
			page.drawText(`Price: ${item.price}`, { x: xPosition, y: yPosition, size: fontSize, color: colorBlack });
			yPosition -= 20;

			// Add a separator between items
			yPosition -= 10;
			page.drawLine({
				start: { x: xPosition, y: yPosition },
				end: { x: xPosition + 500, y: yPosition },
				color: colorBlack,
			});
			yPosition -= 20;
		}

		const pdfBytes = await pdfDoc.save();

		// Create a blob from the pdf bytes
		const blob = new Blob([pdfBytes], { type: "application/pdf" });

		// Create an object URL for the blob
		const url = URL.createObjectURL(blob);

		// Create a hidden anchor element
		const a = document.createElement("a");
		a.style.display = "none";
		a.href = url;

		// Set the download attribute of the anchor to give a name to the downloaded file
		a.download = `receipt_${transaction.transaction_number}.pdf`;

		// Append the anchor to the body (it's hidden, so won't affect your layout)
		document.body.appendChild(a);

		// Simulate a click on this anchor to start the download
		a.click();

		// Cleanup: remove the anchor once the download has started
		document.body.removeChild(a);

		// Cleanup: release the object URL to free up memory
		URL.revokeObjectURL(url);

		return pdfBytes;
	};

	return (
		<>
			<ComponentTitle>Cart</ComponentTitle>
			{cart.length === 0 && <p>No items in cart</p>}

			<TransitionGroup component={ItemsContainer}>
				{cart.map((item) => (
					<CSSTransition key={item.product_id} timeout={500} classNames="item">
						<Product key={item.product_id} active={item.quantity > 1}>
							<div className="productInformation">
								<div className="wrapper">
									<Image src={item.image_link == "testing" ? "/sabon.png" : item.image_link.replace(/\\/g, "/")} width={40} height={40} alt="Product image" />

									<p className="productName">
										{item.product_name} |
										{item.attribute.map((attribute) => {
											return <> {attribute.value} | </>;
										})}
									</p>
								</div>

								<p className="productPrice">
									<span className={item.isDiscounted ? "origPrice dashed" : "origPrice"}>
										P{item.isDiscounted ? item.orig_price / 100 : item.product_price / 100}{" "}
									</span>
									{item.isDiscounted && <span>P{item.product_price / 100}</span>}
								</p>
							</div>

							<div className="quantity">
								<span onClick={() => updateCart(item, "subtract")} className="minus">
									<FontAwesomeIcon icon={faMinus} />
								</span>
								{/* <p>{item.quantity}</p> */}
								<input
									type="text"
									value={item.quantity}
									onChange={(e) => {
										const valueAsString = e.target.value;
										const valueAsNumber = Number(valueAsString); // convert to number

										//if the quantity_in_stock is smaller than the valueAsNumber, set the valueAsNumber to the quantity_in_stock
										if (valueAsNumber > item.quantity_in_stock) {
											let updatedCart = cart.map((product) =>
												product.product_id === item.product_id ? { ...product, quantity: item.quantity_in_stock } : product
											);
											setCart(updatedCart);
											return;
										}

										if (valueAsString === "") {
											let updatedCart = cart.map((product) => (product.product_id === item.product_id ? { ...product, quantity: 0 } : product));
											setCart(updatedCart);
											return;
										}

										if (!isNaN(valueAsNumber) && valueAsNumber >= 0) {
											let updatedCart = cart.map((product) => (product.product_id === item.product_id ? { ...product, quantity: valueAsNumber } : product));
											setCart(updatedCart);
										}

										//if 0 is entered, remove the item from the cart
										if (valueAsNumber === 0) {
											let updatedCart = cart.filter((product) => product.product_id !== item.product_id);
											setCart(updatedCart);
										}
									}}
									onKeyDown={(e) => {
										const valueAsString = e.target.value;
										const valueAsNumber = Number(valueAsString);

										if (e.key === "ArrowUp") {
											//disable the arrow up if the quantity is greater than the quantity_in_stock
											if (valueAsNumber >= item.quantity_in_stock) {
												return;
											}
											let updatedCart = cart.map((product) => (product.product_id === item.product_id ? { ...product, quantity: valueAsNumber + 1 } : product));
											setCart(updatedCart);
										} else if (e.key === "ArrowDown") {
											if (valueAsNumber > 0) {
												let updatedCart = cart.map((product) =>
													product.product_id === item.product_id ? { ...product, quantity: valueAsNumber - 1 } : product
												);
												setCart(updatedCart);
											}
										}
									}}
									//if unfocused and the value is 0, remove the item from the cart
									onBlur={(e) => {
										const valueAsString = e.target.value;
										const valueAsNumber = Number(valueAsString);

										if (valueAsNumber === 0) {
											let updatedCart = cart.filter((product) => product.product_id !== item.product_id);
											setCart(updatedCart);
										}
									}}
								/>

								<span onClick={() => updateCart(item, "add")}>
									<FontAwesomeIcon icon={faPlus} />
								</span>
							</div>
							<p className="remove" onClick={() => updateCart(item, "delete")}>
								Remove
							</p>
						</Product>
					</CSSTransition>
				))}
			</TransitionGroup>

			<Total>
				<p>Total</p>
				<p>{total}</p>
			</Total>
			{promoCodeResponse.discountType == "FIXED" && transaction.promo_codeApplied && (
				<PromoCodeDiscount>
					<p>Discount</p>
					<p> - {promoCodeResponse.totalDiscountAmount} PHP </p>
				</PromoCodeDiscount>
			)}

			{promoCodeResponse.discountType == "FIXED" && transaction.promo_codeApplied && (
				<PromoCodeDiscount>
					<p>Total</p>
					{transaction.promo_codeApplied && <p>{Number(transaction.total_amount / 100).toFixed(2)}</p>}
				</PromoCodeDiscount>
			)}
			<PromoCode />
			<Button
				width={"100%"}
				onClick={() => {
					if (cart.length <= 0) return;
					setActiveAction("pickup");

					if (!promoCodeResponse.isValid) {
						setTransaction((prev) => ({ ...prev, promo_code: "" }));
					}
				}}
			>
				Confirm
			</Button>
		</>
	);
};

export default UserCart;
