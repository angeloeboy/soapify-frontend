import React, { useState } from "react";
import { TransactionContext } from "./pos.context";

export const TransactionProvider = ({ children }) => {
	const [items, setItems] = useState([]);
	const [total, setTotal] = useState(0);
	const [paymentMethod, setPaymentMethod] = useState(null);
	// ... Any other states you want

	return <TransactionContext.Provider value={{ items, setItems, total, setTotal, paymentMethod, setPaymentMethod }}>{children}</TransactionContext.Provider>;
};
