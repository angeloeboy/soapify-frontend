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
import { getSuppliers } from "@/api/supplier";

const EditProductComponent = ({ productId, onClose, fetchProducts }) => {
  const [categories, setCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [product, setProduct] = useState({
    product_name: "",
    product_desc: "dfasdfasdfd",
    product_price: 0,
    category_id: 0,
    supplier_id: 0,
    subcategory_id: 0,
    quantity_in_stock: 0,
    minimum_reorder_level: 1,
    attributes: [],
  });

  useEffect(() => {
    fetchProductData();
    fetchProductCategories();
    fetchProductAttributes(); // Fetch attributes when the component mounts
  }, []);

  useEffect(() => {
    console.log(product);
  }, [product]);

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

  const fetchProductAttributes = async () => {
    try {
      const attributesData = await getProductAttributes(productId);
      setAttributes(attributesData.attributes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Append fields to formData for editing
    console.log(product);
    editProduct(product, productId)
      .then((res) => {
        console.log(res);
        fetchProducts();
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
          <HeaderTitle>Edit Product {product.product_name}</HeaderTitle>
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
              <Label>Attributes</Label>
            </LabelContainer>

            {attributes.map((attribute, index) => {
              return (
                <div key={attribute.attribute_id}>
                  <FieldTitleLabel notFirst>
                    {attribute.attribute_name}
                  </FieldTitleLabel>
                  <Select
                    value={product.attributes[index]?.attribute_value_id}
                    onChange={(e) => {
                      let newAttributes = [...product.attributes];
                      newAttributes[index].attribute_value_id = Number(
                        e.target.value
                      );
                      setProduct({ ...product, attributes: newAttributes });
                    }}
                  >
                    {attribute.values.map((attributeValue) => (
                      <Option
                        value={attributeValue.attribute_value_id}
                        key={attributeValue.attribute_value_id}
                      >
                        {attributeValue.attribute_value}
                      </Option>
                    ))}
                  </Select>
                </div>
              );
            })}

            <LabelContainer>
              <Label>Supplier</Label>
            </LabelContainer>
            <div>
              <FieldTitleLabel notFirst>Supplier</FieldTitleLabel>
              <Select
                value={product.supplier_id}
                onChange={(e) => {
                  setProduct({
                    ...product,
                    supplier_id: Number(e.target.value),
                  });
                }}
              >
                {suppliers.map((supplier) => (
                  <Option
                    value={supplier.supplier_id}
                    key={supplier.supplier_id}
                  >
                    {supplier.supplier_name}
                  </Option>
                ))}
              </Select>
            </div>
          </FieldContainer>

          <ButtonsContainer>
            <CloseButton onClick={onClose}>Close</CloseButton>
            <Button type="submit" onClick={(e) => handleFormSubmit(e)}>
              Save
            </Button>
          </ButtonsContainer>
        </form>
      </PopupContent>
    </PopupOverlay>
  );
};

export default EditProductComponent;
