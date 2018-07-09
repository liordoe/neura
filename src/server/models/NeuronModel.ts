import { Document, Schema, Model, model} from "mongoose";
import {NeuroWeightsType} from "../../types/net.types";
import BasicSchema from "./basic";

export interface INeuron {
    value?: number;
    weights: NeuroWeightsType;
}

export interface INeuronModel extends INeuron, Document {}

export const NeuronSchema: Schema = new BasicSchema({
    value: Number,
    weights: [{
        type: Number,
    }],
});

export const Neuron: Model<INeuronModel> = model<INeuronModel>("Neuron", NeuronSchema);
