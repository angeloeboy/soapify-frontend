import { forgotPassword } from "@/api/auth";
import { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 20px;
	max-width: 400px;
	margin: 50px auto;
	border-radius: 8px;

	border-radius: 8px;
	border: 1px solid #dfdfdf;
	background: #fff;
	padding: 28px;
`;

const Title = styled.h1`
	color: #000000;
	font-size: 20px;
	margin-bottom: 20px;
`;

const StyledInput = styled.input`
	width: 100%;
	padding: 10px;
	margin: 10px 0;
	border: 1px solid #ddd;
	border-radius: 4px;
`;

const Button = styled.button`
	width: 100%;
	padding: 10px;
	margin-top: 20px;
	background-color: #0070f3;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background-color: #0056b3;
	}
`;

const Message = styled.p`
	color: #666;
	font-size: 0.9rem;
	margin-top: 10px;
`;

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);

	const changePassword = async () => {
		//check if email is valid
		if (!email) {
			toast.error("Please enter an email address.");
			return;
		}

		///check if email is a legit email
		if (!/\S+@\S+\.\S+/.test(email)) {
			toast.error("Please enter a valid email address.");
			return;
		}
		const res = await forgotPassword(email);

		if (res.status === "Success") {
			toast.success("Password reset email sent.");
		} else {
			toast.error("Error sending reset email.");
		}
		setSent(true);
		console.log(res);
	};

	return (
		<Container>
			<ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				className="toast-container"
			/>
			<Title>Forgot Password</Title>
			<StyledInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your Email" />
			<Button onClick={changePassword}>Submit</Button>
			{sent && <Message>Check your email for a link to reset your password.</Message>}
		</Container>
	);
};

export default ForgotPassword;
