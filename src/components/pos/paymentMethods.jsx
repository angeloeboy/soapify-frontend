import { getPaymentMethods } from "@/api/pos";
import { ComponentTitle } from "@/styled-components/pos";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../misc/button";
// import { TransactionContext } from "@/pages/dashboard/pos";
import { TransactionContext } from "../context/TransactionContext";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { addTransaction } from "@/api/transaction";
import { toast } from "react-toastify";
import Receipt from "./receipt";

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
	const [loading, setLoading] = useState(false);
	const { setTransaction, transaction, setOrderFromBackend } = useContext(TransactionContext);
	const [transactionSuccess, setTransactionSuccess] = useState(false);

	const [selectedPaymentName, setSelectedPaymentName] = useState("");
	useEffect(() => {
		fetchPaymentMethods();
	}, []);

	const initiateTransaction = async () => {
		const response = await addTransaction(transaction);
		console.log(response);
		if (response.status == "Success") {
			toast.success("Transaction Successful");
			setOrderFromBackend(response.transaction);
		} else {
			toast.error(response.errors[0].message);
		}
		setLoading(false);
		console.log(response.transaction);
	};

	const fetchPaymentMethods = () => {
		getPaymentMethods().then((res) => {
			console.log(res.paymentMethods);

			if (res.paymentMethods.length <= 0 || !res) return;

			let activePaymentMethod = res.paymentMethods.filter((payment) => payment.isActive);
			res ? setPaymentMethods(activePaymentMethod) : setPaymentMethods([]);

			setTransaction((prev) => ({ ...prev, payment_method_id: res.paymentMethods[0].payment_method_id }));
		});
	};

	useEffect(() => {
		setTransaction((prev) => ({ ...prev, transaction_number: transactionNo }));
	}, [transactionNo]);

	return (
		<>
			<ComponentTitle>
				<span onClick={() => props.setActiveAction("cart")}>{"<"}</span> Payment Methods
			</ComponentTitle>
			<p>prmos</p>
			<input type="text" />
			<PaymentMethodsContainer>
				{paymentMethods.length <= 0 && <p>No payment Methods </p>}
				{paymentMethods.map((payment) => {
					return (
						<PaymentMethod
							key={payment.payment_method_id}
							selected={paymentMethod == payment.payment_method_id}
							onClick={() => {
								setPaymentMethod(payment.payment_method_id);
								setSelectedPaymentName(payment.name);
								setTransaction((prev) => ({ ...prev, payment_method_id: payment.payment_method_id }));
							}}
						>
							<p className="paymentName">{payment.name}</p>
							<p className="paymentNo">{payment.account_no}</p>
						</PaymentMethod>
					);
				})}
			</PaymentMethodsContainer>

			{selectedPaymentName !== "Cash" && selectedPaymentName !== "CASH" && (
				<TransactionNo>
					<ComponentTitle>Transaction Number</ComponentTitle>
					<input type="text" value={transactionNo} onChange={(e) => setTransactionNo(e.target.value)} />
				</TransactionNo>
			)}

			<Button
				width={"100%"}
				onClick={() => {
					console.log(transaction);
					initiateTransaction();
				}}
			>
				{loading ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Finish"}
			</Button>
			<Receipt />
		</>
	);
};

export default PaymentMethods;
