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

export const editBusinessDays = async (data) => {
	try {
		const res = await fetch("/api/siteSettings", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {}
};
