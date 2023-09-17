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

import { editSupplier, getSuppliers } from "@/api/supplier";

const EditSupplierComponent = ({ supplierID, onClose, fetchSuppliers }) => {
  const [supplier, setSupplier] = useState({
    supplier_name: "",
    supplier_address: "",
    supplier_phone: "",
    supplier_email: "",
  });

  useEffect(() => {
    fetchSupplierData();
  }, []);
  useEffect(() => {
    console.log(supplier);
  }, [supplier]);

  const fetchSupplierData = async () => {
    try {
      const supplierData = await getSuppliers(supplierID);
      setProduct(supplierData.supplier);
      console.log(supplier);
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

  return (
    <PopupOverlay>
      <PopupContent>
        <form
          onSubmit={(e) => handleFormSubmit(e)}
          enctype="multipart/form-data"
        >
          <FieldContainer>
            <HeaderTitle>Edit Supplier {supplier.supplier_name}</HeaderTitle>

            <LabelContainer first>
              <Label>General Information</Label>{" "}
            </LabelContainer>
            <div>
              <FieldTitleLabel> Supplier Name </FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter new Supplier Name"
                onChange={(e) => {
                  setSupplier({ ...supplier, supplier_name: e.target.value });
                }}
                required
                value={supplier.supplier_name}
              />

              <FieldTitleLabel> Supplier Address </FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter new Supplier Address "
                onChange={(e) => {
                  setSupplier({
                    ...supplier,
                    supplier_address: e.target.value,
                  });
                }}
                value={supplier.supplier_address}
              />

              <FieldTitleLabel> Supplier Phone No.</FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Enter new Supplier Phone no. "
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

export default EditSupplierComponent;
