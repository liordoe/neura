import * as React from 'react';
import {Neuron} from "./Neuron";
const OFFSET = 70;

export class Layer extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.renderNeurons = this.renderNeurons.bind(this);
    }

    renderNeurons(neurons, depth, drawWeights) {
        return neurons.map((n, i) => {
            return <Neuron key={i} index={i} {...n} total={depth} drawW={drawWeights}/>;
        });
    }

    render(): JSX.Element {
        const { neurons, index, depth } = this.props;
        const offsetY = OFFSET + OFFSET * index;
        return (
            <g className="layer" transform={`translate(30, ${offsetY})`}>
                { this.renderNeurons(neurons, depth, index !== 0) }
            </g>
        );
    }
}