import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Toaster } from "sonner";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import EnginesContextProvider from "./contexts/engines";
import TasksContextProvider from "./contexts/tasks";
import PythonProvider from "./contexts/python";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<ReduxProvider store={store}>
		<TasksContextProvider>
			<EnginesContextProvider>
				<PythonProvider>
					<Toaster />
					<App />
				</PythonProvider>
			</EnginesContextProvider>
		</TasksContextProvider>
	</ReduxProvider>,
);
