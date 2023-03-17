import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ReduxProvider store={store}>
				<Toaster />
				<main className="max-w-3xl mx-auto">
					<App />
				</main>
			</ReduxProvider>
		</QueryClientProvider>
	</React.StrictMode>,
);
