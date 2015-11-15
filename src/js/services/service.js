var Api = require('../constants/api');

module.exports = {
  load: function() {
      return $.get(Api.LOAD);
    }
};

