import React, { useEffect, useState } from "react";
import {
  Button,
  Select,
  LabelContainer,
  Label,
  Option,
  FieldContainer,
  CloseButton,
  ButtonsContainer,
  PopupOverlay,
  PopupContent,
  HeaderTitle,
  FieldTitleLabel,
  InputHolder,
} from "@/styled-components/ItemActionModal";

const EditAttributeComponent = ({ onClose, fetchAttributes }) => {
  const [attribute, setAttribute] = useState({
    attribute_name: "",
    requires_additional_value: false,
    input_type: "none",
    values: [],
  });

  //   useEffect(() => {
  //     fetchAttributeData();
  //   }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(attribute);
    editAttribute(attribute, attributeID)
      .then((res) => {
        console.log(res);
        fetchAttributes();
      })
      .then(() => {});
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <form>
          <HeaderTitle>Edit Attribute</HeaderTitle>
          <FieldContainer>
            <LabelContainer first>
              <Label>Attribute Information</Label>{" "}
            </LabelContainer>
            <div>
              <FieldTitleLabel notFirst>Attribute Name</FieldTitleLabel>
              <InputHolder
                type="text"
                onChange={(e) =>
                  setAttribute({ ...attribute, attribute_name: e.target.value })
                }
                value={attribute.attribute_name}
              />
            </div>
            <div>
              <FieldTitleLabel notFirst>
                Requires Additional Value
              </FieldTitleLabel>
              <Select
                value={attribute.requires_additional_value}
                onChange={(e) => {
                  // setAttribute({ ...attribute, requires_additional_value: e.target.value === "true" });

                  if (e.target.value == "true") {
                    setAttribute({
                      ...attribute,
                      requires_additional_value: e.target.value === "true",
                      input_type: "number",
                    });
                  } else {
                    setAttribute({
                      ...attribute,
                      requires_additional_value: e.target.value === "true",
                      input_type: "none",
                    });
                  }
                }}
              >
                <Option value="true">Yes</Option>
                <Option value="false">No</Option>
              </Select>
            </div>
            {attribute.requires_additional_value && (
              <div>
                <FieldTitleLabel notFirst>
                  Additional Value Type
                </FieldTitleLabel>

                <Select
                  value={attribute.input_type}
                  onChange={(e) =>
                    setAttribute({ ...attribute, input_type: e.target.value })
                  }
                >
                  <Option value="number">Number</Option>
                  <Option value="string">String</Option>
                </Select>
              </div>
            )}

            <LabelContainer first>
              <Label>Choices</Label>
            </LabelContainer>
            <div>
              <FieldTitleLabel notFirst> Name</FieldTitleLabel>
              <InputHolder type="text" />

              <Button type="button">Add</Button>
            </div>

            {/* <div>
              {attribute.values.map((value, index) => (
                <div key={index}>
                  <FieldTitleLabel notFirst>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => deleteValue(index)}
                    />{" "}
                    {value}
                  </FieldTitleLabel>
                </div>
              ))}
            </div> */}
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

export default EditAttributeComponent;
