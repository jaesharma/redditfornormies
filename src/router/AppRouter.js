import { Router, Switch, Route } from "react-router-dom";
import React from "react";
import { createBrowserHistory } from "history";
import Dashboard from "../components/Dashboard";
import Explore from "../components/Explore";
import FetchToken from "../components/FetchToken";
import Inbox from "../components/Inbox";
import Notifications from "../components/Notifications";
import SubredditProfile from "../components/SubredditProfile";
import Profile from "../components/Profile";
import About from "../components/About";
import NotFound from "../components/NotFound";
import PrivateRoute from "./PrivateRoute";

export const history = createBrowserHistory();

const AppRouter = () => (
	<Router history={history}>
		<Switch>
			<Route path="/" component={Dashboard} exact={true} />
			<Route path="/home" component={Dashboard} />
			<PrivateRoute path="/inbox" component={Inbox} exact={true} />
			<Route path="/explore" component={Explore} />
			<Route path="/notifications" component={Notifications} />
			<Route path="/about" component={About} />
			<Route path="/user" component={Profile} key={Math.random()} />
			<Route path="/fetchtoken" component={FetchToken} />
			<Route
				exact={true}
				path="/r/:subreddit"
				component={SubredditProfile}
				key={Math.random()}
			/>
			<Route component={NotFound} />
		</Switch>
	</Router>
);

export default AppRouter;
