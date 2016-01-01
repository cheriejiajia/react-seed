import Api from '../constants/api';

export default {
  load() {
    return $.get(Api.LOAD);
  }
};

