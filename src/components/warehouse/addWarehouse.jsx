import React, { useState, useRef } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import ItemActionModal, {
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
import StyledPanel from "@/styled-components/StyledPanel";

const PopupContentWarehouse = ({ onClose, onButtonClick, fileInput }) => {
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleFileUpload = () => {
    setFileUploaded(true);
  };

  const resetFileUpload = () => {
    setFileUploaded(false);
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <HeaderTitle>Add Warehouse</HeaderTitle>
        <FieldContainer>
          <LabelContainer first>
            <Label>General Information</Label>{" "}
          </LabelContainer>
          <div>
            <FieldTitleLabel> Warehouse ID </FieldTitleLabel>
            <InputHolder type="text" placeholder="" />
          </div>
          <div>
            <FieldTitleLabel notFirst>Warehouse Name</FieldTitleLabel>
            <InputHolder type="text" placeholder="Enter your warehouse name" />
          </div>
          <div>
            <FieldTitleLabel notFirst>Address</FieldTitleLabel>
            <InputHolder type="text" placeholder="Enter your warehouse address" />
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

export default PopupContentWarehouse;
