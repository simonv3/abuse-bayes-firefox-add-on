// Import the page-mod API
var pageMod = require("sdk/page-mod");
// Import the self API
var self = require("sdk/self");
var eventFnc = require('./lib/eventFunctions.js');

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
      eventFnc.foundTweet(data, worker)
    });
    worker.port.on('registerAbuse', eventFnc.registerAbuse);
  }
});
