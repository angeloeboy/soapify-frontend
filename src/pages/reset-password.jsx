import { resetPassword } from "@/api/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ResetPassword = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const router = useRouter();
	const { token } = router.query;

	const resetPasswordFunc = async () => {
		const res = await resetPassword(password, token);
		console.log(res);
	};

	return (
		<div>
			<h1>Reset Password</h1>
			<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
			<input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
			<p>token: {token}</p>
			<button onClick={() => resetPasswordFunc()}>Reset</button>
		</div>
	);
};

export default ResetPassword;
