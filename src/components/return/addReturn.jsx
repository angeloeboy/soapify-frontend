import React, { useState, useEffect } from "react";
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

 
const ReturnComponent = ({ setIsAddPopUpOpen, getReturnsFunc }) => {
  const currentDate = new Date().toISOString();

  const [returnData, setReturnData] = useState({
    returnID: 0, // Replace with logic to generate a unique return ID
    customerInfo: "",
    productName: "",
    dateOfPurchase: currentDate,
    returnAmount: 0.0,
    returnReason: "",
    returnStatus: "Processing", // You can set the default status here
    // Add any other return-related fields you need
  });

  const addReturnFunc = async (e) => {
    e.preventDefault();
    await addReturn(returnData).then((res) => {
      console.log(res);
    });

    await getReturnsFunc();
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <form onSubmit={(e) => addReturnFunc(e)}>
          <HeaderTitle>Add Return</HeaderTitle>
          <FieldContainer>
            <div>
              <FieldTitleLabel>Return ID</FieldTitleLabel>
              <InputHolder
                type="text"
                value={returnData.returnID}
                readOnly
              />
            </div>
            <LabelContainer>
              <Label>Customer Information</Label>
            </LabelContainer>
            <div>
              <FieldTitleLabel>Customer Information</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter customer information"
                onChange={(e) =>
                  setReturnData({ ...returnData, customerInfo: e.target.value })
                }
              />
            </div>
            <div>
              <FieldTitleLabel>Product Name</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter product name"
                onChange={(e) =>
                  setReturnData({ ...returnData, productName: e.target.value })
                }
              />
            </div>
            <div>
              <FieldTitleLabel>Date of Purchase</FieldTitleLabel>
              <InputHolder
                type="date"
                value={returnData.dateOfPurchase}
                readOnly
              />
            </div>
            <div>
              <FieldTitleLabel>Return Amount</FieldTitleLabel>
              <InputHolder
                type="number"
                placeholder="Enter the return amount"
                onChange={(e) =>
                  setReturnData({ ...returnData, returnAmount: e.target.value })
                }
              />
            </div>
            <div>
              <FieldTitleLabel>Return Reason</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter the reason for return"
                onChange={(e) =>
                  setReturnData({ ...returnData, returnReason: e.target.value })
                }
              />
            </div>
            <div>
              <FieldTitleLabel>Return Status</FieldTitleLabel>
              <InputHolder
                type="text"
                value={returnData.returnStatus}
                readOnly
              />
            </div>
            {/* Add fields for any other return-related information */}
          </FieldContainer>

          <ButtonsContainer>
            <CloseButton onClick={() => setIsAddPopUpOpen(false)}>Close</CloseButton>
            <Button type="submit">Save</Button>
          </ButtonsContainer>
        </form>
      </PopupContent>
    </PopupOverlay>
  );
};

export default ReturnComponent;
