import { PaginationControl } from "@/styled-components/ItemActionModal";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
	const totalPages = Math.ceil(totalItems / itemsPerPage);

	return (
		<PaginationControl>
			<button onClick={() => onPageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
				</svg>
			</button>

			{[...Array(totalPages)].map((_, index) => (
				<button key={index} onClick={() => onPageChange(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
					{index + 1}
				</button>
			))}

			<button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
				</svg>
			</button>
		</PaginationControl>
	);
};

export default Pagination;
