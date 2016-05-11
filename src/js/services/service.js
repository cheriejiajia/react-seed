import Api from '../constants/api';
import _ from 'lodash';

class Service {
  load() {
    return $.get(Api.LOAD);
  }

  getItemById(id) {
  	return $.get(Api.LOAD_BY_ID).then((response) => {
  		return _.find(response, {id: id});
  	});
  }
}

const AppService = new Service();
export default AppService;
