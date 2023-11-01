import {
  Button,
  LabelContainer,
  Label,
  FieldContainer,
  CloseButton,
  ButtonsContainer,
  PopupOverlay,
  PopupContent,
  HeaderTitle,
  FieldTitleLabel,
  InputHolder,
} from "@/styled-components/ItemActionModal";
import { useEffect, useState } from "react";

import { editSupplier, getSupplier } from "@/api/supplier";

const EditSupplier = ({ supplierID, onClose, fetchSuppliers }) => {
  const [supplier, setSupplier] = useState({
    supplier_name: "",
    supplier_address: "",
    supplier_phone: "",
    supplier_email: "",
    supplier_status: true,
  });

  useEffect(() => {
    fetchSupplierData();
  }, []);

  useEffect(() => {
    console.log(supplier);
  }, [supplier]);

  const fetchSupplierData = async () => {
    try {
      const res = await getSupplier(supplierID);
      setSupplier(res.supplier);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Append fields to formData for editing
    console.log(supplier);
    editSupplier(supplier, supplierID)
      .then((res) => {
        console.log(res);
        fetchSuppliers();
      })
      .then(() => {});
  };

  const editSupplierFunc = async (e) => {
    e.preventDefault();
    const res = await editSupplier(supplier, supplierID);
    res ? fetchSuppliers() : null;
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <form
          onSubmit={(e) => editSupplierFunc(e)}
          enctype="multipart/form-data"
        >
          <FieldContainer>
            <HeaderTitle>Edit Supplier {supplier.supplier_name}</HeaderTitle>

            <LabelContainer first>
              <Label>General Information</Label>{" "}
            </LabelContainer>
            <div>
              <FieldTitleLabel>Name </FieldTitleLabel>
              <InputHolder
                type="text"
                onChange={(e) => {
                  setSupplier({ ...supplier, supplier_name: e.target.value });
                }}
                required
                value={supplier.supplier_name}
              />

              <FieldTitleLabel>Address </FieldTitleLabel>
              <InputHolder
                type="text"
                onChange={(e) => {
                  setSupplier({
                    ...supplier,
                    supplier_address: e.target.value,
                  });
                }}
                value={supplier.supplier_address}
              />

              <FieldTitleLabel> Phone No.</FieldTitleLabel>
              <InputHolder
                type="text"
                onChange={(e) => {
                  setSupplier({
                    ...supplier,
                    supplier_phone: e.target.value,
                  });
                }}
                value={supplier.supplier_phone}
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

export default EditSupplier;
