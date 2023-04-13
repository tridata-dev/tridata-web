import { Toaster } from "sonner";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store";
import EnginesContextProvider from "./contexts/engines";
import TasksContextProvider from "./contexts/tasks";
import PythonProvider from "./contexts/python";

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ReduxProvider store={store}>
			<TasksContextProvider>
				<EnginesContextProvider>
					<PythonProvider>
						<Toaster />
						{children}
					</PythonProvider>
				</EnginesContextProvider>
			</TasksContextProvider>
		</ReduxProvider>
	);
}
