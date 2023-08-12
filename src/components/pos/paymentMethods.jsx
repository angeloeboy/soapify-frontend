import { getPaymentMethods } from "@/api/pos";
import { ComponentTitle } from "@/styled-components/pos";
import { useEffect, useState } from "react";

const PaymentMethods = () => {
	const [paymentMethods, setPaymentMethods] = useState([]);

	useEffect(() => {
		getPaymentMethodsFunc();
	}, []);

	const getPaymentMethodsFunc = () => {
		getPaymentMethods().then((res) => {
			console.log(res);
			res ? setPaymentMethods(res.payment_methods) : setPaymentMethods([]);
			// setPaymentMethodsLoading(false);
		});
	};

	return (
		<>
			<ComponentTitle>Payment Methods</ComponentTitle>
		</>
	);
};

export default PaymentMethods;
