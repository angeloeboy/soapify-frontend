import { useEffect, useState } from "react";

const { verifyEmail, resendVerificationEmail } = require("@/api/auth");
const { useRouter } = require("next/router");

const Verify = () => {
	//get  the token from the url
	const router = useRouter();
	const { token } = router.query;

	const [message, setMessage] = useState("");
	useEffect(() => {
		if (token != undefined) {
			//call the api to verify the token
			verifyToken(token);
		}
	}, [token]);

	const verifyToken = async (token) => {
		const res = await verifyEmail(token);
		console.log(token);
		if (res.message == "Success") {
			setMessage("Email verified successfully");
			router.push("/login");
		} else {
			// router.push("/login");
			setMessage("Email verification failed");
		}
	};

	const resendVerificationEmailFunc = async () => {
		const res = await resendVerificationEmail("angeloeboy10@gmail.com");
		if (res.message == "success") {
			setMessage("Email sent successfully");
		}
	};

	return (
		<div>
			<h1>Verify</h1>
			<p>{message}</p>

			<button onClick={() => resendVerificationEmailFunc()}>Resend</button>
		</div>
	);
};

export default Verify;
