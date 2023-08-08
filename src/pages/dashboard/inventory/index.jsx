import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/pageTitle";
import StyledPanel from "@/components/styled-components/StyledPanel";
import { getProducts } from "@/api/products";
import Table, { TableData, TableHeadings, TableRows, Status } from "@/components/styled-components/TableComponent";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [activeActionContainer, setActiveActionContainer] = useState(-1);

  useEffect(() => {
    getProducts().then((res) => {
      if (res) {
        setProducts(res.products);
      } else {
        setProducts([]);
      }
      setProductsLoading(false);
    });
  }, []);

  const handleClickOutside = (event) => {
    if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
      setActiveActionContainer(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <PageTitle title="Products" />
      <StyledPanel>
        <Table>
          <tbody>
            <TableRows heading>
              <TableHeadings>Name</TableHeadings>
              <TableHeadings>ID</TableHeadings>
              <TableHeadings>Stock</TableHeadings>
              <TableHeadings>Price</TableHeadings>
              <TableHeadings>Status</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {products.length === 0 ? (
              productsLoading ? (
                // Placeholder for loading
                <tr>
                  <TableData colSpan={6}>Loading...</TableData>
                </tr>
              ) : (
                // Add Product button when no products
                <tr>
                  <TableData colSpan={6}>
                    <button>Add Product</button>
                  </TableData>
                </tr>
              )
            ) : (
              products.map((product, index) => (
                <TableRows key={product.product_id}>
                  <TableData bold withImage>
                    <Image src="/product_img.png" alt="My Image" width="40" height="40" /> {product.product_name}
                  </TableData>
                  <TableData>{product.product_id}</TableData>
                  <TableData>{product.quantity_in_stock}</TableData>
                  <TableData>{product.product_price}</TableData>
                  <TableData>
                    <Status bgColor={"rgba(255, 116, 116, 0.49)"} color={"#EA0000"}>
                      LOW
                    </Status>
                  </TableData>
                  <TableData>
                    <FontAwesomeIcon
                      className="ellipsis"
                      icon={faEllipsis}
                      onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
                    />
                    {activeActionContainer === index && (
                      <div className="action-container">
                        <p>
                          <FontAwesomeIcon icon={faPen} />
                          Edit
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </p>
                      </div>
                    )}
                  </TableData>
                </TableRows>
              ))
            )}
          </tbody>
        </Table>
      </StyledPanel>
    </div>
  );
};

export default Products;
