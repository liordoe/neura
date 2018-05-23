import { Document, Schema, Model, model} from "mongoose";
import {ILayer} from "../../types/net.types";

export interface ILayerModel extends ILayer, Document {}

export const LayerSchema: Schema = new Schema({
    depth: Number,
    neurons: [{
        type: Schema.Types.ObjectId,
        ref: 'Neuron'
    }],
});

export const Layer: Model<ILayerModel> = model<ILayerModel>("Layer", LayerSchema);
