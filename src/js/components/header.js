var React = require('react');

var Header = React.createClass({

	render: function() {
		var data = this.props.data;

		return (
			<div className="header">
				Header
			</div>
		);
	}

});

module.exports = Header;