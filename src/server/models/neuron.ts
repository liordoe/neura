import { Document, Schema, Model, model} from "mongoose";
import {INeuron} from "../../types/net.types";

export interface INeuronModel extends INeuron, Document {}

export const NeuronSchema: Schema = new Schema({
    wights: [{
        type: Number,
    }],
});

export const Neuron: Model<INeuronModel> = model<INeuronModel>("Neuron", NeuronSchema);
