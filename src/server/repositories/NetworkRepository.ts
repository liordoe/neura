import * as mongoose from 'mongoose';
import {INet, NetInfoType} from "../../types/net.types";
import {Net} from "../models/NetModel";
import {ILayerModel, Layer} from "../models/LayerModel";
import {Neuron} from "../models/NeuronModel";

export class NetworkRepository {
    public static async createNetwork(net: INet) {
        const tmp = net.info();
        const layers = await this.updateLayers(tmp.layers);
        let preSaveNet = {
            depth: tmp.depth,
            layers: layers
        };
        const network = await new Net(preSaveNet);
        return network.save();
    }

    public static async getNetwork(id): Promise<NetInfoType> {
        const net = await Net.findById(id).populate('layers');
        net.layers = await Promise.all(net.layers.map(l => {
            return this.getLayer((l as ILayerModel).id);
        }));
        return net;
    }

    public static async getLayer(id) {
        return Layer.findById(id).populate('neurons');
    }

    public static async getNeuron(id) {
        return Neuron.findById(id);
    }

    public static async getAllNetworks() {
        return Net.find({}).populate('layers');
    }

    public static async updateNetwork(net) {
        await this.updateLayers(net.layers);
        return Net.update({_id: net.id}, {
            $set: {
                depth: net.depth
            }
        }, {
            upsert: true,
            new: true
        });
    }

    public static async updateLayers(layers) {
        return Promise.all(layers.map(async l => {
            await this.updateNeurons(l.neurons);
            return Layer.findOneAndUpdate({
                _id: {
                    $exists: true,
                    $eq: mongoose.Types.ObjectId(l.id),
                }
            }, {
                $set: {
                    depth: l.depth,
                }
            }, {
                upsert: true,
                new: true
            });
        }));
    }

    public static async updateNeurons(neurons) {
        return Promise.all(neurons.map(async n => {
            return Neuron.findOneAndUpdate({
                _id: {
                    $exists: true,
                    $eq: mongoose.Types.ObjectId(n.id),
                }
            }, {
                $set: {
                    weights: n.weights,
                    value: n.value
                }
            }, {
                upsert: true,
                new: true
            });
        }));
    }

    public static async clearWeights(id) {
        const net = await this.getNetwork(id);
        await Promise.all(
            net.layers.map(async l => {
                const neurons = l.neurons.map(n => {
                    n.weights = [];
                    return n;
                });
                return this.updateNeurons(neurons);
            })
        );
        return;
    }
}