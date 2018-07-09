import {Schema} from "mongoose";

const TO_JSON_OPTION = {
    toJSON: {
        virtuals: true,
        transform: function(doc, ret) {
            ret.id = doc._id.toHexString();
            delete ret.__v;
            delete ret._id;
        }
    }
};

export default class BasicSchema extends Schema {
    constructor(defenition, options = {}) {
        super(defenition, Object.assign({}, TO_JSON_OPTION, options));
    }
}