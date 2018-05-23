import * as express from 'express';
import sniffer from '../../lib/sniffer';
import {Net} from '../../lib/network/net';
import * as path from 'path';
import {createEmptyArray, inputsFromFile} from "../services/utils";
import ApiRouter from './ApiRoutes';

const INPUTS = createEmptyArray(3).fill(Math.random());
// const INPUTS = fs.readFileSync('');
const NET = new Net(Array(3).fill(3));
// console.log('dirname', path.join(__dirname, 'views'));

const Router = express.Router();
Router.get('/', function(req, res) {
    res.json({
        inputs: INPUTS,
        net: NET.info(),
    });
});

Router.use('/api', ApiRouter);

// catch 404 and forward to error handler
Router.get('*', function(req, res) {
    inputsFromFile(path.join(__dirname, ));
    res.status(404).send('Not Found');
});

export default Router;
