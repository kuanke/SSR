import React from 'react';
import {connect} from 'react-redux';

const Home = (props) => {
	console.log('home')
	return (
		<div>
			<div>欢迎回家! {props.name}</div>
			<button onClick={()=>{alert('click1')}}>
				click
			</button>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {name: state.name}
}

export default connect(mapStateToProps, null)(Home);