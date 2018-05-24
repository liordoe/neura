import * as _ from 'lodash';
import {Layer} from "./layer";
import {log} from "../../server/services/utils";
import {NeuronInfoType, INeuron, NeuroWeightsType, NeuroInputsType} from "../../types/net.types";

const BIAS = 0;

export class Neuron implements INeuron {
    private _weights: NeuroWeightsType;
    private _inputs: NeuroInputsType;
    private _layer: Layer;
    private _index: number;
    public id;
    error: number;

    constructor(layer?, index?, weights: NeuroWeightsType = [], id?) {
        this._layer = layer;
        this._index = index;
        this.id = id;

        if (weights.length) {
            this._weights = weights;
        }
        // log(`created new Neuron #${this._index}`);
    }

    get isNeuron() {
        return true;
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
            id: this.id,
            value: this._inputs ? this.activation() : undefined,
            error: this.error,
            weights: this.weights,
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
            log(`updated weight ${i} ${out} (was ${w}), neuron ${this.activation()}, error ${this.error}, f ${dfde}, input ${i}, ${this._inputs[i]}`);
            return out;
        });
    }

    setLayer(layer: Layer, index: number, id?) {
        this._layer = layer;
        this._index = index;
        this.id = id || this.id;
        return this;
    }

    private generateWeights(length, weigths: Array<number> = []): void {
        this._weights = weigths.length ? weigths : [];
        while (this._weights.length < length) this._weights.push(Math.random() - 0.5);
    }
}
