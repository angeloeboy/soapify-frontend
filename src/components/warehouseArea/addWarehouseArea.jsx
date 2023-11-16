import React, { useState } from "react";
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
import { addWarehouseArea } from "@/api/warehouse"; // Import the API function for adding warehouse areas

const AddWarehouseArea = ({ setAddPopUpOpen, fetchWarehouseAreas }) => {
  const [warehouseArea, setWarehouseArea] = useState({
   
  });

  const addWarehouseAreaFunc = async () => {
     
    console.log("Adding new warehouse area:", warehouseArea);
 
    fetchWarehouseAreas();
    // Close the add pop-up
    setAddPopUpOpen(false);
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <HeaderTitle>Add Warehouse Area</HeaderTitle>
        <FieldContainer>
          <LabelContainer first>
            <Label>General Information</Label>
          </LabelContainer>

          <div>
            <FieldTitleLabel notFirst>Area Name</FieldTitleLabel>
            <InputHolder
              type="text"
              value={warehouseArea.name}
              onChange={(e) => setWarehouseArea({ ...warehouseArea, name: e.target.value })}
            />
          </div>
          <div>
            <FieldTitleLabel notFirst>Description</FieldTitleLabel>
            <InputHolder
              type="text"
              value={warehouseArea.description}
              onChange={(e) => setWarehouseArea({ ...warehouseArea, description: e.target.value })}
            />
          </div>
          <div>
            <FieldTitleLabel notFirst>Area Type</FieldTitleLabel>
            <InputHolder
              type="text"
              value={warehouseArea.areaType}
              onChange={(e) => setWarehouseArea({ ...warehouseArea, areaType: e.target.value })}
            />
          </div>
          <div>
            <FieldTitleLabel notFirst>Capacity</FieldTitleLabel>
            <InputHolder
              type="text"
              value={warehouseArea.capacity}
              onChange={(e) => setWarehouseArea({ ...warehouseArea, capacity: e.target.value })}
            />
          </div>
          <div>
            <FieldTitleLabel notFirst>Location</FieldTitleLabel>
            <InputHolder
              type="text"
              value={warehouseArea.location}
              onChange={(e) => setWarehouseArea({ ...warehouseArea, location: e.target.value })}
            />
          </div>
          {/* Add more input fields for other properties of the warehouse area */}
        </FieldContainer>

        <ButtonsContainer>
          <CloseButton onClick={() => setAddPopUpOpen(false)}>Close</CloseButton>
          <Button onClick={() => addWarehouseAreaFunc()}>Save</Button>
        </ButtonsContainer>
      </PopupContent>
    </PopupOverlay>
  );
};

export default AddWarehouseArea;
