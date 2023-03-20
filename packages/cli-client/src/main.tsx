import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "sonner";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import EnginesContextProvider from "./contexts/engines";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<EnginesContextProvider>
				<Toaster />
				<main className="max-w-3xl mx-auto">
					<App />
				</main>
			</EnginesContextProvider>
		</ReduxProvider>
	</React.StrictMode>,
);
