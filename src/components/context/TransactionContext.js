// TransactionContext.js
import React, { createContext, useState, useEffect } from "react";
import { getProduct, getProducts } from "@/api/products";
export const TransactionContext = createContext(null);

export const TransactionProvider = ({ children }) => {
	// ...state declarations
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [productDisplay, setProductDisplay] = useState([]);
	const [activeAction, setActiveAction] = useState("cart");

	const [transaction, setTransaction] = useState({
		payment_method_id: undefined,
		transaction_number: "",
		total_amount: 0,
		items: [],
	});

	const [num, setNum] = useState(0);

	// ...other states and useEffects

	useEffect(() => {
		const fetchProducts = async () => {
			const response = await getProducts();
			setProducts(response.products || []);
		};

		// Execute fetch operation
		fetchProducts();
		console.log("Is this being called?");
	}, []);

	// ...rest of your existing useEffects and functions like updateCart

	// Make sure to provide all necessary values and functions in your context
	return (
		<TransactionContext.Provider
			value={{
				// products,
				// setProducts,
				// cart,
				// setCart,
				// productDisplay,
				// setProductDisplay,
				// activeAction,
				// setActiveAction,
				// transaction,
				// setTransaction,
				// updateCart, // other functions and states that you want to expose
				num,
			}}
		>
			{children}
		</TransactionContext.Provider>
	);
};
