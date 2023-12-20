export const getBusinessDays = async () => {
	try {
		const res = await fetch("/api/siteSettings/businessDays", {
			method: "GET",
			credentials: "include",
		});

		const data = await res.json();

		return data;
	} catch (error) {
		console.log("error:", error);
	}
};

export const editBusinessDays = async (days) => {
	try {
		const res = await fetch("/api/siteSettings/businessDays", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ business_days: days }),
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const editTermsAndConditions = async (terms) => {
	try {
		const res = await fetch("/api/siteSettings/termsAndConditions", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ terms_and_conditions_text: terms }),
		});

		const data = await res.json();
		return data;
	} catch (error) {}
};

export const getTermsAndConditions = async () => {
	try {
		const res = await fetch("/api/siteSettings/termsAndConditions", {
			method: "GET",
			credentials: "include",
		});

		const data = await res.json();

		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getCancellationLimit = async () => {
	try {
		const res = await fetch("/api/siteSettings/cancellationLimit", {
			method: "GET",
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {}
};

export const editCancellationLimit = async (limit) => {
	try {
		const res = await fetch("/api/siteSettings/cancellationLimit", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
			body: JSON.stringify({ cancellation_limit: limit }),
		});

		const data = await res.json();
		return data;
	} catch (error) {}
};
