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
  import { addRefund, getProducts } from "@/api/products"; // Replace "addProduct" and "addInventory" with appropriate refund-related API functions
  
  const AddRefundComponent = ({ setIsAddPopUpOpen, getRefundsFunc }) => {
    const currentDate = new Date().toISOString();
  
    const [refund, setRefund] = useState({
      product_id: 0, // Update to reflect the structure of refund data
      quantity: 1,
      date_added: currentDate,
      date_updated: currentDate,
      customerInfo: "", // Add customer information field
      refundAmount: 0.0, // Add refund amount field
      reasonForRefund: "", // Add reason for refund field
      // Add any other refund-related fields you need
    });
  
    const [products, setProducts] = useState([]);
  
    useEffect(() => {
      console.log(refund);
    }, [refund]);
  
    const fetchProducts = () => {
      getProducts().then((res) => {
        console.log(res);
        res ? setProducts(res.products) : setProducts([]);
        if (res.products.length > 0) {
          setRefund({ ...refund, product_id: res.products[0].product_id });
        }
      });
    };
  
    const addRefundFunc = async (e) => {
      e.preventDefault();
      await addRefund(refund).then((res) => {
        console.log(res);
      });
  
      await getRefundsFunc();
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    return (
      <PopupOverlay>
        <PopupContent>
          <form onSubmit={(e) => addRefundFunc(e)}>
            <HeaderTitle>Add Refund</HeaderTitle>
            <FieldContainer>
              <LabelContainer first>
                <Label>Customer Information</Label>
              </LabelContainer>
              <div>
                <FieldTitleLabel>Customer Information</FieldTitleLabel>
                <Select
                  value={refund.product_id}
                  onChange={(e) => setRefund({ ...refund, product_id: e.target.value })}
                >
                  {products.map((product) => {
                    return (
                      <Option value={product.product_id} key={product.product_id}>
                        {product.product_name}
                      </Option>
                    );
                  })}
                </Select>
              </div>
              <div>
                <FieldTitleLabel>Product Name</FieldTitleLabel>
                <InputHolder
                  type="number"
                  placeholder="Enter the quantity"
                  onChange={(e) => setRefund({ ...refund, quantity: e.target.value })}
                  value={refund.quantity}
                />
              </div>
              <div>
                <FieldTitleLabel>Date of Purchased</FieldTitleLabel>
                <InputHolder
                  type="date"
                  placeholder="Enter the date received"
                  onChange={(e) => setRefund({ ...refund, date_added: e.target.value })}
                />
              </div>
              <div>
                <FieldTitleLabel>Refund Amount</FieldTitleLabel>
                <InputHolder
                  type="number"
                  placeholder="Enter the refund amount"
                  onChange={(e) => setRefund({ ...refund, refundAmount: e.target.value })}
                />
              </div>
              <div>
                <FieldTitleLabel>Reason for Refund</FieldTitleLabel>
                <InputHolder
                  type="text"
                  placeholder="Enter the reason for refund"
                 />
              </div>
              {/* Add fields for any other refund-related information */}
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
  
  export default AddRefundComponent;
  