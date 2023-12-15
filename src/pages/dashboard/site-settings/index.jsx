import DashboardLayout from "@/components/misc/dashboardLayout";
import MyEditor from "@/components/site-settings/MyEditor";
// import AboutTextEditor from "@/components/site-settings/aboutText";
import DaySelection from "@/components/site-settings/daySelection";
import RenderSlateContent from "@/components/site-settings/renderAbout";

const SiteSettings = () => {
	return (
		<DashboardLayout>
			<h2>Business Days</h2>
			<DaySelection />
			<MyEditor />
		</DashboardLayout>
	);
};

export default SiteSettings;
