var React = require('react');
var _ = require('lodash');
var Item = require('./item');

var Main = React.createClass({

	render: function() {
		var data = this.props.data;
		
		var items = null;
		items = _.map(data, function(n){
			return (<Item key={n.id} data={n} />);
		});
		return (
			<div className="main">
				<ul>
					{items}
				</ul>
			</div>
		);
	}

});

module.exports = Main;