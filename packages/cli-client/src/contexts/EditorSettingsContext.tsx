import { createContext } from "react";
import { useImmerReducer } from "use-immer";
import { bbedit } from "@uiw/codemirror-theme-bbedit";

type EditorTheme = "light" | "dark";
type EditorSettings = {
	theme: EditorTheme;
};

type Action = {
	type: "set_theme";
	payload: { theme: EditorTheme };
};

type ActionContextType = (theme: EditorTheme) => void;
export const ActionContext = createContext<ActionContextType>(
	{} as ActionContextType,
);
export const EditorSettingsContext = createContext<EditorSettings>(
	{} as EditorSettings,
);

const getInitialEditorSettings = (): EditorSettings => ({ theme: "dark" });

const EditorSettingsProvider = ({
	children,
}: { children: React.ReactNode }) => {
	const [settings, dispatch] = useImmerReducer<EditorSettings, Action>(
		(draft, action) => {
			switch (action.type) {
				case "set_theme":
					draft.theme = action.payload.theme;
			}
		},
		getInitialEditorSettings(),
	);

	const setTheme = (theme: EditorTheme) => {
		dispatch({ type: "set_theme", payload: { theme } });
	};

	return (
		<ActionContext.Provider value={setTheme}>
			<EditorSettingsContext.Provider value={settings}>
				{children}
			</EditorSettingsContext.Provider>
		</ActionContext.Provider>
	);
};

export default EditorSettingsProvider;
