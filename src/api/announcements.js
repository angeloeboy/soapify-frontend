export const getAllAnnouncements = async () => {
	try {
		const res = await fetch("/api/announcements/", {
			method: "GET",
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const addAnnouncement = async (announcement) => {
	try {
		const res = await fetch("/api/announcements/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(announcement),
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const deleteAnnouncement = async (id) => {
	try {
		const res = await fetch("/api/announcements/" + id, {
			method: "DELETE",
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const editAnnouncement = async (announcement) => {
	try {
		const res = await fetch("/api/announcements/" + announcement.announcement_id, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(announcement),
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
