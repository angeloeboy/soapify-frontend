import { forgotPassword } from "@/api/auth";
import { useState } from "react";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [sent, setSent] = useState(false);
	const changePassword = async () => {
		const res = await forgotPassword(email);
		setSent(true);
		console.log(res);
	};

	return (
		<div>
			<h1>Forgot Password</h1>
			<input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
			<button onClick={() => changePassword()}>Submit</button>
			{sent && <p>Check your email for a link to reset your password.</p>}
		</div>
	);
};

export default ForgotPassword;
