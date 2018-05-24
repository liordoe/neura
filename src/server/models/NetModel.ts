import { Document, Schema, Model, model} from "mongoose";
import {ILayer} from "./LayerModel";
import BasicSchema from './basic';

export interface INet {
    depth: number;
    layers: Array<ILayer>;
}
export interface INetModel extends INet, Document {}

export const NetSchema: Schema = new BasicSchema({
    depth: Number,
    layers: [{
        type: Schema.Types.ObjectId,
        ref: 'Layer'
    }],
});

export const Net: Model<INetModel> = model<INetModel>("Net", NetSchema);
