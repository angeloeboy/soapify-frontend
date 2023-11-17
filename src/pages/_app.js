import { PermissionsProvider } from "@/components/context/PermissionsContext";
import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AppProvider } from "@/components/context/AppContext";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
	return (
		<PermissionsProvider>
			<AppProvider>
			
				<Component {...pageProps} />
			
			</AppProvider>
		</PermissionsProvider>
	);
}
