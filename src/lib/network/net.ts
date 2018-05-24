import {Layer, LastLayer} from "./layer";
import {Neuron} from "./neuron";
import {log} from "../../server/services/utils";
import {INet, NetInfoType, NetTeacherType, NeuroInputsType, INetOptions} from "../../types/net.types";
import {error} from "util";

export class Net implements INet {
    private _layers: Array<Layer | LastLayer>;
    public id;

    constructor(options: INetOptions = []) {
        if (!options.length) {
            return this;
        }
        this._layers = [];
        options.forEach((o: any, i: number) => {
            if (o.isLayer && i < options.length - 1) {
                this._layers.push(o);
            } else if (typeof o === 'number') {
                this._layers.push(new Layer(i, o, this));
            }
        });
        const [last] = options.slice(-1);
        this._layers.push(new LastLayer(this.layers.length, this));
        if (typeof last !== 'number' && last.isLayer) {
            this._layers.forEach((l, i) => l.setNet(this, i));
        }
        log(`created Net with ${this.layers.length} layers (1 additional last)`);
    }

    fromDB(net: NetInfoType) {
        this.id = net.id;
        this._layers = net.layers.map((l, i) => {
            const neurons = l.neurons.map((n) => {
                return new Neuron(null, null, n.weights, n.id);
            });
            let layer;
            if (i < net.layers.length - 1) {
                layer = new Layer(undefined, undefined, undefined, neurons);
            } else {
                layer = new LastLayer(undefined, undefined, neurons[0]);
            }
            layer.setNet(this, i, l.id);
            return layer;
        });

        this.layers.forEach(l => {
            l.neurons.forEach((n, i) => n.setLayer(l, i, n.id));
        })
    }

    get layers() {
        return this._layers;
    }

    get depth() {
        return this.layers.length;
    }

    info(): NetInfoType {
        return {
            id: this.id,
            depth: this._layers.length,
            layers: this._layers.map(l => l.info()),
        };
    }

    calculate(inputs: NeuroInputsType): number {
        const [first] = this._layers;
        let data = inputs.slice(0, 41);
        first.setInputs(data);
        let layer;
        for (let i = 1; i < this.layers.length; i++) {
            layer = this.layers[i];
            layer.setInputs(this.layers[i-1].calculate());
        }
        return layer.calculate()[0];
    }

    learn(inputs: Array<NeuroInputsType>, teacher: NetTeacherType, limit = Number.MAX_VALUE, limitPV = 100): Net {
        let i = 0;
        const { eps = 0.1 } = teacher;
        console.log('learn function starts');
        while (i < limit) {
            for (let input of inputs) {
                let diff = 1, j = 0;
                while(diff > eps && j < limitPV) {
                    diff = this.learnIteration(input, teacher);
                    j++;
                    i++;
                }
                i % 1000 === 0 && console.log(`${i} learning iterations ago`);
            }
        }
        console.log(`${i} iteractions of learning ago`);
        return this;
    }

    learnIteration(inputs: NeuroInputsType, teacher: NetTeacherType): number {
        const { factor } = teacher;
        let [correct, power] = inputs.slice(-2);
        const result = this.calculate(inputs);

        let last = this.layers.slice(-1)[0] as LastLayer;
        let error;
        // shallow copy of all layers except right one, reverted
        const reversed: Array<Layer> = this.layers.slice(0, -1).reverse();
        last.error = error = correct - result;
        log(`calculated error for last layer, error ${last.error}, correct ${correct}, y ${result}`);

        let previous = last as Layer;
        for (let layer of reversed) {
            layer.setErrors(previous);
            previous = layer;
        }

        for (let layer of this.layers) {
            layer.updateWeights(correct, factor);
        }
        return error;
    }
}