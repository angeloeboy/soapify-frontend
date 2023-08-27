import { getPaymentMethods } from "@/api/pos";
import { ComponentTitle } from "@/styled-components/pos";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../misc/button";
import { TransactionContext } from "@/context/pos.context";

const PaymentMethod = styled.div`
	margin-bottom: 16px;
	background-color: #ffffff;
	padding: 16px;
	cursor: pointer;
	border: 1px solid ${(props) => (props.selected ? "#1A69F0" : "#efefef")};

	.paymentName {
		color: #536686;
		font-family: DM Sans;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}

	.paymentNo {
		color: #005eff;
		font-family: DM Sans;
		font-size: 14px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		margin-top: 8px;
	}
`;

const PaymentMethodsContainer = styled.div`
	margin-top: 48px;
`;

const TransactionNo = styled.div`
	margin-top: 48px;
	margin-bottom: 48px;
	input {
		width: 100%;
		margin-top: 16px;
		padding: 8px;
		border: 1px solid #dddd;

		&:focus {
			outline: 1px solid #1a69f0;
		}
	}
`;

const PaymentMethods = (props) => {
	const [paymentMethods, setPaymentMethods] = useState([]);
	const [paymentMethod, setPaymentMethod] = useState(1);
	const [transactionNo, setTransactionNo] = useState("");
	// const { paymentMethod, setPaymentMethod } = useContext(TransactionContext);

	useEffect(() => {
		getPaymentMethodsFunc();
	}, []);

	const getPaymentMethodsFunc = () => {
		getPaymentMethods().then((res) => {
			console.log(res.paymentMethods);
			res ? setPaymentMethods(res.paymentMethods) : setPaymentMethods([]);
			// setPaymentMethodsLoading(false);
		});
	};

	return (
		<>
			<ComponentTitle>
				<span onClick={() => props.setActiveAction("cart")}>{"<"}</span> Payment Methods
			</ComponentTitle>
			<PaymentMethodsContainer>
				{paymentMethods.map((payment) => {
					return (
						<PaymentMethod
							key={payment.payment_method_id}
							selected={paymentMethod == payment.payment_method_id}
							onClick={() => setPaymentMethod(payment.payment_method_id)}
						>
							<p className="paymentName">{payment.name}</p>
							<p className="paymentNo">{payment.account_no}</p>
						</PaymentMethod>
					);
				})}
			</PaymentMethodsContainer>
			<TransactionNo>
				<ComponentTitle>Transaction Number</ComponentTitle>
				<input type="text" value={transactionNo} onChange={(e) => setTransactionNo(e.target.value)} />
			</TransactionNo>
			<Button width={"100%"} onClick={() => props.setActiveAction("receipt")}>
				Finish
			</Button>
		</>
	);
};

export default PaymentMethods;
