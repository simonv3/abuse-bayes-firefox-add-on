var Request = require('sdk/request').Request;

module.exports.foundTweet = function(data, worker) {
  console.log('data', data);
  console.log('worker', worker);
  Request({
    url: 'http://localhost:3000/api/v1/classify',
    onComplete: function (response) {
      if (response.json.abuse) {
        worker.port.emit('foundAbuse', data);
      }
    },
    content: data
  }).post();
};

module.exports.registerAbuse = function(data) {
  console.log('registering abuse');
  Request({
    url: 'http://localhost:3000/api/v1/register-abuse',
    onComplete: function (response) {
      console.log(response);
    },
    content: data
  }).post();
};
