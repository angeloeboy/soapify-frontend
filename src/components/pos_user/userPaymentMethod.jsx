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
import { addTransaction, addTransactionByUser } from "@/api/transaction";
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

const ImageContainer = styled.div`
	width: 100%;
`;

const Centered = styled.div`
	margin-top: 10px;
	display: flex;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 10px;
	background-color: #f9f9f9;
	text-align: center;
	justify-content: center;
	align-items: center;
	height: 200px;
	margin-bottom: 30px;
`;

const Note = styled.p`
	font-size: 14px;
	color: #536686;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin-bottom: 1rem;
`;

const UserPaymentMethods = (props) => {
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

	// const initiateTransaction = async () => {
	// 	const response = await addTransactionByUser(transaction);
	// 	console.log(response);
	// 	if (response.status == "Success") {
	// 		toast.success("Transaction Successful");
	// 		setOrderFromBackend(response.transaction);
	// 	} else {
	// 		toast.error(response.errors[0].message);
	// 	}
	// 	setLoading(false);
	// 	console.log(response.transaction);
	// };

	const initiateTransaction = async (e) => {
		// Create a new FormData object
		e.preventDefault();

		// setLoading(true);
		let formData = new FormData();
		setLoading(true);
		//add the image to the form data
		//image is not required
		if (e.target.payment_image.files[0]) {
			formData.append("payment_image", e.target.payment_image.files[0]);
		}

		// Append each property in the transaction object to formData
		for (let key in transaction) {
			if (transaction.hasOwnProperty(key)) {
				// Convert the property value to a string if it's an object (excluding Blob/File)
				if (typeof transaction[key] === "object" && !(transaction[key] instanceof Blob)) {
					formData.append(key, JSON.stringify(transaction[key]));
				} else {
					// Append other properties as they are
					formData.append(key, transaction[key]);
				}
			}
		}

		// Make the API call with formData
		const response = await addTransactionByUser(formData);
		console.log(response);

		// Handle the response
		if (response.status == "Success") {
			toast.success("Transaction Successful");
			setOrderFromBackend(response.transaction);

			setTimeout(() => {
				window.location.href = "/user/orders";
			}, 1000);
		} else {
			toast.error("Transaction Failed");
		}

		setLoading(false);
		console.log(response.transaction);
	};
	const fetchPaymentMethods = async () => {
		try {
			const res = await getPaymentMethods();

			if (!res || res.paymentMethods.length <= 0) {
				setPaymentMethods([]);
				return;
			}

			const activePaymentMethod = res.paymentMethods.filter((payment) => payment.isActive && payment.name.toLowerCase() !== "cash");
			console.log(activePaymentMethod);
			setPaymentMethods(activePaymentMethod);
			setPaymentMethod(activePaymentMethod[0].payment_method_id);

			if (activePaymentMethod.length > 0) {
				setTransaction((prev) => ({
					...prev,
					payment_method_id: activePaymentMethod[0].payment_method_id,
				}));
			}
		} catch (error) {
			console.error("Error fetching payment methods:", error);
			// Handle the error as needed
		}
	};

	useEffect(() => {
		setTransaction((prev) => ({ ...prev, transaction_number: transactionNo }));
	}, [transactionNo]);

	return (
		<form onSubmit={(e) => initiateTransaction(e)}>
			<ComponentTitle>
				<span onClick={() => props.setActiveAction("pickup")}>{"<"}</span> Payment Methods
			</ComponentTitle>
			<PaymentMethodsContainer>
				{paymentMethods.length <= 0 && <p>No payment Methods </p>}
				<Note>Transfer your payment to these accounts. Enter the transaction number to proceed</Note>
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
					<ComponentTitle>Reference Number</ComponentTitle>
					<input type="text" value={transactionNo} onChange={(e) => setTransactionNo(e.target.value)} />
				</TransactionNo>
			)}

			<ComponentTitle>Reference Number screenshot (optional)</ComponentTitle>

			<ImageContainer>
				<Centered>
					<input type="file" name="payment_image" />
				</Centered>
			</ImageContainer>

			<Button
				width={"100%"}
				type="submit"
				// onClick={(e) => {
				// 	initiateTransaction(e);
				// }}
			>
				{loading ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Finish"}
			</Button>
			{/* <Receipt /> */}
		</form>
	);
};

export default UserPaymentMethods;
