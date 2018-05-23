import { Document, Schema, Model, model} from "mongoose";
import {NetInfoType} from "../../types/net.types";

export interface INetModel extends NetInfoType, Document {}

export const NetSchema: Schema = new Schema({
    depth: Number,
    layers: [{
        type: Schema.Types.ObjectId,
        ref: 'Layer'
    }],
});

export const Net: Model<INetModel> = model<INetModel>("Net", NetSchema);
