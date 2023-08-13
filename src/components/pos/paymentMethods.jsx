import { getPaymentMethods } from "@/api/pos";
import { ComponentTitle } from "@/styled-components/pos";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../misc/button";

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
			<ComponentTitle>Payment Methods</ComponentTitle>
			<PaymentMethodsContainer>
				{paymentMethods.map((payment) => {
					return (
						<PaymentMethod key={payment.id} selected={paymentMethod == payment.id} onClick={() => setPaymentMethod(payment.id)}>
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
