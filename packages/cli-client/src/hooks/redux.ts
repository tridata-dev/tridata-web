import { cellsActions, consoleActions, settingsActions } from "@/redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { useReduxDispatch } from "@/redux/store";
import { editorActions } from "@/redux/slices/editor";

const actionCreators = {
	...cellsActions,
	...settingsActions,
	...consoleActions,
	...editorActions,
};

export const useReduxActions = () => {
	const dispatch = useReduxDispatch();
	return bindActionCreators(actionCreators, dispatch);
};
