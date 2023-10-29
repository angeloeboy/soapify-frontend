import React, { useState } from "react";
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

const AddShelvingComponent = ({ setIsAddShelfPopupOpen, getShelvesFunc }) => {
  const [shelfData, setShelfData] = useState({
    shelfID: 0, // Replace with logic to generate a unique shelf ID
    shelfName: "",
    category: "",
    capacity: 0,
    currentItems: 0,
    status: "Active", // You can set the default status here
    description: "",
    // Add any other shelving-related fields you need
  });

  const addShelvingFunc = (e) => {
    e.preventDefault();
    // Implement the logic to add shelving data to your system/database here
    // Make an API call or update your state as needed
    // Then, call getShelvesFunc to refresh the shelf list

    // Example: Assume you have a function named 'addShelving' to add a shelf
    // await addShelving(shelfData).then((res) => {
    //   console.log(res);
    // });

    getShelvesFunc(); // Call this to refresh the shelf list
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <form onSubmit={addShelvingFunc}>
          <HeaderTitle>Add Shelving</HeaderTitle>
          <FieldContainer>
            <div>
              <FieldTitleLabel>Shelf ID</FieldTitleLabel>
              <InputHolder
                type="text"
                value={shelfData.shelfID}
                readOnly
              />
            </div>
            <div>
              <FieldTitleLabel>Shelf Name</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter shelf name"
                onChange={(e) =>
                  setShelfData({ ...shelfData, shelfName: e.target.value })
                }
              />
            </div>
            <div>
              <FieldTitleLabel>Category</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter category"
                onChange={(e) =>
                  setShelfData({ ...shelfData, category: e.target.value })
                }
              />
            </div>
            <div>
              <FieldTitleLabel>Capacity</FieldTitleLabel>
              <InputHolder
                type="number"
                placeholder="Enter shelf capacity"
                onChange={(e) =>
                  setShelfData({ ...shelfData, capacity: e.target.value })
                }
              />
            </div>
            <div>
              <FieldTitleLabel>Current Items</FieldTitleLabel>
              <InputHolder
                type="number"
                placeholder="Enter current items"
                onChange={(e) =>
                  setShelfData({ ...shelfData, currentItems: e.target.value })
                }
              />
            </div>
            <div>
              <FieldTitleLabel>Status</FieldTitleLabel>
              <InputHolder
                type="text"
                value={shelfData.status}
                readOnly
              />
            </div>
            <div>
              <FieldTitleLabel>Description</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter description"
                onChange={(e) =>
                  setShelfData({ ...shelfData, description: e.target.value })
                }
              />
            </div>
           </FieldContainer>

          <ButtonsContainer>
            <CloseButton onClick={() => setIsAddShelfPopupOpen(false)}>
              Close
            </CloseButton>
            <Button type="submit">Save</Button>
          </ButtonsContainer>
        </form>
      </PopupContent>
    </PopupOverlay>
  );
};

export default AddShelvingComponent;
