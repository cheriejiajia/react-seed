var React = require('react');
var _ = require('lodash');
var Store = require('../stores/store');
var Action = require('../actions/action');
var Header = require('./header');
var Main = require('./main');
var Footer = require('./footer');

module.exports = React.createClass({
  
  getInitialState: function() {
    return {
      data: Store.data()
    };
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
    Action.load();
  },

  componentWillUnmount: function() {
    Store.removeChangeListener(this._onChange);
  },
  
  render: function() {
    var data = this.state.data;

    var ui = null;
    if(!_.isEmpty(data)) {
      ui = (
        <div>
          <Header data={data} />
          <Main data={data} />
          <Footer data={data} />
        </div>
      );
    }

    return (
      <div>
        {ui}
      </div>
    );
  },
  
  _onChange: function() {
    this.setState(this.getInitialState());
  }

});
