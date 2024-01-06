import styled from "styled-components";
import {
	Label,
	Button,
	LabelContainer,
	FieldContainer,
	Centered,
	CloseButton,
	ButtonsContainer,
	PopupOverlay,
	PopupContent,
	HeaderTitle,
	FieldTitleLabel,
	InputHolder,
	Select,
	Option,
} from "@/styled-components/ItemActionModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getProducts } from "@/api/products";
import { confirmPurchaseOrder } from "@/api/purchaseOrder";
import { toast } from "react-toastify";
// Reusing the same container styles as DeactivateModalContainer

const ReportDiscrepancyModalContainer = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 999999999;

	.inner {
		background-color: white;
		width: 641px;
		max-height: 941px;
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
			display: flex;
			justify-content: center;
			align-items: center;
			flex-wrap: nowrap;
			// If you want to ensure the buttons are always at the bottom:

			button {
				width: 100%;
			}

			.cancel {
				border-radius: 8px;
				background: #fff;
				box-shadow: 0px 0px 0px 1px #bababa;
				color: #555d67;
			}
		}
	}
`;

const ReportDiscrepancyModal = ({ purchaseOrderId, close, report, purchaseOrder, fetchPurchaseOrders, setIsReportDiscrepancyOpen, closePopup }) => {
	// const [receivedQuantity, setReceivedQuantity] = useState("");
	// const [additionalDetails, setAdditionalDetails] = useState("");

	const [productList, setProductList] = useState(purchaseOrder.purchase_order_items);

	const confirmPurchaseOrderFunc = async () => {
		const purchaseOrderObject = {
			purchaseOrderId: purchaseOrder.purchase_order_id,
			itemsReceived: productList.map((item) => {
				return {
					itemId: item.purchase_order_item_id,
					receivedQuantity: item.quantity,
				};
			}),
			warehouse_id: 2,
			area_id: 1,
		};

		console.log(purchaseOrderObject);

		const res = await confirmPurchaseOrder(purchaseOrderObject);
		console.log(res);

		if (res.status == "Success") {
			fetchPurchaseOrders();
			close();
			setIsReportDiscrepancyOpen(false);
			closePopup();
			toast.success("Purchase Order Confirmed");
		}
	};

	return (
		<ReportDiscrepancyModalContainer>
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
				<HeaderTitle className="modal-header">Report Discrepancy: Purchase Order {purchaseOrderId}</HeaderTitle>
				<p className="modal-description">
					You are reporting a discrepancy in the receipt of purchase order {purchaseOrderId}. Please specify the quantity of items you have received.
				</p>
				<ProductList productList={productList} setProductList={setProductList} purchaseOrder={purchaseOrder} />
				<div className="buttons-container">
					<Button className="cancel" width="49%" onClick={() => close(false)}>
						Cancel
					</Button>
					<Button
						width="49%"
						onClick={() => {
							confirmPurchaseOrderFunc();
						}}
					>
						Confirm
					</Button>
				</div>
			</div>
		</ReportDiscrepancyModalContainer>
	);
};

const Product = styled.div`
	display: flex;
	margin-bottom: 38px;
	flex-wrap: wrap;
	padding-left: 25px;
	img {
		background-color: white;
	}

	.productInformation {
		/* margin-left: 16px; */
		margin-top: 16px;
		.productName {
			color: #536686;
			font-size: 14px;
			font-weight: 700;
		}

		.productPrice {
			color: #005eff;
			font-size: 14px;
			font-weight: 700;
			margin-top: 16px;

			.dashed {
				text-decoration: line-through;
				color: red;
				opacity: 0.7;
			}
		}

		.wrapper {
			display: flex;
			p {
				margin-left: 12px;
			}
		}
	}

	.quantity {
		display: inline-flex;
		align-items: center;
		align-self: flex-end;
		font-size: 16px;
		margin-top: 16px;
		margin-right: auto;
		margin-left: 16px;
		p {
			padding: 0px 16px;
		}

		input {
			border: none;
			background-color: transparent;
			width: 70px;
			text-align: center;
			outline: none;
		}
		span {
			border-radius: 4px;
			background: #1a69f0;
			width: 21px;
			height: 21px;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 8px;
			font-size: 10px;
			cursor: pointer;
			svg {
				color: #ffffff;

				path {
					color: #ffffff;
				}
			}
		}
	}

	.minus {
		opacity: ${(props) => (props.active ? "1" : "0.5")};
	}

	.delete {
		align-self: center;
		cursor: pointer;
		margin-right: 16px;
		path {
			color: #bebebe !important;
		}

		&:hover {
			path {
				color: #f88181 !important;
			}
		}
	}

	.remove {
		/* width: 100%;
		margin-top: 20px;
		font-size: 14px;
		background-color: #f88181;
		border: 2px solid #eb5151;
		color: black;
		border-radius: 4px;
		padding: 4px 8px;
		display: block; */
		font-size: 14px;
		color: #ff00007d;
		text-decoration: underline;
		cursor: pointer;
		margin-top: 16px;
	}
