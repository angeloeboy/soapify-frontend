// pages/dashboard/test.js
import { useRouter } from "next/router";

let Test = () => {
	const router = useRouter();

	return (
		<div>
			<h1>Test Page</h1>
			<button onClick={() => router.push("/dashboard")}>Go to Dashboard</button>
		</div>
	);
};

export default Test;
