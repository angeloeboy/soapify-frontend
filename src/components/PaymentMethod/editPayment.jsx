import { editPayment, getPaymentMethod } from "@/api/payment_method";
import {
  Button,
  LabelContainer,
  Label,
  FieldContainer,
  CloseButton,
  ButtonsContainer,
  PopupOverlay,
  PopupContent,
  HeaderTitle,
  FieldTitleLabel,
  InputHolder,
} from "@/styled-components/ItemActionModal";
import { useEffect, useState } from "react";

const EditPayment = ({ onClose, paymentId, fetchPaymentMethods }) => {
  const [paymentMethod, setPaymentMethod] = useState({
    name: "",
    account_no: "",
  });

  const addPaymentMethodFunc = async () => {
    const res = await addPaymentMethod(paymentMethod);
    console.log(res);
  };

  const loadPaymentMethod = async () => {
    const res = await getPaymentMethod(paymentId);
    setPaymentMethod(res.paymentMethod);
  };

  const editPaymentFunc = async () => {
    const res = await editPayment(paymentId, paymentMethod);
    console.log(res);
    loadPaymentMethod();
    fetchPaymentMethods();
  };

  useEffect(() => {
    loadPaymentMethod();
  }, []);

  return (
    <PopupOverlay>
      <PopupContent>
        <HeaderTitle>Edit Payment Method</HeaderTitle>
        <FieldContainer>
          <LabelContainer first>
            <Label>Payment Information</Label>
          </LabelContainer>
          <div>
            <FieldTitleLabel>Payment Name</FieldTitleLabel>
            <InputHolder
              type="text"
              value={paymentMethod.name}
              onChange={(e) =>
                setPaymentMethod({ ...paymentMethod, name: e.target.value })
              }
            />
          </div>
          <div>
            <FieldTitleLabel notFirst>Number/Account Number</FieldTitleLabel>
            <InputHolder
              type="text"
              value={paymentMethod.account_no}
              onChange={(e) =>
                setPaymentMethod({
                  ...paymentMethod,
                  account_no: e.target.value,
                })
              }
            />
          </div>
        </FieldContainer>
        <ButtonsContainer>
          <CloseButton onClick={onClose}>Close</CloseButton>
          <Button onClick={() => editPaymentFunc(paymentMethod)}>Save</Button>
        </ButtonsContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default EditPayment;
