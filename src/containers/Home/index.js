import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {getHomeList} from './store/action'

function Home(props) {

	useEffect(() => {
        const {list} = props;
        if (!list.length) {
            props.getHomeList()
        }
	}, []);

	const getList = () => {
		const {list} = props;
		return list.map(item => <div key={item.id}>{item.title}</div>)
	};

	return (
		<div>
			<div>欢迎回家!</div>
			{getList()}
			<button onClick={()=>{alert('click1')}}>
				click
			</button>
		</div>
	);
};

Home.loadData = (store) => {
    // 这个函数，负责在服务器端渲染之前，把这个路由需要的数据提前加载好
	return store.dispatch(getHomeList())
};

const mapStateToProps = (state) => {
	return {list: state.home.newsList}
};

const mapDispatchToProps = (dispatch) => ({
	getHomeList() {
		dispatch(getHomeList())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);