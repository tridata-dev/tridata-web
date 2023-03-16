import {
	ActionContext,
	EditorSettingsContext,
} from "@/contexts/EditorSettingsContext";
import { useContext } from "react";

export const useSetTheme = () => {
	const setTheme = useContext(ActionContext);
	return setTheme;
};

export const useEditorSettings = () => {
	const settings = useContext(EditorSettingsContext);
	return settings;
};
