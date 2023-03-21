import { generateId } from "@/lib/utils";
import { createContext, useCallback, useEffect } from "react";
import { useImmer } from "use-immer";

export enum TaskType {
	R_RUN = "Running R",
	PYTHON_RUN = "Running Python",
	SQL_RUN = "Running SQL",
}

type Task = {
	id: string;
	duration: number;
	pending: boolean;
	type: TaskType;
};
type TasksContextType = {
	tasks: Task[];
};
type TaskActionsContextType = {
	addTask: (type: TaskType) => string;
	removeTask: (id: string) => void;
};

export const TasksContext = createContext<TasksContextType>(
	{} as TasksContextType,
);
export const TaskActionsContext = createContext<TaskActionsContextType>(
	{} as TaskActionsContextType,
);

export default function TasksContextProvider({
	children,
}: { children: React.ReactNode }) {
	const [tasks, setTasks] = useImmer<Task[]>([]);

	const addTask = useCallback((type: TaskType) => {
		const id = generateId();
		setTasks((draft) => {
			draft.unshift({
				id,
				type,
				duration: 1,
				pending: draft.length === 0,
			});
		});
		return id;
	}, []);

	const removeTask = useCallback((id: string) => {
		setTasks((draft) => {
			const index = draft.findIndex((task) => task.id === id);
			const oldTaskType = draft[index].type;
			if (index !== -1) {
				draft.splice(index, 1);
			}
			if (draft.length > 0) {
				for (let i = draft.length - 1; i >= 0; i--) {
					if (draft[i].type === oldTaskType) {
						draft[i].pending = true;
						break;
					}
				}
			}
		});
	}, []);

	useEffect(() => {
		let timer: NodeJS.Timeout | undefined;
		if (tasks.length > 0) {
			timer = setTimeout(() => {
				setTasks((draft) => {
					draft.forEach((task) => {
						if (task.pending) {
							task.duration += 1;
						}
					});
				});
			}, 1000);
		} else {
			if (timer) {
				clearTimeout(timer);
			}
		}

		return () => {
			clearTimeout(timer);
		};
	}, [tasks]);

	return (
		<TaskActionsContext.Provider value={{ addTask, removeTask }}>
			<TasksContext.Provider value={{ tasks }}>
				{children}
			</TasksContext.Provider>
		</TaskActionsContext.Provider>
	);
}
