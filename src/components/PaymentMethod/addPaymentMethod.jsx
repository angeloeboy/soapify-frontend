import React, { useState } from "react";
import styled from "styled-components";
import { Button, FieldContainer, FieldTitleLabel, InputHolder, Label, LabelContainer, PopupContent, PopupOverlay, SecondaryButton } from "@/styled-components/ItemActionModal";
import { HeaderTitle } from "@/styled-components/ItemActionModal";
import { ButtonsContainer } from "@/styled-components/ItemActionModal";
import { CloseButton } from "../styled-components/PopUp";
const PopupContentPaymentMethod = ({ onClose }) => {
  const [paymentName, setPaymentName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [createdDate, setCreatedDate] = useState("");

  const handleSave = () => {
     
    onClose();
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <HeaderTitle>Add Payment Method</HeaderTitle>
        <FieldContainer>
          <LabelContainer first>
            <Label>Payment Information</Label>
          </LabelContainer>
          <div>
            <FieldTitleLabel>Payment Name</FieldTitleLabel>
            <InputHolder
              type="text"
              placeholder="Enter Payment Name"
              value={paymentName}
              onChange={(e) => setPaymentName(e.target.value)}
            />
          </div>
          <div>
            <FieldTitleLabel notFirst>Number/Account Number</FieldTitleLabel>
            <InputHolder
              type="text"
              placeholder="Enter Number/Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
            />
          </div>
          <div>
            <FieldTitleLabel notFirst>Type</FieldTitleLabel>
            <InputHolder
              type="text"
              placeholder="Enter Payment Type"
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
            />
          </div>
          <div>
            <FieldTitleLabel notFirst>Created (date)</FieldTitleLabel>
            <InputHolder
              type="text"
              placeholder="Enter Created Date"
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
            />
          </div>
        </FieldContainer>
        <ButtonsContainer>
          <CloseButton onClick={onClose}>Close</CloseButton>
          <Button onClick={handleSave}>Save</Button>
        </ButtonsContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default PopupContentPaymentMethod;
