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
import PromoCode from "./promo_code";
import { toast } from "react-toastify";

const CartTable = styled.table`
	width: 100%;
	margin-top: 42.5px;
	padding: 0px 24px;
	border-collapse: collapse;
	table-layout: fixed;
	display: none;
	th {
		color: #000;
		font-size: 14px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding-bottom: 25px;
		&:first-child {
			text-align: left;
			padding-left: 16px;
		}

		&:last-child {
			text-align: right;
			padding-right: 16px;
		}
	}

	td {
		text-align: center;
		font-size: 16px;
		font-style: normal;
		font-weight: 400;
		line-height: normal;
		padding-bottom: 16px;
		&:first-child {
			text-align: left;
			padding-left: 16px;
		}

		&:last-child {
			text-align: right;
			padding-right: 16px;
		}
	}

	span {
		cursor: pointer;
		padding: 4px;
		background-color: #e9e9e95c;
		opacity: 0.4;
		&:hover {
			opacity: 1;
		}
	}

	.bold {
		border-top: 1px solid #c7c7c7;
		background-color: #f1f1f181;
		td {
			font-weight: bold;
			padding: 16px;
		}
	}
`;

const CartList = styled.div`
	margin-top: 24px;
`;

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
		/* width: 100%;
		margin-top: 20px;
		font-size: 14px;
		background-color: #f88181;
		border: 2px solid #eb5151;
		color: black;
		border-radius: 4px;
		padding: 4px 8px;
		display: block; */
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

const Cart = ({ setActiveAction }) => {
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
					if (cart.length <= 0) return toast.warning("Please add items to cart first");
					setActiveAction("payment");

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

export default Cart;
