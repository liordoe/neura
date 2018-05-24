import { Document, Schema, Model, model} from "mongoose";
import {INeuron} from "./NeuronModel";
import BasicSchema from "./basic";

export interface ILayer {
    depth: number;
    neurons: Array<INeuron>;
}
export interface ILayerModel extends ILayer, Document {}

export const LayerSchema: Schema = new BasicSchema({
    depth: Number,
    neurons: [{
        type: Schema.Types.ObjectId,
        ref: 'Neuron'
    }],
});

export const Layer: Model<ILayerModel> = model<ILayerModel>("Layer", LayerSchema);
