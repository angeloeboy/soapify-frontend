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
} from "@/styled-components/ItemActionModal";

import { useEffect, useState } from "react";
// import { addRefund } from "@/api/products"; // Adjust the API import based on your requirements

const EditRefundComponent = ({ setIsEditPopUpOpen, getRefundsFunc }) => {
  const currentDate = new Date().toISOString();

  const [refund, setRefund] = useState({
    quantity: 1,
    date_added: currentDate,
    date_updated: currentDate,
    customerInfo: "", // Add customer information field
    refundAmount: 0.0, // Add refund amount field
    reasonForRefund: "", // Add reason for refund field
    // Add any other refund-related fields you need
  });

  const editRefundFunc = async (e) => {
    e.preventDefault();
    await editRefund(refund).then((res) => {
      console.log(res);
    });

    await getRefundsFunc();
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <form onSubmit={(e) => editRefundFunc(e)}>
          <HeaderTitle>Edit Refund</HeaderTitle>
          <FieldContainer>
            <LabelContainer first>
              <Label>Customer Information</Label>{" "}
            </LabelContainer>
            <div>
              <FieldTitleLabel>Customer Information</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter customer information"
                onChange={(e) =>
                  setRefund({ ...refund, customerInfo: e.target.value })
                }
              />
            </div>
            <div>
              <FieldTitleLabel>Date of Purchase</FieldTitleLabel>
              <InputHolder
                type="date"
                placeholder="Enter the date of purchase"
                onChange={(e) =>
                  setRefund({ ...refund, date_added: e.target.value })
                }
              />
            </div>
            <div>
              <FieldTitleLabel>Refund Amount</FieldTitleLabel>
              <InputHolder
                type="number"
                placeholder="Enter the refund amount"
                onChange={(e) =>
                  setRefund({ ...refund, refundAmount: e.target.value })
                }
              />
            </div>
            <div>
              <FieldTitleLabel>Reason for Refund</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter the reason for refund"
                onChange={(e) =>
                  setRefund({ ...refund, reasonForRefund: e.target.value })
                }
              />
            </div>
            {/* Add fields for any other refund-related information */}
          </FieldContainer>

          <ButtonsContainer>
            <CloseButton onClick={() => setIsEditPopUpOpen(false)}>
              Close
            </CloseButton>
            <Button type="submit">Save</Button>
          </ButtonsContainer>
        </form>
      </PopupContent>
    </PopupOverlay>
  );
};

export default EditRefundComponent;
