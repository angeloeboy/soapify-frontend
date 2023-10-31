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
import { editProduct, getProductCategories } from "@/api/products";

const EditCategory = ({ category_id, onClose, fetchCategories }) => {
  const [category, setCategory] = useState({
    name: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Append fields to formData for editing
    console.log(category);
    getProductCategories(category, category_id)
      .then((res) => {
        console.log(res);
        fetchCategories();
      })
      .then(() => {});
  };
  return (
    <PopupOverlay>
      <PopupContent>
        <form
          onSubmit={(e) => handleFormSubmit(e)}
          enctype="multipart/form-data"
        >
          <FieldContainer>
            <HeaderTitle>Edit Category</HeaderTitle>

            <LabelContainer first>
              <Label>General Information</Label>{" "}
            </LabelContainer>
            <div>
              <FieldTitleLabel> Category Name </FieldTitleLabel>
              <InputHolder
                type="text"
                onChange={(e) => {
                  setCategory({ ...category, name: e.target.value });
                }}
                // required
                // value={category.name}
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

export default EditCategory;
