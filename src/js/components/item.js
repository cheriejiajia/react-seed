import React from 'react';
import { Link } from 'react-router';

export default class Item extends React.Component{

	render() {
		return (
			<li><Link to={'/item/' + this.props.data.id}>{this.props.data.name}</Link></li>
		);
	}

}
