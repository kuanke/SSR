import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from './store/'
import styles from './styles.css'
import withStyle from '../../withStyle'

class Header extends Component {

	render() {
		const { login, handleLogin, handleLogout } = this.props;
		return (
			<div className={styles.bg}>
				<Link to='/home'>首页</Link>
				<br />
				{
					login ? <Fragment>
						<Link to='/translation'>翻译列表</Link>
						<br />
						<div onClick={handleLogout}>退出</div>
					</Fragment> : <div onClick={handleLogin}>登陆</div>
				}
			</div>
		)
	}
}

const mapState = (state) => ({
	login: state.header.login
});

const mapDispatch = (dispatch) => ({
	handleLogin() {
		dispatch(actions.login())
	},
	handleLogout() {
		dispatch(actions.logout())
	}
});

const wrappedHeader = connect(mapState, mapDispatch)(withStyle(Header, styles));

export default wrappedHeader;

