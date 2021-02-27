const http = require('http');
const url = require('url');
const server = require('./index');
import BodyParser from '../helpers/bodyParser';
import UserController from '../controllers/user.controller.js';
import MessageController from '../controllers/messages.controller';

class Routes{
static async checkRoutes(req, res){
    // var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    // GET Endpoint
    if (reqUrl.pathname == '/api/auth/signup' && req.method === 'POST') {
        await BodyParser.bodyParser(req)
        UserController.createUser(req,res);

    } else if (reqUrl.pathname == '/api/auth/login' && req.method === 'POST'){
        await BodyParser.bodyParser(req)
        UserController.userLogin(req,res);
    } 
    
    else if (reqUrl.pathname == '/api/messages' && req.method === 'GET') {
        // await BodyParser.bodyParser(req)
        MessageController.getMessages(req,res);

    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: `The route does not exist`,
            status: 404,
          })
        );

    }
}}

export default Routes;