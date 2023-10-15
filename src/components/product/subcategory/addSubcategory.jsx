import React, { useEffect, useState } from "react";
import {
  Button,
  FieldContainer,
  CloseButton,
  ButtonsContainer,
  PopupOverlay,
  PopupContent,
  HeaderTitle,
  FieldTitleLabel,
  InputHolder,
} from "@/styled-components/ItemActionModal";

import { addSubcategory } from "@/api/subcategories"; // Import your API function for adding subcategories

const AddSubcategoryComponent = ({ onClose, onButtonClick, getSubcategoriesFunc }) => {
  const currentDate = new Date().toISOString();

  const [subcategory, setSubcategory] = useState({
    subcategory_name: "",
    date_created: currentDate,
    subcategory_id: 0, // Replace with appropriate logic to set subcategory ID
    // Add more fields related to subcategories here
  });

  useEffect(() => {
    console.log(subcategory);
  }, [subcategory]);

  const addSubcategoryFunc = async (e) => {
    e.preventDefault();
    await addSubcategory(subcategory).then((res) => {
      console.log(res);
    });

    await getSubcategoriesFunc(); // Fetch subcategories after adding a new one
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <form onSubmit={(e) => addSubcategoryFunc(e)}>
          <HeaderTitle>Add Subcategory</HeaderTitle>
          <FieldContainer>
            <div>
              <FieldTitleLabel>Subcategory Name</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter subcategory name"
                onChange={(e) => setSubcategory({ ...subcategory, subcategory_name: e.target.value })}
                value={subcategory.subcategory_name}
              />
            </div>
            <div>
              <FieldTitleLabel>Date Created</FieldTitleLabel>
              <InputHolder
                type="date"
                placeholder="Enter date created"
                onChange={(e) => setSubcategory({ ...subcategory, date_created: e.target.value })}
              />
            </div>
            <div>
              <FieldTitleLabel>Subcategory ID</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter subcategory ID"
                onChange={(e) => setSubcategory({ ...subcategory, subcategory_id: e.target.value })}
                value={subcategory.subcategory_id}
              />
            </div>
            {/* Add more fields related to subcategories here */}
          </FieldContainer>

          <ButtonsContainer>
            <CloseButton onClick={onClose}>Close</CloseButton>
            <Button type="submit">Save</Button>
          </ButtonsContainer>
        </form>
      </PopupContent>
    </PopupOverlay>
  );
};

export default AddSubcategoryComponent;
