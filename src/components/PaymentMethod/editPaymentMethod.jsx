import {
  Button,
  Select,
  LabelContainer,
  Label,
  Option,
  FieldContainer,
  ProfilePictureContainer,
  FileInput,
  Centered,
  SecondaryButton,
  CloseButton,
  ButtonsContainer,
  PopupOverlay,
  PopupContent,
  HeaderTitle,
  FieldTitleLabel,
  InputHolder,
} from "@/styled-components/ItemActionModal";
import { useEffect, useState } from "react";

const EditPaymentMethodComponent = ({
  paymentId,
  onClose,
  GetPaymentMethods,
}) => {
  return (
    <PopupOverlay>
      <PopupContent>
        <form>
          <HeaderTitle>Edit Payment Method</HeaderTitle>
          <FieldContainer>
            <LabelContainer first>
              <Label>Payment Information</Label>{" "}
            </LabelContainer>
            <div>
              <FieldTitleLabel> Payment Name </FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Edit Payment Name"
                //   onChange={(e) => {
                //     setProduct({ ...product, product_name: e.target.value });
                //   }}
                //   required
                //   value={product.product_name}
              />
            </div>
            <div>
              <FieldTitleLabel notFirst>Number/Account Number</FieldTitleLabel>
              <InputHolder
                type="number"
                placeholder="Edit Number/Account Number"
              />
            </div>
            <div>
              <FieldTitleLabel notFirst>Payment Type</FieldTitleLabel>
              <InputHolder type="text" placeholder="Edit Payment Type" />
            </div>
            <div>
              <FieldTitleLabel notFirst>Date Created</FieldTitleLabel>
              <InputHolder type="date" placeholder="Edit Date Created" />
            </div>
          </FieldContainer>
          <ButtonsContainer>
            <CloseButton onClick={onClose}>Close</CloseButton>
            <Button type="submit" onClick={(e) => handleFormSubmit(e)}>
              Save
            </Button>
          </ButtonsContainer>
        </form>
      </PopupContent>
    </PopupOverlay>
  );
};

export default EditPaymentMethodComponent;
