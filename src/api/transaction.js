export const getTransactions = async (product) => {
	try {
		const response = await fetch("/api/transactions", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addTransaction = async (transaction) => {
	try {
		const response = await fetch("/api/transactions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-source-page": "/dashboard/pos",
			},
			body: JSON.stringify(transaction),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addTransactionByUser = async (transaction) => {
	try {
		const response = await fetch("/api/transactions/online", {
			method: "POST",
			body: transaction,
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getTransaction = async (id) => {
	try {
		const response = await fetch("/api/transactions/" + id, {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getCustomerTransaction = async () => {
	try {
		const response = await fetch("/api/transactions/orders", {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};

export const getAllTransactions = async () => {
	try {
		const response = await fetch("/api/transactions/all", {
			method: "GET",
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {}
};

export const setTransactionStatus = async (id, status) => {
	try {
		const response = await fetch(`/api/transactions/${id}/status`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ status: status }),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const acceptTransaction = async (id) => {
	try {
		const response = await fetch(`/api/transactions/accept/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const requestForCancelTransaction = async (id, notes, contact) => {
	try {
		const response = await fetch(`/api/transactions/request/cancel/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ reason: notes, contact_number: contact }),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const acceptCancelTransaction = async (id) => {
	try {
		const response = await fetch(`/api/transactions/accept/cancel/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const requestOrderReturnRefund = async (id, notes, contact) => {
	try {
		const response = await fetch(`/api/transactions/request/returnRefund/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ reason: notes, contact_number: contact }),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const acceptOrderReturnRefund = async (id) => {
	try {
		const response = await fetch(`/api/transactions/accept/returnRefund/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const reportOrder = async (id, notes, contact) => {
	try {
		const response = await fetch(`/api/transactions/report/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ reason: notes, contact_number: contact }),
			credentials: "include",
		});

		const data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
