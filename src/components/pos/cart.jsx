import styled from "styled-components";
import { ComponentTitle } from "./../../styled-components/pos";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../misc/button";
import Image from "next/image";
import { useContext, useMemo } from "react";
import { TransactionContext } from "@/pages/dashboard/pos";
import { CSSTransition, TransitionGroup } from "react-transition-group";

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

	img {
		background-color: white;
	}

	.productInformation {
		margin-left: 16px;

		.productName {
			color: #536686;
			font-size: 16px;
			font-weight: 700;
		}

		.productPrice {
			color: #005eff;
			font-size: 14px;
			font-weight: 700;
		}
	}

	.quantity {
		display: inline-flex;
		margin-left: auto;
		align-items: center;
		align-self: flex-end;
		font-size: 16px;
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

const Cart = ({ setActiveAction }) => {
	const { cart, setCart, updateCart } = useContext(TransactionContext);

	const total = useMemo(() => {
		return cart.reduce((acc, item) => acc + item.quantity * (item.product_price / 100), 0).toFixed(2);
	}, [cart]);

	return (
		<>
			<ComponentTitle>Order Details</ComponentTitle>
			{cart.length === 0 && <p>No items in cart</p>}

			<TransitionGroup component={ItemsContainer}>
				{cart.map((item) => (
					<CSSTransition key={item.product_id} timeout={500} classNames="item">
						<Product key={item.product_id} active={item.quantity > 1}>
							<FontAwesomeIcon icon={faTrash} onClick={() => updateCart(item, "delete")} className="delete" />
							<Image src="/sabon.png" width={60} height={60} alt="Product image" />
							<div className="productInformation">
								<p className="productName">{item.product_name}</p>
								<p className="productPrice">P{item.product_price / 100}</p>
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

										if (valueAsString === "") {
											let updatedCart = cart.map((product) => (product.product_id === item.product_id ? { ...product, quantity: 0 } : product));
											setCart(updatedCart);
											return;
										}

										if (!isNaN(valueAsNumber) && valueAsNumber >= 0) {
											let updatedCart = cart.map((product) => (product.product_id === item.product_id ? { ...product, quantity: valueAsNumber } : product));
											setCart(updatedCart);
										}
									}}
									onKeyDown={(e) => {
										const valueAsString = e.target.value;
										const valueAsNumber = Number(valueAsString);

										if (e.key === "ArrowUp") {
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
								/>

								<span onClick={() => updateCart(item, "add")}>
									<FontAwesomeIcon icon={faPlus} />
								</span>
							</div>
						</Product>
					</CSSTransition>
				))}
			</TransitionGroup>

			<Total>
				<p>Total</p>
				<p>{total}</p>
			</Total>
			<Button width={"100%"} onClick={() => setActiveAction("payment")}>
				Confirm
			</Button>
		</>
	);
};

export default Cart;
