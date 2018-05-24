import * as express from 'express';
import * as path from 'path';
import {inputsFromFile} from "../services/utils";
import ApiRouter from './ApiRoutes';
// console.log('dirname', path.join(__dirname, 'views'));

const Router = express.Router();
Router.get('/', function(req, res) {
    res.send('Home');
});

Router.use('/api', ApiRouter);

// catch 404 and forward to error handler
Router.get('*', function(req, res) {
    inputsFromFile(path.join(__dirname, ));
    res.status(404).send('Not Found');
});

export default Router;
