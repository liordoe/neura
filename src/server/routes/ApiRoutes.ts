import * as express from "express";
import {TEST_DATA_PATH} from "../../config";
import * as fs from 'fs';

const ApiRouter = express.Router();
// ApiRouter.get('/current', function(req, res) {
//     NET.calculate(INPUTS);
//     res.json(NET.info());
// });
//
// ApiRouter.get('/learn', function(req, res) {
//     NET.learn(Array(1000).fill(INPUTS), {correct: 1, factor: 1});
//     res.json(NET.info());
// });
//
// ApiRouter.get('/learn/once', function(req, res) {
//     NET.learnIteration(INPUTS, {correct: 1, factor: 1});
//     res.json(NET.info());
// });

ApiRouter.get('/data', function(req, res) {
    res.send('respond with a resource');
});

export default ApiRouter;