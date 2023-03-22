import { cellsActions, consoleActions, settingsActions } from "@/redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { useReduxDispatch } from "@/redux/store";

const actionCreators = {
	...cellsActions,
	...settingsActions,
	...consoleActions,
};

export const useReduxActions = () => {
	const dispatch = useReduxDispatch();
	return bindActionCreators(actionCreators, dispatch);
};
