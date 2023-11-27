import { validatePromo } from "@/api/promos";
import { useContext, useState } from "react";
import { TransactionContext } from "../context/TransactionContext";

const PromoCode = () => {
	const [promoCode, setPromoCode] = useState("");
	const { setTransaction, transaction, cart, setPromoCodeResponse } = useContext(TransactionContext);

	const validate = async () => {
		const res = await validatePromo(promoCode, cart);
		console.log(res);

		if (!res.error) {
			setPromoCodeResponse(res);
			return;
		}
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

	return (
		<div>
			<input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} />
			<button onClick={() => validate()}>Apply</button>
		</div>
	);
};

export default PromoCode;
