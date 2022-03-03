import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
	renderContent() {
		switch (this.props.auth) {
			case null:
				return 'Still deciding';
			case false:
				return (
					<li>
						<a href='/auth/google'> Login </a>
					</li>
				);
			default:
				return (
					<li>
						<a href='/api/logout'>Logout</a>
					</li>
				);
		}
	}

	render() {
		return (
			<nav>
				<div className='nav-wrapper'>
					<a href='/' className='left brand-logo'>
						ChessGen
					</a>

					<ul id='nav-mobile' className='right'>
						{this.renderContent()}
					</ul>
				</div>
			</nav>
		);
	}
}

const mapStateToProps = ({ auth }) => {
	return { auth };
};

export default connect(mapStateToProps)(Header);
