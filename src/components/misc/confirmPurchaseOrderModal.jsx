import styled from "styled-components";
import { useState } from "react";
import ReportDiscrepancyModal from "./reportDiscrepancyModal";
import { Button, HeaderTitle } from "@/styled-components/ItemActionModal";

const ConfirmPurchaseOrderModalContainer = styled.div`
	backdrop-filter: blur(2px);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999999999;
	background-color: rgba(3, 10, 22, 0.768627451) !important;

	.inner {
		background-color: white;
		width: 641px;
		padding: 1.75rem;
		border-radius: 0.5rem;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0px 1px 3px rgba(7, 14, 35, 0.06), 0px 2px 8px rgba(7, 14, 35, 0.05);
		overflow: auto;

		.modal-icon {
			width: 3rem;
			min-width: 3rem;
			height: 3rem;
			border-radius: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			margin-bottom: 1.5rem;
			background-color: #fee2e2;
		}
		.modal-header {
			font-size: 16px;
			line-height: 19px;
			color: #121417;
			margin-bottom: 0.5rem;
			padding: 0;
			border: 0;
			display: flex;
			justify-content: center;
		}

		.modal-item-text,
		.modal-description {
			font-weight: 400;
			font-size: 14px;
			line-height: 18px;
			text-align: center;
			color: #555d67;
		}
		.buttons-container {
			margin-top: 1.75rem;
			padding: 0;

			align-items: center;
			flex-wrap: nowrap;
			// If you want to ensure the buttons are always at the bottom:
			width: calc(100%); // Adjust width to account for padding
			font-size: 16px;
			.top-buttons {
				display: flex;
				justify-content: space-between;

				button {
					width: 49%;
					margin: 0px;
					margin-bottom: 16px;
				}

				.discrepancy {
					background-color: #fff;
					border: 1px solid #bababa;
					color: #555d67;
				}
			}
		}
	}
`;

const NewCloseButton = styled(Button)`
	width: 100%;
	background-color: white;
	border-radius: 8px;
	background: #fff;
	box-shadow: 0px 0px 0px 1px #bababa;
	color: #555d67;
	margin: 0px;
`;

const ConfirmPurchaseOrder = ({ purchaseOrderId, close, report, confirmPurchaseOrderFunc, purchaseOrder, fetchPurchaseOrders, closePopup }) => {
	const [isReportDiscrepancyOpen, setIsReportDiscrepancyOpen] = useState(false);

	return (
		<ConfirmPurchaseOrderModalContainer>
			<div className="inner">
				<div class="modal-icon error">
					<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M12 9V11M12 15V15.01" stroke="#E16727" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
						<path
							d="M4.99921 19H18.9992C19.3255 18.9977 19.6463 18.9156 19.9336 18.7609C20.2209 18.6061 20.466 18.3834 20.6474 18.1122C20.8289 17.841 20.9412 17.5295 20.9747 17.2049C21.0081 16.8803 20.9616 16.5525 20.8392 16.25L13.7392 4C13.5663 3.6874 13.3127 3.42683 13.005 3.24539C12.6972 3.06394 12.3465 2.96825 11.9892 2.96825C11.632 2.96825 11.2812 3.06394 10.9735 3.24539C10.6657 3.42683 10.4122 3.6874 10.2392 4L3.13921 16.25C3.01915 16.5456 2.97155 16.8656 3.00036 17.1833C3.02918 17.501 3.13359 17.8073 3.30486 18.0764C3.47614 18.3456 3.70932 18.5698 3.98494 18.7305C4.26056 18.8912 4.57061 18.9836 4.88921 19"
							stroke="#E16727"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						></path>
					</svg>
				</div>
				<HeaderTitle className="modal-header">Confirm receiving POO{purchaseOrder.purchase_order_id}?</HeaderTitle>
				<p className="modal-description">
					You are about to confirm the receipt of Purchase Order POO{purchaseOrder.purchase_order_id}. Please verify that you have received all items in the
					order and that the quantities match the original purchase order.
				</p>

				<div className="buttons-container">
					<div className="top-buttons">
						<Button onClick={() => setIsReportDiscrepancyOpen(true)} type="button" className="discrepancy">
							Report Discrepancy
						</Button>

						<Button onClick={() => confirmPurchaseOrderFunc()} width="49%">
							Confirm
						</Button>
					</div>

					<NewCloseButton className="cancel" width="49%" onClick={() => close(false)}>
						Close
					</NewCloseButton>
				</div>
			</div>
			{isReportDiscrepancyOpen && (
				<ReportDiscrepancyModal
					close={() => close(false)}
					purchaseOrder={purchaseOrder}
					fetchPurchaseOrders={fetchPurchaseOrders}
					setIsReportDiscrepancyOpen={setIsReportDiscrepancyOpen}
					closePopup={closePopup}
				/>
			)}
		</ConfirmPurchaseOrderModalContainer>
	);
};

export default ConfirmPurchaseOrder;
