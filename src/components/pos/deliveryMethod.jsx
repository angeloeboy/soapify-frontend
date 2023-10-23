const { ComponentTitle } = require("@/styled-components/pos");
const { default: Image } = require("next/image");
const styled = require("styled-components");
const { Button } = require("../misc/button");
const PaymentMethod = styled.div`
	margin-bottom: 16px;
	background-color: #ffffff;
	padding: 16px;
	cursor: pointer;
	border: 1px solid ${(props) => (props.selected ? "#1A69F0" : "#efefef")};

	.paymentName {
		color: #536686;
		font-family: DM Sans;
		font-size: 16px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
	}

	.paymentNo {
		color: #005eff;
		font-family: DM Sans;
		font-size: 14px;
		font-style: normal;
		font-weight: 700;
		line-height: normal;
		margin-top: 8px;
	}
`;

const PaymentMethodsContainer = styled.div`
	margin-top: 48px;
`;

const DeliveryMethod = () => {
	const deliveryMethods = [
		{
			delivery_method_id: 1,
			name: "Pickup",
			description: "Pickup from store",
		},
		{
			delivery_method_id: 2,
			name: "Delivery",
			description: "Deliver to address",
		},
	];

	return (
		<>
			<ComponentTitle>
				<span onClick={() => props.setActiveAction("cart")}>{"<"}</span> Payment Methods
			</ComponentTitle>
			<PaymentMethodsContainer>
				{paymentMethods.length <= 0 && <p>No payment Methods </p>}
				{paymentMethods.map((payment) => {
					return (
						<PaymentMethod
							key={payment.payment_method_id}
							selected={paymentMethod == payment.payment_method_id}
							onClick={() => {
								setPaymentMethod(payment.payment_method_id);
								setTransaction((prev) => ({ ...prev, payment_method_id: payment.payment_method_id }));
							}}
						>
							<p className="paymentName">{payment.name}</p>
							<p className="paymentNo">{payment.account_no}</p>
						</PaymentMethod>
					);
				})}
			</PaymentMethodsContainer>

			<Button
				width={"100%"}
				onClick={() => {
					console.log(transaction);
					initiateTransaction();
				}}
			>
				{loading ? <Image src="/loading.svg" alt="loading" width="20" height="20" /> : "Finish"}
			</Button>
		</>
	);
};

export default DeliveryMethod;
