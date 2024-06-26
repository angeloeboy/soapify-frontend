export const getPromos = async () => {
	try {
		const res = await fetch("/api/promos", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const getPromo = async (promo_id) => {
	try {
		const res = await fetch(`/api/promos/${promo_id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addPromo = async (promo, product_ids) => {
	try {
		const res = await fetch("/api/promos", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(promo),
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const validatePromo = async (promoCode, items) => {
	try {
		const res = await fetch(`/api/promos/validate`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ promoCode, items }),
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deactivatePromo = async (promo_id) => {
	try {
		const res = await fetch(`/api/promos/deactivate/${promo_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const activatePromo = async (promo_id) => {
	try {
		const res = await fetch(`/api/promos/activate/${promo_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
