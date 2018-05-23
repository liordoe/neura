import * as _ from 'lodash';
import {Layer} from "./layer";
import {log} from "../../server/services/utils";
import {NeuronInfoType, INeuron} from "../../types/net.types";

const BIAS = 1;

export class Neuron implements INeuron {
    private _weights: Array<number>;
    private _inputs: Array<number>;
    private _layer: Layer;
    private _index: number;
    error: number;

    constructor(layer, index) {
        this._layer = layer;
        this._index = index;
        // log(`created new Neuron #${this._index}`);
    }

    get weights(): Array<number> {
        return this._weights || [];
    }

    get index(): number {
        return this._index;
    }

    get inputs() {
        return this._inputs || [];
    }

    set inputs(inputs: Array<number>) {
        this._inputs = _.clone(inputs);
    }

    private predict(): number {
        if (!this.weights.length) this.generateWeights(this._inputs.length);
        const sum = this._inputs.reduce((sum, current, i) => {
            return sum + current * this.weights[i];
        }, BIAS);
        return sum;
    }

    activation(): number {
        return 1 / (1 + Math.exp(-this.predict()));
    }

    info(): NeuronInfoType {
        return {
            value: this._inputs ? this.activation() : undefined,
            error: this.error,
            weights: this.weights,
            inputs: this.inputs,
        };
    }

    /**
     * @param {number} teacher teacher value
     * @param {number} factor learning factor
     */
    updateWeights(teacher: number, factor: number) {
        const dfde = this.activation() * (1 - this.activation());

        this._weights = this.weights.map((w, i) => {
            const out = w + factor * this.error * dfde * this._inputs[i];
            log(`updated weight ${i} ${out} (was ${w}), neuron ${this._index}, layer ${this._layer.index}, error ${this.error}, f ${dfde}, input ${i}, ${this._inputs[i]}`);
            return out;
        });
    }

    private generateWeights(length, weigths: Array<number> = []): void {
        this._weights = weigths.length ? weigths : [];
        while (this._weights.length < length) this._weights.push(Math.random() - 0.5);
    }
}
