import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DashboardLayout from "@/components/misc/dashboardLayout";
import StyledPanel from "@/styled-components/StyledPanel";
import PageTitle from "@/components/misc/pageTitle";
import Table, { ActionContainer, TableContainer, TableData, TableHeadings, TableRows } from "@/styled-components/TableComponent";
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
import { activatePaymentMethod, deactivatePaymentMethod, deletePaymentMethod } from "@/api/payment_method";
import ReactivateModal from "@/components/misc/reactivate";
import DeactivateModal from "@/components/misc/deactivate";
import { toast } from "react-toastify";
import DeleteModal from "@/components/misc/delete";

const PaymentTable = () => {
	const [paymentMethods, setPaymentMethods] = useState([]);
	const [paymentMethodsDisplay, setPaymentMethodsDisplay] = useState([]);
	const [paymentMethodsLoading, setPaymentMethodsLoading] = useState(false);

	const [activeActionContainer, setActiveActionContainer] = useState(-1);
	const [isEditPaymentOpen, setEditPaymentOpen] = useState(false);
	const [isAddPaymentOpen, setAddPaymentOpen] = useState(false);

	const [clickedId, setClickedId] = useState(null);
	const [selectedPaymentMethodId, setSelectedPaymentMethodId] = useState(null);
	const [clickedName, setClickedName] = useState(null);
	const [showDeactivate, setShowDeactivate] = useState(false);
	const [showReactivateModal, setShowReactivateModal] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const [filteredPayments, setFilteredPayments] = useState([]);

	useEffect(() => {
		fetchPaymentMethods();
	}, []);

	useEffect(() => {
		setPaymentMethodsDisplay(filteredPayments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
	}, [currentPage, filteredPayments, itemsPerPage]);

	const fetchPaymentMethods = () => {
		setPaymentMethodsLoading(true);

		getPaymentMethods().then((res) => {
			console.log(res);
			setPaymentMethods(res.paymentMethods);
			setPaymentMethodsLoading(false);

			setFilteredPayments(res.paymentMethods || []);
		});
	};

	const handleReactivateModal = (payment_method_id, name) => {
		setSelectedPaymentMethodId(payment_method_id);
		setClickedName(name);
		setShowReactivateModal(true);
	};

	const formatDateToMonthDayYear = (isoDate) => {
		const date = new Date(isoDate);
		const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		const month = monthNames[date.getUTCMonth()];
		const day = date.getUTCDate();
		const year = date.getUTCFullYear();

		return `${month} ${day}, ${year}`;
	};

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

	const openEditPayment = () => {
		setEditPaymentOpen(true);
	};

	const closeEditPayment = () => {
		setEditPaymentOpen(false);
	};
	const deactivatePaymentMethodFunc = async (payment_method_id) => {
		const res = await deactivatePaymentMethod(payment_method_id);
		console.log(res);

		if (!res) {
			toast.error("Something went wrong");
			return;
		}

		if (res.errors) {
			toast.error(res.errors[0].message);
			return;
		}
		toast.success(res.message);
		fetchPaymentMethods();
	};

	const activatePaymentMethodFunc = async (payment_method_id) => {
		const res = await activatePaymentMethod(payment_method_id);
		console.log(res);

		if (!res) {
			toast.error("Something went wrong");
			return;
		}

		if (res.errors) {
			toast.error(res.errors[0].message);
			return;
		}

		toast.success(res.message);

		fetchPaymentMethods();
	};

	const deletePaymentMethodFunc = async (payment_method_id) => {
		const res = await deletePaymentMethod(payment_method_id);
		console.log(res);

		if (!res) {
			toast.error("Something went wrong");
			return;
		}

		if (res.errors) {
			toast.error(res.errors[0].message);
			return;
		}
		toast.success(res.message);

		fetchPaymentMethods();
	};

	return (
		<DashboardLayout>
			<PageTitle title="Payment" />
			<StyledPanel>
				<PaymentMethodSearchBar
					fetchPaymentMethods={fetchPaymentMethods}
					setAddPaymentOpen={setAddPaymentOpen}
					paymentMethods={paymentMethods}
					setPaymentMethodDisplay={setPaymentMethodsDisplay}
					setCurrentPage={setCurrentPage}
				/>

				<TableContainer>
					<Table id="payment-table">
						<tbody>
							<TableRows $heading>
								<TableHeadings>Payment Name</TableHeadings>
								<TableHeadings>Number/Account Number</TableHeadings>
								<TableHeadings>Created</TableHeadings>
								<TableHeadings>Status</TableHeadings>

								<TableHeadings>Actions</TableHeadings>
							</TableRows>

							{paymentMethods.length === 0
								? paymentMethodsLoading && <LoadingSkeleton columns={3} />
								: paymentMethodsDisplay.map((method, index) => (
										<TableRows key={index}>
											<TableData>{method.name}</TableData>
											<TableData>{method.account_no}</TableData>
											<TableData>{formatDateToMonthDayYear(method.createdAt)}</TableData>
											<TableData>{method.isActive ? "Active" : "Inactive"}</TableData>

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
																setClickedId(method.payment_method_id);
																openEditPayment();
															}}
														>
															<FontAwesomeIcon icon={faPen} /> Edit
														</p>

														<p
															onClick={() => {
																setShowDeleteModal(true);
																setClickedName(method.name);
																setSelectedPaymentMethodId(method.payment_method_id);
															}}
														>
															<FontAwesomeIcon icon={faTrash} /> Delete
														</p>
														{method.isActive ? (
															<p
																onClick={() => {
																	setShowDeactivate(true);
																	setClickedName(method.name);
																	setSelectedPaymentMethodId(method.payment_method_id);
																}}
															>
																<FontAwesomeIcon icon={faXmarkCircle} /> Deactivate
															</p>
														) : (
															<p onClick={() => handleReactivateModal(method.payment_method_id, method.name)}>
																<FontAwesomeIcon icon={faCheckCircle} /> Reactivate
															</p>
														)}
													</ActionContainer>
												)}
											</TableData>
										</TableRows>
								  ))}
						</tbody>
					</Table>
				</TableContainer>

				<PdfExporter tableId="payment-table" fileName="payment-methods.pdf" />
				<Pagination
					totalItems={filteredPayments.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={setCurrentPage}
					itemsPerPageOptions={[5, 10, 15, 20]}
					defaultItemsPerPage={10}
					setItemsPerPage={setItemsPerPage}
				/>
			</StyledPanel>
			{isEditPaymentOpen && <EditPayment onClose={closeEditPayment} paymentId={clickedId} fetchPaymentMethods={fetchPaymentMethods} />}
			{isAddPaymentOpen && <AddPayment setAddPaymentOpen={setAddPaymentOpen} fetchPaymentMethods={fetchPaymentMethods} />}

			{showDeactivate && (
				<DeactivateModal
					type="Payment Method"
					text={clickedName}
					close={setShowDeactivate}
					confirm={() => deactivatePaymentMethodFunc(selectedPaymentMethodId)}
				/>
			)}

			{showReactivateModal && (
				<ReactivateModal
					type="Payment Method"
					text={clickedName}
					close={() => setShowReactivateModal(false)}
					confirm={() => {
						activatePaymentMethodFunc(selectedPaymentMethodId);
						setShowReactivateModal(false);
					}}
				/>
			)}

			{showDeleteModal && (
				<DeleteModal
					type="payment method"
					text={clickedName}
					close={setShowDeactivate}
					confirm={() => {
						deletePaymentMethodFunc(selectedPaymentMethodId);
						setShowDeleteModal(false);
					}}
				/>
			)}
		</DashboardLayout>
	);
};

export default PaymentTable;
import cookie, { parse } from "cookie";
export async function getServerSideProps(context) {
	const { req } = context;
	const parsedCookies = cookie.parse(req.headers.cookie || "").permissions;

	if (!parsedCookies.includes("View Payment Methods:payment_methods")) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	return {
		props: {
			permissions: parsedCookies ? JSON.parse(parsedCookies) : [],
		}, // will be passed to the page component as props
	};
}
