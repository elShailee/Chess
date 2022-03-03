import React, { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from '../components/Header';
const Landing = () => <h2> Landing </h2>;
const MainPage = () => <h2> MainPage </h2>;
/*
const UserScreen = () => <h2> UserScreen </h2>;
const GamePlayScreen = () => <h2> GamePlayScreen </h2>;
const AboutScreen = () => <h2> AboutScreen </h2>;
*/
class App extends Component {
	componentDidMount() {
		this.props.fetchUser();
	}

	render() {
		return (
			<div className='container'>
				<BrowserRouter>
					<div>
						<Header />
						<Routes>
							<Route exact={true} path='/' component={Landing} />
							<Route path='/mainpage' component={MainPage} />
						</Routes>
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(null, actions)(App);
