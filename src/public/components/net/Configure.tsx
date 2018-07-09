import * as React from 'react';
import {connect} from 'react-redux';
import {getNet} from "../../actions/NetActions";
import {Link} from "react-router-dom";
import {Well, Button, ButtonToolbar, Badge, Collapse, ListGroup, ListGroupItem} from "react-bootstrap";

export interface NetMainState {
    showJson: boolean;
}

export class NetMain extends React.Component<any, NetMainState> {
    constructor(props) {
        super(props);

        this.state = {
            showJson: false,
        };

        this.renderLayers = this.renderLayers.bind(this);
        this.renderNeurons = this.renderNeurons.bind(this);
    }

    componentDidMount() {
        let {current: {id}}= this.props;
        id = id ||  this.props.match.params.id;
        getNet(id);
    }

    renderNeurons(layer) {
        return layer.neurons.map((n, i) => <div className="neuron" key={i}>
            <span>Neuron #{i+1}</span>
            <span className="id">ID: {n.id}</span>
            <span className="weights">Веса: {n.weights.join(',')}</span>
            <br/>
        </div>)
    }

    renderLayers() {
        const { layers = [] } = this.props.current;
        return layers.slice(0, -1).map((l, i) =>
            <div key={i} className="layer">
                <span>Layer #{i+1}</span>
                <span>{ this.renderNeurons(l) }</span>
                <Button>Add New Neuron</Button>
            </div>
        );
    }

    render(): JSX.Element {
        const { current } = this.props;
        const { id } = current.asMutable();

        return (
            <div id='configure'>
                <span className="id">ID: {id}</span>
                <br/>
                <div className="layers">
                    { this.renderLayers() }
                    <div className="layer">
                        <Button>Add New Layer</Button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        current: state.Nets.getIn(['current'], {})
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NetMain);