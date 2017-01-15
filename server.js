var http = require('http');
var fs = require('fs');

// set the port for the server
var port = process.env.PORT || 8000;

// handle the client request and send back a response from server
function handler(request, response) {
 var url = request.url;
 switch (url) {
  case '/':
      getStaticFileContent(response, 'index.html', 'text/html');
  case '/style.css':
      getStaticFileContent(response, 'style.css',
      'text/css');
  case '/node_modules/convnetjs/build/convnet-min.js':
      getStaticFileContent(response, 'node_modules/convnetjs/build/convnet-min.js', 'text/javascript');
  case '/convnet_demo.js':
      getStaticFileContent(response, 'convnet_demo.js', 'text/javascript');
  case '/model.json':
      getStaticFileContent(response, 'model.json', 'application/json');
  case '/cifar10_batch_50_small.png':
      getStaticFileContent(response, 'cifar10_batch_50_small.png', 'image/png');
      break;
  default:
  response.writeHead(404, {'Content-Type':'text/plain'});
  response.end('404 - Page not Found');

 }
}

function getStaticFileContent(response, filepath, contentType) {
 fs.readFile(filepath, function (error, file) {
 if (error) {
  console.log(error);
  response.end();
 }
 if (file) {
  response.writeHead(200, {"Content-Type": contentType});
  response.end(file);
 } else {
  response.writeHead(200, {"Content-Type": contentType});
  response.end(content, 'utf-8');
  }
 });
}

http.createServer(handler).listen(port);

console.log('node server listening on http://localhost:' + port);
