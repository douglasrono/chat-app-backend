const http = require('http');
const url = require('url');
import Routes from './routes'

module.exports = http.createServer((req, res) => {
    Routes.checkRoutes(req,res);
});

