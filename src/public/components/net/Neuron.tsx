import * as React from 'react';
const PRE_OFFSET = 1500;

export class Neuron extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.renderWeights = this.renderWeights.bind(this);
    }

    renderWeights(weights) {
        // console.log(Math.max(...weights), Math.min(...weights));
        return weights.map((w, i) => {
            // console.log(w);
            const weight = Math.abs(w);
            return <line key={w*i} x1={0} x2={500} y1={0} y2={500}
                    stroke="#dedede"
                    strokeOpacity={0.6}
                    strokeWidth={w}/>
        });
    }

    render(): JSX.Element {
        const {weights = [], value = 1, index, total, drawW} = this.props;
        const OFFSET = PRE_OFFSET / total;
        const radius = 1 / (value + 0.1) + 3;
        const offset = (OFFSET / radius) + OFFSET * index;
        return (
            <g transform={`translate(${offset}, 0)`}>
                <circle className="neuron" r={radius}/>
                {
                    drawW &&
                    this.renderWeights(weights)
                }
            </g>
        );
    }
}