import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getTranslationList } from './store/actions';
import { Redirect } from 'react-router-dom';

class Translation extends Component {

	getList() {
		const { list } = this.props;
		return list.map(item => <div key={item.id}>{item.title}</div>)
	}

	render() {
		return this.props.login ? (
			<div>
				{this.getList()}
			</div>
		) : <Redirect to='/home'/>;
	}

	componentDidMount() {
		if (!this.props.list.length) {
			this.props.getTranslationList();
		}
	}
}

Translation.loadData = (store) => {
	return store.dispatch(getTranslationList())
}

const mapStateToProps = state => ({
	list: state.translation.translationList,
	login: state.header.login
});

const mapDispatchToProps = dispatch => ({
	getTranslationList() {
		dispatch(getTranslationList());
	}
})

export default connect(mapStateToProps, mapDispatchToProps)(Translation);

