import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from './store/'
import styles from './styles.css'

class Header extends Component {

    componentWillMount() {
    	// staticContext 为何一直都是undefined ??
		// 解答：staticContext 需要从App组件传进来
        if (this.props.staticContext) {
        	console.log('Header staticContext');
            this.props.staticContext.css.push(styles._getCss());
        }
    }

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
})

export default connect(mapState, mapDispatch)(Header);

