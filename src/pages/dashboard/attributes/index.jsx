import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, {
  ActionContainer,
  TableData,
  TableHeadings,
  TableRows,
} from "@/styled-components/TableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import PaymentSearchBarComponent from "@/components/PaymentMethod/SearchBarPaymentMethod";
import { getPaymentMethods } from "@/api/pos";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EditPaymentMethodComponent from "./../../../components/PaymentMethod/editPaymentMethod";
import { getAttributes } from "@/api/attributes";
import AttributesSearchBarComponent from "@/components/attributes/searchBarAndFilters";
import AddAttributeComponent from "@/components/attributes/addAttributes";
import EditAttributeComponent from "@/components/attributes/editAttribute";

const PaymentTable = () => {
  const [activeActionContainer, setActiveActionContainer] = useState(-1);
  const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(false); // Define paymentMethodsLoading state variable

  const [attributes, setAttributes] = useState([]);
  const [attributesLoading, setAttributesLoading] = useState(false);
  const [attributesDisplay, setAttributesDisplay] = useState([]); // Define attributesDisplay state variable
  const [isEditAttributeOpen, setEditAttributeOpen] = useState(false); // Define isEditOpen state variable
  const [isPopUpOpen, setPopUpOpen] = useState(false);

  useEffect(() => {
    fetchAttributes();
  }, []);

  useEffect(() => {
    console.log(isPopUpOpen);
  }, [isPopUpOpen]);

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const closeEditAttribute = () => {
    setEditAttributeOpen(false);
  };
  const openEditAttribute = () => {
    setEditAttributeOpen(true);
  };

  const fetchAttributes = async () => {
    const res = await getAttributes();

    if (!res) {
      setAttributes([]);
      setAttributesDisplay([]);
      setAttributesLoading(false);
      return;
    }

    res.attributes ? setAttributes(res.attributes) : setAttributes([]);
    res.attributes
      ? setAttributesDisplay(res.attributes)
      : setAttributesDisplay([]);
    setAttributesLoading(false);
    console.log(res.attributes);
  };

  const [selectedAttribute, setSelectedAttribute] = useState(null);

  return (
    <DashboardLayout>
      <PageTitle title="Attributes" />
      <StyledPanel>
        {/* <PaymentSearchBarComponent searchQuery={searchQuery} handleSearchChange={handleSearchChange} handleOpenPopup={handleOpenPopup} /> */}
        <AttributesSearchBarComponent setPopUpOpen={setPopUpOpen} />

        <Table>
          <tbody>
            <TableRows heading>
              <TableHeadings>Attribute Name</TableHeadings>
              <TableHeadings>Choices</TableHeadings>
              <TableHeadings>Additional info?</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {attributes.length === 0
              ? paymentMethodsLoading &&
                Array.from({ length: 8 }, (_, index) => (
                  <TableRows key={index}>
                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                  </TableRows>
                ))
              : attributesDisplay.map((attribute, index) => (
                  <TableRows key={attribute.attribute_id}>
                    <TableData>{attribute.attribute_name}</TableData>
                    <TableData>{attribute.values.length}</TableData>

                    <TableData>
                      {attribute.requires_additional_value ? "Yes" : "No"}
                    </TableData>
                    <TableData>
                      <FontAwesomeIcon
                        className="ellipsis"
                        icon={faEllipsis}
                        onClick={() =>
                          activeActionContainer === index
                            ? setActiveActionContainer(-1)
                            : setActiveActionContainer(index)
                        }
                      />

                      {activeActionContainer === index && (
                        <ActionContainer
                          onClick={() => setActiveActionContainer(-1)}
                        >
                          <p
                            onClick={() => {
                              setSelectedAttribute(attribute);
                              openEditAttribute(selectedAttribute);
                            }}
                          >
                            <FontAwesomeIcon icon={faPen} /> Edit
                          </p>
                          <p>
                            <FontAwesomeIcon icon={faTrash} /> Delete
                          </p>
                        </ActionContainer>
                      )}
                    </TableData>
                  </TableRows>
                ))}
          </tbody>
        </Table>
      </StyledPanel>
      {isPopUpOpen && (
        <AddAttributeComponent
          setPopUpOpen={setPopUpOpen}
          fetchAttributes={fetchAttributes}
        />
      )}
      {isEditAttributeOpen && (
        <EditAttributeComponent onClose={closeEditAttribute} />
      )}
    </DashboardLayout>
  );
};

export default PaymentTable;
