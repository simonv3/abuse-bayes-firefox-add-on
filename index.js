// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");
var Request = require('sdk/request').Request;

// Create a page-mod
// It will run a script whenever a ".org" URL is loaded
// The script replaces the page contents with a message
pageMod.PageMod({
  include: '*.twitter.com',
  contentScriptFile: [
    self.data.url('./bower_components/jquery/dist/jquery.min.js'),
    self.data.url('./content-script.js')
  ],
  contentStyleFile: './abuse.css',
  onAttach: function(worker) {
    worker.port.on('foundTweet', function(data) {
      console.log('found a tweet on the index');
      Request({
        url: 'http://localhost:3000/api/v1/classify',
        onComplete: function (response) {
          console.log(response.json);
          if (response.json.abuse) {
            worker.port.emit('foundAbuse', data)
          }
        },
        content: data
      }).post();
    });
  }
});
