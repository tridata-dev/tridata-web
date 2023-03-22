import { useContext } from "react";
import { TaskActionsContext, TasksContext } from "@/contexts/tasks";

export const useTasks = () => {
	const { tasks } = useContext(TasksContext);
	return tasks;
};

export const useTaskActions = () => {
	const actions = useContext(TaskActionsContext);
	return actions;
};
