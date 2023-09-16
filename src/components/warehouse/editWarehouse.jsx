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

const EditWarehouseComponent = ({ warehouseId, onClose, GetWarehouses }) => {
  return (
    <PopupOverlay>
      <PopupContent>
        <HeaderTitle>Edit Warehouse</HeaderTitle>
        <FieldContainer>
          <LabelContainer first>
            <Label>General Information</Label>{" "}
          </LabelContainer>
          <div>
            <FieldTitleLabel notFirst>Warehouse Name</FieldTitleLabel>
            <InputHolder type="text" placeholder="Enter your warehouse name" />
          </div>
          <div>
            <FieldTitleLabel notFirst>Address</FieldTitleLabel>
            <InputHolder
              type="text"
              placeholder="Enter your warehouse address"
            />
          </div>
        </FieldContainer>

        <ButtonsContainer>
          <CloseButton onClick={onClose}>Close</CloseButton>
          <Button onClick={() => router.push("/dashboard/")}>Save</Button>
        </ButtonsContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default EditWarehouseComponent;
