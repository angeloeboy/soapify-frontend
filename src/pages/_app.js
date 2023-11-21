import { PermissionsProvider } from "@/components/context/PermissionsContext";
import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AppProvider } from "@/components/context/AppContext";
import { UserAppProvider } from "@/components/context/UserAppContext";
import { WebSocketProvider } from "@/components/context/WebsocketContext";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
	return (
		<WebSocketProvider>
			<PermissionsProvider>
				<UserAppProvider>
					<AppProvider>
						<Component {...pageProps} />
					</AppProvider>
				</UserAppProvider>
			</PermissionsProvider>
		</WebSocketProvider>
	);
}
