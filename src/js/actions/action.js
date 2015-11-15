var Dispatcher = require('../dispatcher/dispatcher');
var ActionType = require('../constants/action_type');
var Service = require('../services/service');

module.exports = {
	load: function(){
		Service.load().then(function(data){
			Dispatcher.dispatch({
				actionType: ActionType.LOAD,
				data: data
			});
		});
	}
};