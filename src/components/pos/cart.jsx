import styled from "styled-components";
import { ComponentTitle } from "./../../styled-components/pos";

const CartTable = styled.table`
	width: 100%;

`;

const Cart = ({ cart }) => {
	return (
		<div>
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
								<p>{item.name}</p>
							</td>

							<td>
								<p>{item.quantity}</p>
							</td>

							<td>
								<p>{item.quantity * item.price}</p>
							</td>
						</tr>
					))}
				</tbody>
			</CartTable>
		</div>
	);
};

export default Cart;
