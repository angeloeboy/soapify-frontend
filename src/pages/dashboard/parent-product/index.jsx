import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faPen, faTrash, faXmarkCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import PaymentMethodSearchBar from "@/components/PaymentMethod/paymentMethodSearchBar";
import { getPaymentMethods } from "@/api/pos";
import PdfExporter from "@/components/misc/pdfExporter";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import EditPayment from "../../../components/PaymentMethod/editPayment";
import AddPayment from "@/components/PaymentMethod/addPayment";
import LoadingSkeleton from "@/components/misc/loadingSkeleton";
import Pagination from "@/components/misc/pagination";
import { activatePaymentMethod, deactivatePaymentMethod } from "@/api/payment_method";
import { toast } from "react-toastify";
import { deleteParentProduct, getParentProduct } from "@/api/parent_product";
import ParentProductSearchBar from "@/components/parent-product/parentProductSearchBar";
import AddParentProduct from "@/components/parent-product/addParentProduct";

const ParentProduct = () => {
	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isEditPaymentOpen, setEditPaymentOpen] = useState(false);
	const [isAddPaymentOpen, setAddPaymentOpen] = useState(false);

	const [parentProduct, setParentProduct] = useState([]);
	const [parentProductDisplay, setParentProductDisplay] = useState([]);
	const [parentProductLoading, setParentProductLoading] = useState(false);

	const [isEditParentProductOpen, setEditParentProductOpen] = useState(false);
	const [isAddParentProductOpen, setAddParentProductOpen] = useState(false);

	const [clickedId, setClickedId] = useState(null);

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = currentPage * itemsPerPage;
	const paginatedOParentProduct = parentProductDisplay.slice(startIndex, endIndex);

	useEffect(() => {
		fetchParentProducts();
	}, []);

	const fetchParentProducts = async () => {
		setParentProductLoading(true);

		const res = await getParentProduct();
		console.log(res);

		if (res.status === "Success") {
			setParentProduct(res.parentProducts);

			setParentProductDisplay(res.parentProducts || []);
		}

		setParentProductLoading(false);
	};

	const handleClickOutside = (event) => {
		if (!event.target.closest(".action-container") && !event.target.closest(".ellipsis")) {
			setActiveActionContainer(null);
		}
	};

	const deleteParentProductFunc = async (id) => {
		const res = await deleteParentProduct(id);

		if (res.status === "Success") {
			toast.success("Parent Product Deleted Successfully");
			fetchParentProducts();
		}

		if (res.status === "Error") {
			toast.error(res.message);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<DashboardLayout>
			<PageTitle title="Parent Products" />
			<StyledPanel>
				{/* <PaymentMethodSearchBar fetchPaymentMethods={fetchPaymentMethods} setAddPaymentOpen={setAddPaymentOpen} /> */}
				<ParentProductSearchBar
					setParentProductDisplay={setParentProductDisplay}
					parentProducts={parentProduct}
					setCurrentPage={setCurrentPage}
					setAddParentProductOpen={setAddParentProductOpen}
				/>

				<Table>
					<tbody>
						<TableRows $heading>
							<TableHeadings>Name</TableHeadings>
							<TableHeadings>Number of Products</TableHeadings>
							<TableHeadings>Status</TableHeadings>

							<TableHeadings>Actions</TableHeadings>
						</TableRows>

						{parentProduct.length === 0
							? parentProductLoading && <LoadingSkeleton columns={3} />
							: paginatedOParentProduct.map((parentProduct, index) => (
									<TableRows key={index}>
										<TableData>{parentProduct.name}</TableData>
										<TableData>10</TableData>
										<TableData>{parentProduct.isActive ? "Active" : "Inactive"}</TableData>

										<TableData>
											<FontAwesomeIcon
												className="ellipsis"
												icon={faEllipsis}
												onClick={() => (activeActionContainer === index ? setActiveActionContainer(-1) : setActiveActionContainer(index))}
											/>

											{activeActionContainer === index && (
												<ActionContainer onClick={() => setActiveActionContainer(-1)}>
													<p
														onClick={() => {
															// setClickedId(method.payment_method_id);
															// openEditPayment();
														}}
													>
														<FontAwesomeIcon icon={faPen} /> Edit
													</p>
													<p onClick={() => deleteParentProductFunc(parentProduct.parent_product_id)}>
														<FontAwesomeIcon icon={faTrash} /> Delete
													</p>
												</ActionContainer>
											)}
										</TableData>
									</TableRows>
							  ))}
					</tbody>
				</Table>
				<Pagination
					setItemsPerPage={setItemsPerPage}
					totalItems={parentProductDisplay.length}
					itemsPerPage={itemsPerPage} //   this is correct
					currentPage={currentPage}
					onPageChange={setCurrentPage}
				/>
			</StyledPanel>
			{isAddParentProductOpen && <AddParentProduct setAddParentProductOpen={setAddParentProductOpen} fetchParentProducts={fetchParentProducts} />}
			{isAddPaymentOpen && <AddPayment setAddPaymentOpen={setAddPaymentOpen} fetchPaymentMethods={fetchPaymentMethods} />}
		</DashboardLayout>
	);
};

export default ParentProduct;
