import {Net} from "../../lib/network/net";
import {NetworkRepository} from "../repositories/NetworkRepository";
import {Schema} from "mongoose";
import {LearningNets, TEST_DATA_PATH, TRAIN_DATA_PATH} from "../../config";
import {inputsFromFile} from "../services/utils";
import * as _ from 'lodash';
import InputsHandler from "../services/InputsHandler";

export default class NetworkController {
    public static async create(req, res) {
        try {
            const {body} = req;
            let network;
            if (Array.isArray(body)) {
                network = new Net(body);
            } else if (body.layers) {
                network = new Net(body);
                network.fromDB(body);
            }
            const saved = await NetworkRepository.createNetwork(network);
            return res.json(saved);
        } catch (err) {
            return res.status(500).send(err.toString());
        }
    }

    public static async getSingle(req, res) {
        try {
            const {params: {id}}: {params: {id: Schema.Types.ObjectId}} = req;
            const net = await NetworkRepository.getNetwork(id);
            return res.json(net);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    }

    public static async update(req, res) {
        try {
            const {body} = req;
            if (LearningNets.includes(body.id)) {
                throw Error(`Can't update learning net`);
            }
            await NetworkRepository.updateNetwork(body);
            const net = await NetworkRepository.getNetwork(body.id);
            return res.json(net);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err.toString());
        }
    }

    public static async clear(req, res) {
        try {
            const {params: {id}} = req;
            if (LearningNets.includes(id)) {
                throw Error(`Can't clear learning net`);
            }
            await NetworkRepository.clearWeights(id);
            const net = await NetworkRepository.getNetwork(id);
            return res.json(net);
        } catch (err) {
            console.log(err);
            return res.status(500).send(err.toString());
        }
    }

    public static async getAll(req, res) {
        try {
            const nets = await NetworkRepository.getAllNetworks();
            return res.json(nets);
        } catch (err) {
            return res.status(500).send(err);
        }
    }

    public static async learn(req, res) {
        try {
            let {params: {id}, query: {start = 0, limit = 50000, iterations = 50000, eps = 0.0001, perVector = 100}} = req;
            if ([limit, iterations, eps, perVector, start].some(isNaN)) {
                throw new Error('inputs error, all query parameters should be numbers');
            }

            const preNet = await NetworkRepository.getNetwork(id);
            if (!preNet) {
                throw new Error('no net found');
            }
            const net = new Net();
            net.fromDB(preNet);

            let inputs = await inputsFromFile(TRAIN_DATA_PATH);
            if (!inputs.length) {
                throw new Error('no test base found');
            }
            start = +start % inputs.length;
            limit = +limit % inputs.length;
            iterations = +iterations;
            eps = +eps;
            perVector = +perVector;

            let select = inputs.slice(start, limit).map(i => InputsHandler.handle(i));

            if (!select.length) {
                return res.send(net.info());
            }

            net.learn(select, {
                eps,
                factor: 1,
            }, iterations, perVector);
            res.json(inputs.slice(start, limit).map(i => i.join(',')));

            await NetworkRepository.updateNetwork(net.info());
            return;
        } catch (err) {
            console.log(err);
            return res.status(500).send(err.toString());
        }
    }

    public static async learnOnce(req, res) {
        try {
            let {params: {id}, query: {vector}} = req;
            if (LearningNets.includes(id)) {
                throw new Error(`Can't run two learn processes for one net`);
            }

            const preNet = await NetworkRepository.getNetwork(id);
            if (!preNet) {
                throw new Error('no net found');
            }
            let inputs = vector ? [vector.split(',')] :  await inputsFromFile(TRAIN_DATA_PATH);

            const net = new Net();
            net.fromDB(preNet);

            if (!inputs.length) {
                throw new Error('no test base found');
            }

            let select = inputs.slice(0, 1).map(i => InputsHandler.handle(i));

            net.learnIteration(select[0], {
                eps: 0.1,
                factor: 1,
            });
            await NetworkRepository.updateNetwork(net.info());
            return res.json(net.calculate(select[0]));
        } catch (err) {
            return res.status(500).send(err.toString());
        }
    }

    public static async data(req, res) {
        try {
            const {query: {id}} = req;
            const n = +id;
            if (isNaN(n)) {
                throw new Error('not valid id');
            }
            const inputs = await inputsFromFile(TRAIN_DATA_PATH);
            if (!inputs.length) {
                throw new Error('no train base found');
            }
            const unique = _.uniqBy(inputs.map(x => x[n]));
            res.json(unique);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }

    public static async test(req, res) {
        try {
            let {params: {id}, query: {vector, start = 0, limit}} = req;
            let inputs = vector ? [vector.split(',')] :  await inputsFromFile(TEST_DATA_PATH);
            start = +start % inputs.length;
            limit = limit ? (start + +limit) % inputs.length : start + 5;
            const preNet = await NetworkRepository.getNetwork(id);
            if (!preNet) {
                throw new Error('no net found');
            }

            if (!inputs.length) {
                throw new Error('no test base found');
            }
            const net = new Net();
            net.fromDB(preNet);

            let select = inputs.slice(start, limit).map(i => InputsHandler.handle(i));

            const out = [];
            let i = 0;
            for (let input of select) {
                out.push({
                    vector: inputs[i].join(','),
                    value: net.calculate(input)
                });
                i++;
                i % 1000 === 0 && console.log(`${i} iterations ago`);
            }

            res.json(out);
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
}