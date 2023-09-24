import React, { useEffect, useState } from "react";
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

import { addAttribute, getAttributes } from "@/api/attributes"; // Import your API functions for attributes

const AddAttributeComponent = ({ onClose, onButtonClick, getAttributesFunc }) => {
  const currentDate = new Date().toISOString();

  const [attribute, setAttribute] = useState({
    product_id: 0, // Replace with the appropriate product ID
    attribute_name: "",
    requires_additional_value: false,
    value: "",
    date_created: currentDate,
    // Add more fields related to attributes here
  });

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    console.log(attribute);
  }, [attribute]);

  const fetchAttributes = () => {
    getAttributes().then((res) => {
      console.log(res);
      res ? setAttributes(res.attributes) : setAttributes([]);
      // You can set default values or handle attribute selection logic here
    });
  };

  const addAttributeFunc = async (e) => {
    e.preventDefault();
    await addAttribute(attribute).then((res) => {
      console.log(res);
    });

    await getAttributesFunc();
  };

  useEffect(() => {
    fetchAttributes();
  }, []);

  return (
    <PopupOverlay>
      <PopupContent>
        <form onSubmit={(e) => addAttributeFunc(e)}>
          <HeaderTitle>Add Attribute</HeaderTitle>
          <FieldContainer>
            <LabelContainer first>
              <Label>Attribute Information</Label>{" "}
            </LabelContainer>
            <div>
              <FieldTitleLabel notFirst>Attribute Name</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter attribute name"
                onChange={(e) => setAttribute({ ...attribute, attribute_name: e.target.value })}
                value={attribute.attribute_name}
              />
            </div>
            <div>
              <FieldTitleLabel notFirst>Requires Additional Value</FieldTitleLabel>
              <Select
                value={attribute.requires_additional_value}
                onChange={(e) => setAttribute({ ...attribute, requires_additional_value: e.target.value === "true" })}
              >
                <Option value="true">Yes</Option>
                <Option value="false">No</Option>
              </Select>
            </div>
            {attribute.requires_additional_value && (
              <div>
                <FieldTitleLabel notFirst>Value</FieldTitleLabel>
                <InputHolder
                  type="text"
                  placeholder="Enter value"
                  onChange={(e) => setAttribute({ ...attribute, value: e.target.value })}
                  value={attribute.value}
                />
              </div>
            )}
            <div>
              <FieldTitleLabel notFirst>Date Created</FieldTitleLabel>
              <InputHolder
                type="date"
                placeholder="Enter date created"
                onChange={(e) => setAttribute({ ...attribute, date_created: e.target.value })}
              />
            </div>
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

export default AddAttributeComponent;