`;

const ProductList = ({ productList, setProductList, purchaseOrder }) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		const res = await getProducts();
		// setProducts(res.products);

		const NewproductList = purchaseOrder.purchase_order_items.map((item) => {
			const product = res.products.find((product) => product.product_id == item.product_id);
			return {
				...product,
				quantity: item.purchase_order_item_quantity - item.purchase_order_item_current_quantity,
				current_quantity: item.purchase_order_item_current_quantity,
				max_quantity: item.purchase_order_item_quantity - item.purchase_order_item_current_quantity,
				purchase_order_item_id: item.purchase_order_item_id,
			};
		});
		console.log("NewproductList", NewproductList);
		setProductList(NewproductList);
		setProducts(NewproductList);
	};

	const updateProductQuantity = (product, action) => {
		let updatedList = productList.map((p) => {
			if (p.product_id === product.product_id) {
				let newQuantity = p.quantity;

				switch (action) {
					case "add":
						//should not be greater than max quantity
						newQuantity = p.quantity < p.max_quantity ? p.quantity + 1 : p.quantity;

						break;
					case "subtract":
						newQuantity = p.quantity > 0 ? p.quantity - 1 : 0;
						break;
					default:
						break;
				}

				return { ...p, quantity: newQuantity };
			}
			return p;
		});

		setProductList(updatedList);
		setProducts(updatedList);
	};

	const handleQuantityChange = (product, valueAsString) => {
		const valueAsNumber = Number(valueAsString);
		console.log(valueAsNumber);
		if (!isNaN(valueAsNumber) && valueAsNumber >= 0) {
			//number should not be higher than max quantity
			if (valueAsNumber > product.max_quantity) {
				console.log("number should not be higher than max quantity");
				return;
			}

			let updatedList = productList.map((p) => {
				if (p.product_id === product.product_id) {
					return { ...p, quantity: valueAsNumber };
				}
				return p;
			});

			setProductList(updatedList);
			setProducts(updatedList);
		}
	};

	return (
		<div>
			<div>
				{products.map((item) => (
					<div key={item.product_id}>
						<Product key={item.product_id} active={item.quantity > 1}>
							<div className="productInformation">
								<div className="wrapper">
									<Image src={item.image_link == "testing" ? "/sabon.png" : item.image_link.replace(/\\/g, "/")} width={40} height={40} alt="Product image" />

									<div>
										<p className="productName">
											{item.product_name} |
											{item.attribute.map((attribute) => {
												return <> {attribute.value} | </>;
											})}
										</p>
										<div className="quantity">
											<span onClick={() => updateProductQuantity(item, "subtract")} className="minus">
												<FontAwesomeIcon icon={faMinus} />
											</span>
											<input
												type="text"
												value={item.quantity}
												onChange={(e) => handleQuantityChange(item, e.target.value)}
												// onBlur={(e) => {
												// 	if (e.target.value === "0") {
												// 		const updatedList = productList.filter((p) => p.product_id !== item.product_id);
												// 		setProductList(updatedList);
												// 	}
												// }}
											/>

											<span onClick={() => updateProductQuantity(item, "add")}>
												<FontAwesomeIcon icon={faPlus} />
											</span>
										</div>
									</div>
								</div>
							</div>
						</Product>
					</div>
				))}
			</div>
		</div>
	);
};

export default ReportDiscrepancyModal;
