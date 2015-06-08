var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatcher/dispatcher');
var ActionType = require('../constants/action_type');

var _data = {};

function load(data){
  _data = data;
}

var Store = _.extend({}, EventEmitter.prototype, {

  data: function(){
    return _data;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  },

});

Dispatcher.register(function(payload) {
  var action = payload;

  switch(action.actionType) {
    case ActionType.LOAD:
      load(action.data);
      break;
  }
  Store.emitChange();
});

module.exports = Store;
