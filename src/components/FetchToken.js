import React from "react";
import Header from "./Header";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { loggedIn } from "../actions";
import queryString from "query-string";
import {
	StyledPageCover,
	StyledImg,
} from "../styles/components/notFoundPageStyles";

class FetchToken extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			error: undefined,
		};
		this.setAccessToken = this.setAccessToken.bind(this);
	}
	setAccessToken() {
		const params = queryString.parse(this.props.location.search);
		const code = params.code;
		const clientID = process.env.REACT_APP_CLIENTID;
		const clientSecret = process.env.REACT_APP_CLIENTSECRET;
		const redirectUri = process.env.REACT_APP_REDIRECTURI;
		if (!code) return null;
		const encode = btoa(
			`${process.env.REACT_APP_CLIENTID}:${process.env.REACT_APP_CLIENTSECRET}`
		);
		const redditTokens = fetch(
			"https://www.reddit.com/api/v1/access_token",
			{
				method: "POST",
				body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&duration=permanent`,
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `basic ${encode}`,
				},
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.hasOwnProperty("error"))
					this.setState({ error: data.error, loading: false });
				if (data.hasOwnProperty("access_token")) {
					this.setState({ loading: false });
					this.props.dispatch(loggedIn(data));
					this.props.history.push("/");
				}
			})
			.catch((error) => {
				this.setState({ error, loading: false });
			});
	}
	componentDidMount() {
		this.setAccessToken();
	}
	render() {
		return (
			<div>
				{this.state.loading && (
					<StyledPageCover style={{ background: "black" }}>
						<StyledImg src="/images/growth.png" />
						<h2>Loading...</h2>
					</StyledPageCover>
				)}
				{!this.state.loading && this.state.error && (
					<div>
						<StyledPageCover>
							<StyledImg src="/images/Astronaut.png" />
							<h1>Somthing went wrong</h1>
						</StyledPageCover>
					</div>
				)}
			</div>
		);
	}
}

export default connect()(FetchToken);
