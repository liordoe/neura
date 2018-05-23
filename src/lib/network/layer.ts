import {Neuron} from "./neuron";
import {Net} from "./net";
import {log} from "../../server/services/utils";
import {LayerInfoType, ILayer, NeuroInputsType} from "../../types/net.types";

export class Layer implements ILayer {
    protected _index: number;
    protected _depth: number;
    protected _neurons: Array<Neuron>;
    protected _net: Net;

    constructor(index: number, depth: number, net: Net) {
        this._index = index;
        this._depth = depth;
        this._neurons = [];
        this._net = net;
        for (let i = 0; i < depth; i++) {
            this._neurons.push(new Neuron(this, i));
        }
        log(`created Layer #${this._index}, with ${this._depth} neurons allowed`);
    }

    get index() {
        return this._index;
    }

    get neurons() {
        return this._neurons || [];
    }

    get errors() {
        return this.neurons.map(n => n.error) || [];
    }

    setInputs(inputs: NeuroInputsType): Layer {
        this._neurons.forEach(n => {
            n.inputs = inputs;
        });
        return this;
    }

    setErrors(layer: Layer): Layer {
        this.neurons.forEach((n, i) => {
            let weights = [], message = ' ';
            n.error = layer.errors.reduce((res, err, j) => {
                weights.push(layer.neurons[j].weights[i]);
                message += `${err} * ${layer.neurons[j].weights[i]} + `;
                return res + ( err * layer.neurons[j].weights[i] )
            }, 0);
            log(`calculated ${message.slice(0, -3)}, result: ${n.error}, neuron ${i}, layer ${this.index}, weights ${weights}`);
        });
        return this;
    }

    updateWeights(t: number, f: number) {
        this.neurons.forEach((n) => {
            n.updateWeights(t, f);
        });
        return this;
    }

    calculate() {
        return this._neurons.map(neuron => {
           return neuron.activation();
        });
    }

    info(): LayerInfoType {
        return {
            depth: this._depth,
            neurons: this._neurons.map(n => n.info())
        };
    }
}

export class LastLayer extends Layer {
    private _neuron;
    constructor(index: number, net: Net) {
        super(index, 1, net);
        this._neuron = this._neurons[0];
    }

    get error(): number {
        return this._neuron.error;
    }

    set error(error: number) {
        this._neuron.error = error;
    }
}