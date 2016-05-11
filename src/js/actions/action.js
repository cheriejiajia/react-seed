import Dispatcher from '../dispatcher/dispatcher';
import ActionType from '../constants/action_type';
import Service from '../services/service';

class Action {
	load() {
		Service.load()
			.done((data) => {
				Dispatcher.dispatch({
					actionType: ActionType.LOAD,
					data: data
				});
			})
			.fail(() => this.error({error: true, message: "Can't load data"}));
	}

	getItemById(id) {
		Service.getItemById(id)
			.done((data) => {
				Dispatcher.dispatch({
					actionType: ActionType.LOAD_BY_ID,
					data: data
				});
			})
			.fail(() => this.error({error: true, message: "Can't load data"}));
	}

	error(error) {
		error = error ? error : {};
		Dispatcher.dispatch({
			actionType: ActionType.ERROR,
			error: error
		});
	}
}

const AppAction = new Action();
export default AppAction;