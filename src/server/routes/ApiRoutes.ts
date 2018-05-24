import * as express from "express";
import NetworkController from "../controllers/NetworkController";

const ApiRouter = express.Router();

ApiRouter.get('/net/', NetworkController.getAll);
ApiRouter.get('/net/:id', NetworkController.getSingle);
ApiRouter.put('/net', NetworkController.update);
ApiRouter.post('/net', NetworkController.create);
ApiRouter.get('/learn/:id', NetworkController.learn);
ApiRouter.get('/learn/once/:id', NetworkController.learnOnce);
ApiRouter.get('/data', NetworkController.data);
ApiRouter.get('/test/:id', NetworkController.test);

ApiRouter.get('/data', function(req, res) {
    res.send('respond with a resource');
});

export default ApiRouter;