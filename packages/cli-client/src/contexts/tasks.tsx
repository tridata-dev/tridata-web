import { generateId } from "@/lib/utils";
import { createContext, useCallback, useEffect } from "react";
import { useImmer } from "use-immer";

export enum TaskType {
	R_RUN = "Running R",
	PYTHON_RUN = "Running Python",
	SQL_RUN = "Running SQL",
	R_INIT = "Initializing R",
	PYTHON_INIT = "Initializing Python",
	SQL_INIT = "Initializing SQL",
	R_INSTALL = "Installing R Packages",
	PYTHON_INSTALL = "Installing Python Packages",
}

type Task = {
	id: string;
	duration: number;
	pending: boolean;
	type: TaskType;
	message?: string;
};
type TasksContextType = {
	tasks: Task[];
};
type TaskActionsContextType = {
	addTask: ({
		type,
		timerStart,
		message,
	}: { type: TaskType; timerStart?: number; message?: string }) => string;
	removeTask: (id: string) => void;
	hasTask: (type: TaskType) => boolean;
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

	const addTask = useCallback<TaskActionsContextType["addTask"]>(
		({ type, timerStart = 0, message }) => {
			const id = generateId();
			setTasks((draft) => {
				// init tasks should only be run once
				if (
					type === TaskType.R_INIT ||
					type === TaskType.PYTHON_INIT ||
					type === TaskType.SQL_INIT
				) {
					if (draft.findIndex((task) => task.type === type) !== -1) {
						return;
					}
				}
				draft.unshift({
					id,
					type,
					duration: timerStart,
					pending: draft.length === 0,
					message,
				});
			});
			return id;
		},
		[],
	);

	const removeTask = useCallback<TaskActionsContextType["removeTask"]>((id) => {
		setTasks((draft) => {
			const index = draft.findIndex((task) => task.id === id);
			if (index !== -1) {
				// remove the task and set the next task of the same type to pending
				const oldTaskType = draft[index].type;
				draft.splice(index, 1);
				if (draft.length > 0) {
					for (let i = draft.length - 1; i >= 0; i--) {
						if (draft[i].type === oldTaskType) {
							draft[i].pending = true;
							break;
						}
					}
				}
			}
		});
	}, []);

	const hasTask: TaskActionsContextType["hasTask"] = (type) => {
		return tasks.findIndex((task) => task.type === type) !== -1;
	};

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
		<TaskActionsContext.Provider value={{ addTask, removeTask, hasTask }}>
			<TasksContext.Provider value={{ tasks }}>
				{children}
			</TasksContext.Provider>
		</TaskActionsContext.Provider>
	);
}
