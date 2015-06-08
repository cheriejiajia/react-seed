var Endpoint = require('../constants/api');

module.exports = {
  load: function() {
      return $.get(Endpoint.LOAD);
    }
};

