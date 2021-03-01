const http = require('http');
const url = require('url');
import Routes from './routes'

module.exports = http.createServer((req, res) => {
res.setHeader('Access-Control-Allow-Origin', '*');
res.setHeader('Access-Control-Request-Method', '*');
res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
res.setHeader('Access-Control-Allow-Headers', '*');

if ( req.method === 'OPTIONS' ) {
    res.writeHead(200);
    res.end();
    return;
}
  Routes.checkRoutes(req,res);
});

