// Electron provides these modules.
// When running in Silk, packages with the same names are symlinked into your node_modules folder
// 2 seconds later they are removed.
var BrowserWindow = require('electron').BrowserWindow;
var app = require('electron').app;

// This package allows us to access Silk's api
var silkApi = require('silk-api');

var express = require('express');
var expressApp = express();

// Silk provides an available port number through the env variable
var port = process.env.PORT || 4000;

app.on('ready', function () {
  expressApp.use(express.static(__dirname + '/static'));
  expressApp.listen(port, function () {

    // nodeIntegration is required to be set to false since Silk does not provide node api on the client.
    var window = new BrowserWindow({nodeIntegration: false});

    // The window manager will open a window after you call loadUrl().
    window.loadUrl('http://localhost:' + port);
  });

});

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if(process.platform !== 'darwin') {
    app.quit();
  }
});
