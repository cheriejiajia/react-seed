var React = require('react');
var App = require('./components/app');
var Action = require('./actions/actions');

//Check if the div exists in case you have multiple pages
if($("#app").length) {
	Action.load();
  React.render(<App />, document.getElementById('app'));
}