import * as express from 'express';
import * as path from 'path';
import {inputsFromFile} from "../services/utils";
import ApiRouter from './ApiRoutes';
// console.log('dirname', path.join(__dirname, 'views'));

const Router = express.Router();

Router.use('/api', ApiRouter);

// catch 404 and forward to error handler
Router.get('*', function(req, res) {
    res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
});

export default Router;
