import styled from "styled-components";
import { ComponentTitle } from "./../../styled-components/pos";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../misc/button";

const CartTable = styled.table`
	width: 100%;
	margin-top: 42.5px;
	padding: 0px 24px;
	border-collapse: collapse;
	table-layout: fixed;

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

const Cart = ({ cart, minusToCart, addToCart }) => {
	const getTotal = () => {
		let total = 0;

		cart.forEach((item) => {
			total += (item.quantity / 100) * item.product_price;
		});

		return parseFloat(total).toFixed(2);
	};

	return (
		<>
			<ComponentTitle>Cart</ComponentTitle>

			<CartTable>
				<tbody>
					<tr>
						<th>Product</th>
						<th>Quantity</th>
						<th>Price</th>
					</tr>

					{cart.map((item) => (
						<tr key={item.id}>
							<td>
								<p>{item.product_name}</p>
							</td>

							<td>
								<p>
									<span onClick={() => minusToCart(item)}>
										<FontAwesomeIcon icon={faMinus} />
									</span>{" "}
									{item.quantity}{" "}
									<span onClick={() => addToCart(item)}>
										<FontAwesomeIcon icon={faPlus} />
									</span>
								</p>
							</td>

							<td>
								<p>{(item.quantity / 100) * item.product_price}</p>
							</td>
						</tr>
					))}

					<tr className="bold">
						<td>
							<p>Total</p>
						</td>
						<td></td>
						<td>
							<p>{getTotal()}</p>
						</td>
					</tr>
				</tbody>
			</CartTable>
			<Button width={"100%"}>Confirm</Button>
		</>
	);
};

export default Cart;
