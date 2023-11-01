import TopBar from "@/components/misc/topbar";
import DashboardLayout from "@/components/misc/dashboardLayout";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
  faEllipsis,
  faFilter,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import PageTitle from "@/components/misc/pageTitle";
import TableControlPanel from "@/styled-components/TableControlPanel";
import StyledPanel from "@/styled-components/StyledPanel";
import { useEffect, useState } from "react";
import { addProduct, getProductCategories, getProducts } from "@/api/products";

import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Table, {
  ActionContainer,
  TableData,
  TableHeadings,
  TableRows,
  Status,
} from "@/styled-components/TableComponent";
import { Button } from "@/styled-components/ItemActionModal";

import CategoriesSearchBar from "@/components/product/categories/categoriesSearchBar";
import AddCategories from "./../../../components/product/categories/addCategories";
import EditCategory from "@/components/product/categories/editCategory";
const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [categoriesDisplay, setCategoriesDisplay] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [isAddPopUpOpen, setIsAddPopUpOpen] = useState(false);
  const [isEditCategoryOpen, setEditCategoryOpen] = useState(false);
  const [activeActionContainer, setActiveActionContainer] = useState(-1);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    getProductCategories().then((res) => {
      console.log(res);
      res.categories
        ? setCategoriesDisplay(res.categories)
        : setCategoriesDisplay([]);
      res.categories ? setCategories(res.categories) : setCategories([]);
      setCategoriesLoading(false);
    });
  };

  const openEditPopUp = (category_id) => {
    setEditCategoryOpen(true);
  };
  const closeEditPopUp = () => {
    setEditCategoryOpen(false);
  };

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <DashboardLayout>
      <PageTitle title="Category List" />

      <StyledPanel>
        <CategoriesSearchBar
          setIsAddPopUpOpen={setIsAddPopUpOpen}
          setCategoriesDisplay={setCategoriesDisplay}
          categories={categories}
        />

        <Table>
          <tbody>
            <TableRows $heading>
              <TableHeadings>Name</TableHeadings>
              <TableHeadings>Status</TableHeadings>
              <TableHeadings>Actions</TableHeadings>
            </TableRows>

            {categories.length === 0 ? (
              categoriesLoading ? (
                Array.from({ length: 8 }, (_, index) => (
                  <TableRows key={index}>
                    <TableData className="imgContainer">
                      <Skeleton circle={true} height={40} width={40} />
                    </TableData>

                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                    <TableData>
                      <Skeleton width={50} height={20} />
                    </TableData>
                  </TableRows>
                ))
              ) : (
                <p>No Categories found</p>
              )
            ) : (
              categoriesDisplay.map((category, index) => (
                <TableRows key={category.category_id}>
                  <TableData>{category.name}</TableData>

                  <TableData>
                    {category.isActive ? "Active" : "Not active"}
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
                            setSelectedCategory();
                            openEditPopUp(selectedCategory);
                          }}
                        >
                          <FontAwesomeIcon icon={faPen} />
                          Edit
                        </p>
                        <p>
                          <FontAwesomeIcon icon={faTrash} /> Delete
                        </p>
                      </ActionContainer>
                    )}
                  </TableData>
                </TableRows>
              ))
            )}
          </tbody>
        </Table>
      </StyledPanel>
      {isAddPopUpOpen && (
        <AddCategories
          setIsAddPopUpOpen={setIsAddPopUpOpen}
          fetchCategories={fetchCategories}
        />
      )}
      {isEditCategoryOpen && (
        <EditCategory
          onClose={closeEditPopUp}
          setEditCategoryOpen={setEditCategoryOpen}
        />
      )}
    </DashboardLayout>
  );
};

export default Categories;
