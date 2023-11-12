import { PaginationControl } from "@/styled-components/ItemActionModal";
import { useState, useEffect } from "react";

const Pagination = ({ totalItems, currentPage, onPageChange, setItemsPerPage, itemsPerPage }) => {
	const itemsPerPageOptions = [5, 10, 20]; // Customize with your desired options

	useEffect(() => {
		// Reset to the first page when changing the number of items per page
		onPageChange(1);
	}, [itemsPerPage]);

	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const handlePageChange = (page) => {
		if (page >= 1 && page <= totalPages) {
			onPageChange(page);
		}
	};

	const handleItemsPerPageChange = (e) => {
		setItemsPerPage(parseInt(e.target.value, 10));
	};

	return (
		<>
			{totalPages > 1 && (
				<PaginationControl>
					<button onClick={() => handlePageChange(Math.max(currentPage - 1, 1))} disabled={currentPage === 1}>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M12.5 5L7.5 10L12.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
						</svg>
					</button>

					{[...Array(totalPages)].map((_, index) => (
						<button key={index} onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? "active" : ""}>
							{index + 1}
						</button>
					))}

<<<<<<< HEAD
        
        </PaginationControl>
      )}
          <div>
            Show{" "}
            <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>{" "}
            rows per page
          </div>
    </>
  );
=======
					<button onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages}>
						<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
						</svg>
					</button>

					{/* Add the dropdown for items per page here */}
				</PaginationControl>
			)}

			<div>
				Show
				<select value={itemsPerPage} onChange={handleItemsPerPageChange}>
					{itemsPerPageOptions.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
				rows per page
			</div>
		</>
	);
>>>>>>> dff09cf7a72cf5b2dfc0642d987b56967d411afa
};

export default Pagination;
