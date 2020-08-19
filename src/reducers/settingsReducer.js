import { NIGHTMODE } from "../actions/action-types";

const initialState = {
	nightmode: false,
};

const settingsReducer = (state = initialState, action) => {
	switch (action.type) {
		case NIGHTMODE:
			window.localStorage.setItem("nightMode", action.payload.nightmode);
			return {
				...state,
				nightmode: action.payload.nightmode,
			};
		default:
			return state;
	}
};

export default settingsReducer;
