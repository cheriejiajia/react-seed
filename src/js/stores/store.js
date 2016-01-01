import EventEmitter from 'events';
import Dispatcher from '../dispatcher/dispatcher';
import ActionType from '../constants/action_type';
import ChangeEvent from '../constants/change_event';

let _data = {};
let _error = {};

function load(data) {
  _data = data;
}

function error(error) {
  _error = error;
}

class Store extends EventEmitter {
  constructor() {
    super();
  }

  data() {
    return _data;
  }

  error() {
    return _error;
  }

  emitChange() {
    this.emit(ChangeEvent.CHANGE);
  }

  addChangeListener(callback) {
    this.on(ChangeEvent.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(ChangeEvent.CHANGE, callback);
  }

  emitError() {
    this.emit(ChangeEvent.ERROR);
  }

  addErrorListener(callback) {
    this.on(ChangeEvent.ERROR, callback);
  }

  removeErrorListener(callback) {
    this.removeListener(ChangeEvent.ERROR, callback);
  }
}

const AppStore = new Store();

Dispatcher.register(payload => {
  let action = payload;

  switch(action.actionType) {
    case ActionType.LOAD:
      load(action.data);
      break;
  }

  switch(action.actionType) {
    case ActionType.ERROR:
      error(action.error);
      AppStore.emitError();
      return;
  }
  
  AppStore.emitChange();
});

export default AppStore;
