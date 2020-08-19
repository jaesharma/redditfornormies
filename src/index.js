import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { Provider } from "react-redux";
import store from "./store";
import { loggedIn, nightMode } from "./actions/index";
import { refreshData } from "./actions/api-calls";
import { addSubreddit } from "./actions";

window.localStorage.removeItem("subreddits");
let {
	data = "{}",
	nightMode: nightModeState = false,
	subreddits = "[]",
} = window.localStorage;
data = JSON.parse(data);

nightModeState = nightModeState === "true";
store.dispatch(nightMode(nightModeState));

if (data.hasOwnProperty("access_token")) {
	refreshData(data.access_token, data.refresh_token).then((data) => {
		store.dispatch(loggedIn(data));
	});
} else {
	JSON.parse(subreddits).map((sub) => {
		store.dispatch(addSubreddit(sub));
	});
}

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
