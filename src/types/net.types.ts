import {Neuron} from "../lib/network/neuron";
import {LastLayer, Layer} from "../lib/network/layer";

export type NeuroInputsType = Array<number>;
export type NeuroWeightsType = Array<number>;

export type INetOptions = Array<number | Layer | LastLayer>;
export type NetTeacherType = Object & {
    factor: number;
    eps?:number;
};

export type NeuronInfoType = Object & {
    id?;
    value?: number;
    weights: NeuroWeightsType;
    inputs?: NeuroInputsType;
    error?: number;
};

export type LayerInfoType = Object & {
    id?;
    depth: number;
    neurons: Array<NeuronInfoType>;
};

export type NetInfoType = Object & {
    id?;
    learning?: boolean;
    depth: number;
    layers: Array<LayerInfoType>;
};

export interface INeuron {
    weights: NeuroWeightsType;
    activation: () => number;
    info: () => Object & NeuronInfoType;
    // generateWeights: () => void;
}

export interface ILayer {
    index: number;
    neurons: Array<Neuron>;
    info: () => LayerInfoType;
}

export interface INet {
    layers: Array<Layer | LastLayer>;
    info: () => NetInfoType;
}