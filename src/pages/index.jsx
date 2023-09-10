import { useState } from "react";
import { useRouter } from "next/router";

import DashboardLayout from "@/components/misc/dashboardLayout";

const Home = () => {
	const [searchQuery, setSearchQuery] = useState("");
	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const router = useRouter();

	return <DashboardLayout></DashboardLayout>;
};

export default Home;
