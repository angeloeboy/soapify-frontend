import { resetPassword } from "@/api/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

const TokenInfo = styled.p`
	color: #666;
	font-size: 0.9rem;
	margin-top: 10px;
`;

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const router = useRouter();
	const { token } = router.query;

	const resetPasswordFunc = async () => {
		//check if password and confirm password match
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		//check if token is valid
		if (!token) {
			toast.error("Invalid token");
			return;
		}

		const res = await resetPassword(password, token);

		if (res.status == "Success") {
			toast.success("Password reset successfully");

			//redirect to login after 2 seconds
			setTimeout(() => {
				router.push("/login");
			}, 2000);
			return;
		}
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
			<Title>Reset Password</Title>
			<StyledInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New Password" />
			<StyledInput type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password" />
			{/* <TokenInfo>Token: {token}</TokenInfo> */}
			<Button onClick={() => resetPasswordFunc()}>Reset</Button>
		</Container>
	);
};

export default ResetPassword;
