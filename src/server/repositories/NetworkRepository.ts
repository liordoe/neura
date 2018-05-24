import {INet, NetInfoType} from "../../types/net.types";
import {Net} from "../models/NetModel";
import {ILayerModel, Layer} from "../models/LayerModel";
import {Neuron} from "../models/NeuronModel";

export class NetworkRepository {
    public static async createNetwork(net: INet) {
        const tmp = net.info();
        const layers = await this.saveLayers(tmp.layers);
        let preSaveNet = {
            depth: tmp.depth,
            layers: layers
        };
        const network = await new Net(preSaveNet);
        return network.save();
    }

    public static async saveNeurons(neurons) {
        return Promise.all(neurons.map(async n => {
            const neuron = await new Neuron({
                weigths: n.weights
            }).save();
            return neuron.id;
        }));
    }

    public static async saveLayers(layers) {
        return Promise.all(layers.map(async l => {
            const layer = await new Layer({
                depth: l.depth,
                neurons: await this.saveNeurons(l.neurons)
            }).save();
            return layer.id;
        }));
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
        });
    }

    public static async updateLayers(layers) {
        return Promise.all(layers.map(async l => {
            if (!l.id) {
                return this.saveLayers([l]);
            }
            await this.updateNeurons(l.neurons);
            return Layer.update({_id: l.id}, {
                $set: {
                    depth: l.depth,
                }
            });
        }));
    }

    public static async updateNeurons(neurons) {
        return Promise.all(neurons.map(async n => {
            if (!n.id) {
                return this.saveNeurons([n]);
            }
            return Neuron.update({_id: n.id}, {
                $set: {
                    weights: n.weights,
                }
            });
        }));
    }
}