import { validatePromo } from "@/api/promos";
import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";
import styled from "styled-components";
import { toast } from "react-toastify";

const PromoCodeInput = styled.input`
	width: 100%;
	height: 40px;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	padding: 0px 16px;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0em;
	text-align: left;
	color: #000000;
	margin-bottom: 16px;
`;

const ApplyButton = styled.button`
	width: 100%;
	height: 40px;
	background-color: #f2994a;
	border-radius: 4px;
	border: none;
	color: #fff;
	font-size: 14px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	letter-spacing: 0em;
	text-align: center;
	margin-bottom: 16px;
`;

const PromoCode = () => {
	const [promoCode, setPromoCode] = useState("");
	const { setTransaction, transaction, cart, setCart, setPromoCodeResponse, promoCodeResponse } = useContext(TransactionContext);

	const validate = async () => {
		console.log(transaction);
		if (transaction.promo_codeApplied) {
			console.log("test");
			return toast.error("Promo already applied");
		}

		const res = await validatePromo(promoCode, cart);
		console.log(res);

		if (res.isValid) {
			//check if the value is less than the total
			if (res.discountType === "PERCENTAGE") {
				// if (res.totalDiscountAmount > 100) {
				// 	return toast.error("Discount value cannot be greater than 100%");
				// }
			} else {
				if (res.totalDiscountAmount > transaction.total_amount) {
					return toast.error("Discount value cannot be greater than the total");
				}
			}

			setTransaction((prev) => ({ ...prev, promo_code: promoCode }));
			setPromoCodeResponse(res);
			toast.success("Promo code applied!");
			setTransaction((prev) => ({ ...prev, promo_codeApplied: true }));
			return;
		}

		toast.error(res.errorMessage);
	};

	const removePromo = async () => {
		//if the transaction is discounted in percentage then we need to add the discount amount back to the total
		if (promoCodeResponse.discountType === "PERCENTAGE") {
			//return the discount amount back to the total

			//get the original price of products that were discounted
			let discountedItems = promoCodeResponse.discountedItems;
			let totalDiscountAmount = 0;
			discountedItems.forEach((item) => {
				totalDiscountAmount += item.discountAmount;
			});

			//update the cart with the original price of the discounted items and remove the isDiscounted flag
			let updatedCart = cart.map((cartItem) => {
				const discountInfo = discountedItems.find((di) => di.product_id === cartItem.product_id);
				if (discountInfo) {
					return {
						...cartItem,
						product_price: cartItem.orig_price,
						isDiscounted: false,
						orig_price: null,
					};
				}
				return cartItem;
			});

			setCart(updatedCart);
		}

		setTransaction((prev) => ({ ...prev, promo_code: "" }));
		setPromoCodeResponse({});
		setTransaction((prev) => ({ ...prev, promo_codeApplied: false }));
		console.log(cart);
		console.log(transaction);
	};

	//check if cart is empty
	if (cart.length !== 0) {
		return (
			<div>
				<PromoCodeInput
					type="text"
					value={transaction.promo_code}
					onChange={(e) => {
						setTransaction((prev) => ({ ...prev, promo_code: e.target.value }));
						setPromoCode(e.target.value);
					}}
					placeholder="Apply voucher "
				/>
				<ApplyButton onClick={() => validate()}>Apply</ApplyButton>
				{transaction.promo_codeApplied && <ApplyButton onClick={() => removePromo()}>Remove Promo</ApplyButton>}
			</div>
		);
	}
};

export default PromoCode;
