import Api from '../constants/api';

class Service {
  load() {
    return $.get(Api.LOAD);
  }
}

const AppService = new Service();
export default AppService;
