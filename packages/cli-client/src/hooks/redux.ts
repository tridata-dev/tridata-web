import { cellsActions, editorActions } from "@/redux";
import { bindActionCreators } from "@reduxjs/toolkit";

import { useReduxDispatch } from "@/redux/store";

const actionCreators = {
	...cellsActions,
	...editorActions,
};

export const useReduxActions = () => {
	const dispatch = useReduxDispatch();
	return bindActionCreators(actionCreators, dispatch);
};
