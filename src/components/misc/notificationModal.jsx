import { ToastContainer, toast } from "react-toastify";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { forwardRef, useImperativeHandle } from "react";

const NotificationModalWrapper = styled.div`
	.toast-container {
		color: black;
		font-size: 14px;
		.Toastify__progress-bar-theme--light {
			background: green !important;
		}
	}
`;

const NotificationModal = forwardRef(function NotificationModal({ text, isError }, ref) {
	const notify = () => {
		console.log("test");
		if (isError) {
			toast.error(text);
		} else {
			toast.success(text);
		}
	};

	useImperativeHandle(ref, () => ({
		notify,
	}));

	return (
		<NotificationModalWrapper>
			<button onClick={notify}>Notify!</button>
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
		</NotificationModalWrapper>
	);
});

NotificationModal.displayName = "NotificationModal";

export default NotificationModal;
