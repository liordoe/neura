import * as express from "express";
import * as os from 'os';
import NetworkController from "../controllers/NetworkController";
import sniffer from "../../lib/sniffer";
let interval;

const ApiRouter = express.Router();

ApiRouter.get('/net/', NetworkController.getAll);
ApiRouter.get('/net/:id', NetworkController.getSingle);
ApiRouter.put('/net', NetworkController.update);
ApiRouter.post('/net', NetworkController.create);

ApiRouter.get('/clear/:id', NetworkController.clear);
ApiRouter.get('/learn/:id', NetworkController.learn);
ApiRouter.get('/learn/once/:id', NetworkController.learnOnce);

ApiRouter.get('/data', NetworkController.data);

ApiRouter.get('/test/:id', NetworkController.test);

ApiRouter.get('/listen/:id', function(req, res) {
    res.send('Listening...');
    sniffer();
    interval = setInterval(function(){
        console.log(0);
    }, 1000);
});

ApiRouter.get('/listen/stop/:id', function(req, res) {
    res.send('Stopped...');
    clearInterval(interval);
});

ApiRouter.get('/test', function(req, res) {
    res.json(os.cpus());
    console.log();
});

ApiRouter.get('/*', (req, res) => {
    res.status(500).send('unknown api endpoint');
});

export default ApiRouter;