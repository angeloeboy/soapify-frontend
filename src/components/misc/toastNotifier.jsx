// ToastNotifier.js
import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastNotifier = ({ message, type }) => {
	useEffect(() => {
		console.log("loaded");
		if (message) {
			switch (type) {
				case "success":
					toast.success(message);
					break;
				case "error":
					toast.error(message);
					break;
				case "warn":
					toast.warn(message);
					break;
				default:
					toast.info(message);
					break;
			}
		}
	}, [message, type]);

	return (
		<ToastContainer
			position="bottom-center"
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
	);
};

export default ToastNotifier;
