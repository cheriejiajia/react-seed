var React = require('react');

var Item = React.createClass({

	render: function() {
		return (
			<li>{this.props.data.name}</li>
		);
	}

});

module.exports = Item;