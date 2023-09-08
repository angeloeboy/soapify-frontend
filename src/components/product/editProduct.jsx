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

import { getProduct, editProduct, getProductCategories } from "@/api/products";

const EditProductComponent = ({ productId, onClose, GetProducts }) => {
  const [product, setProduct] = useState({
    product_name: "",
    product_desc: "",
    product_price: 0,
    category_id: 0,
    supplier_id: 0,
    quantity_in_stock: 0,
    minimum_reorder_level: 1,
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProductData();
    fetchProductCategories();
  }, []);

  const fetchProductData = async () => {
    try {
      const productData = await getProduct(productId);
      setProduct(productData.product);
      console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductCategories = async () => {
    try {
      const categoryData = await getProductCategories();
      setCategories(categoryData.categories);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Append fields to formData for editing

    editProduct(formData, productId)
      .then((res) => {
        console.log(res);
      })
      .then(() => {
        GetProducts();
        onClose(); // Close the modal after editing
      });
  };

  return (
    <PopupOverlay>
      <PopupContent>
        <form onSubmit={(e) => editProduct(e)} enctype="multipart/form-data">
          <HeaderTitle>
            Edit Product {product.product_name} stock:
            {product.quantity_in_stock}
          </HeaderTitle>
          <FieldContainer>
            <LabelContainer first>
              <Label>General Information</Label>{" "}
            </LabelContainer>
            <div>
              <FieldTitleLabel> Product Name </FieldTitleLabel>
              <InputHolder
                type="text"
                placeholder="Edit your Product Name"
                onChange={(e) => {
                  setProduct({ ...product, product_name: e.target.value });
                }}
                required
                value={product.product_name}
              />
            </div>
            <div>
              <FieldTitleLabel notFirst>Price</FieldTitleLabel>
              <InputHolder
                type="number"
                placeholder="Enter your Price"
                onChange={(e) => {
                  setProduct({
                    ...product,
                    product_price: parseInt(e.target.value, 10),
                  });
                }}
                required
                value={product.product_price}
              />
            </div>
            <div>
              <FieldTitleLabel notFirst>Minimum Stock</FieldTitleLabel>
              <InputHolder
                type="number"
                placeholder="Enter your minimum stock"
                onChange={(e) => {
                  setProduct({
                    ...product,
                    minimum_reorder_level: parseInt(e.target.value, 10),
                  });
                }}
                required
                value={product.minimum_reorder_level}
              />
            </div>
            <div>
              <FieldTitleLabel notFirst>Image (optional)</FieldTitleLabel>
              <ProfilePictureContainer>
                <Centered>
                  <input type="file" name="product_image" required />
                </Centered>
              </ProfilePictureContainer>
            </div>

            <LabelContainer>
              <Label>Category</Label>
            </LabelContainer>
            <div>
              <FieldTitleLabel notFirst>Category</FieldTitleLabel>
              <Select
                value={product.category_id}
                onChange={(e) => {
                  setProduct({ ...product, category_id: e.target.value });
                }}
              >
                {categories.map((category) => (
                  <Option value={category.id} key={category.id}>
                    {category.name}
                  </Option>
                ))}
              </Select>
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

export default EditProductComponent;