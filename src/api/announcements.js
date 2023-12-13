export const getAllAnnouncements = async () => {
	try {
		const res = await fetch("/api/announcements/all", {
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
			body: announcement,
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
		const res = await fetch("/api/announcements/" + aannouncement.announcement_id, {
			method: "PUT",
			body: announcement,
			credentials: "include",
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
	}
};
