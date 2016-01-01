import React from 'react';
import Item from './item';

export default class Main extends React.Component {

	render() {
		let data = this.props.data;
		let items = null;

		if(data.length > 0) {
			items = data.map(n => {
				return (<Item key={n.id} data={n} />);
			});
		}

		return (
			<div className="main">
				<ul>
					{items}
				</ul>
			</div>
		);
	}

}