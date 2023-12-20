import { editCancellationLimit, getCancellationLimit } from "@/api/site_settings";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CancellationLimit = () => {
	const [cancellationLimit, setCancellationLimit] = useState(0);

	const getCancellationLimitFunct = async () => {
		const res = await getCancellationLimit();
		console.log(res.data);
		if (res.status === "Success") {
			setCancellationLimit(res.data.cancellation_limit);
		}
	};

	useEffect(() => {
		getCancellationLimitFunct();
	}, []);

	const setCancellationLimitFunct = async () => {
		const res = await editCancellationLimit(cancellationLimit);

		if (res.status === "Success") {
			setCancellationLimit(res.data);
			toast.success("Cancellation limit updated successfully");
			getCancellationLimitFunct();
			return;
		}

		toast.error("Error updating cancellation limit");
	};

	return (
		<div>
			<h1>Cancellation Limit</h1>

			<input
				type="number"
				value={cancellationLimit}
				onChange={(e) => {
					setCancellationLimit(e.target.value);
				}}
			/>

			<button onClick={setCancellationLimitFunct}>Update</button>
		</div>
	);
};

export default CancellationLimit;
