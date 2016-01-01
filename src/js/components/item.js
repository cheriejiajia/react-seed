import React from 'react';

export default class Item extends React.Component{

	render() {
		return (
			<li>{this.props.data.name}</li>
		);
	}

}
