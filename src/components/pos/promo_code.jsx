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
	const { setTransaction, transaction, cart, setPromoCodeResponse } = useContext(TransactionContext);

	const validate = async () => {
		const res = await validatePromo(promoCode, cart);
		console.log(res);

		if (res.isValid) {
			setPromoCodeResponse(res);
			toast.success("Promo code applied!");
			return;
		}

		toast.error(res.errorMessage);
	};

	const applyPromoToCart = (promo) => {
		let newCart = cart.map((item) => {
			if (item.product_id == promo.product_id) {
				return {
					...item,
					promo_id: promo.promo_id,
					promo_name: promo.promo_name,
					promo_discount: promo.promo_discount,
					promo_type: promo.promo_type,
				};
			}
			return item;
		});
		setTransaction((prev) => ({ ...prev, cart: newCart }));
	};
	//check if cart is empty
	if (cart.length !== 0) {
		return (
			<div>
				<PromoCodeInput type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Apply voucher " />
				<ApplyButton onClick={() => validate()}>Apply</ApplyButton>
			</div>
		);
	}
};

export default PromoCode;
