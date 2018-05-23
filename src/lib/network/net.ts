import {Layer, LastLayer} from "./layer";
import {log} from "../../server/services/utils";
import {INet, NetInfoType, NetTeacherType, NeuroInputsType, INetOptions} from "../../types/net.types";

export class Net implements INet {
    private _layers: Array<Layer | LastLayer>;

    constructor(options: INetOptions) {
        this._layers = options.map((depth, i) => new Layer(i, depth, this));
        this._layers.push(new LastLayer(this.layers.length, this));
        log(`created Net with ${this.layers.length} layers (1 additional last)`);
    }

    get layers() {
        return this._layers;
    }

    get depth() {
        return this.layers.length;
    }

    info(): NetInfoType {
        return {
            depth: this._layers.length,
            layers: this._layers.map(l => l.info()),
        };
    }

    calculate(inputs: NeuroInputsType): number {
        const [first] = this._layers;
        first.setInputs(inputs);
        let layer;
        for (let i = 1; i < this.layers.length; i++) {
            layer = this.layers[i];
            layer.setInputs(this.layers[i-1].calculate());
        }
        return layer.calculate()[0];
    }

    learn(inputs: Array<NeuroInputsType>, teacher: NetTeacherType): Net {
        let i = 0;
        for (let input of inputs) {
            this.learnIteration(input, teacher);
            i++;
        }
        console.log(`${i} iteractions of learning ago`);
        return this;
    }

    learnIteration(inputs: NeuroInputsType, teacher: NetTeacherType): Net {
        const { correct, factor } = teacher;
        const result = this.calculate(inputs);

        let last = this.layers.slice(-1)[0] as LastLayer ;
        const reverse: Array<Layer> = this.layers.slice(0, -1).reverse(); // all layers except right one, reverted
        last.error = correct - result;
        log(`calculated error for last layer, error ${last.error}, correct ${correct}, y ${result}`);

        let previous = last as Layer;
        for (let layer of reverse) {
            layer.setErrors(previous);
            previous = layer;
        }

        for (let layer of this.layers) {
            layer.updateWeights(correct, factor);
        }
        return this;
    }
}