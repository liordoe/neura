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

        this.toggleJson = this.toggleJson.bind(this);
        this.renderLayers = this.renderLayers.bind(this);
    }

    componentDidMount() {
        let {current: {id}}= this.props;
        id = id ||  this.props.match.params.id;
        getNet(id);
    }

    toggleJson() {
        const {showJson} = this.state;
        this.setState({ showJson: !showJson });
    }

    renderLayers() {
        const { layers } = this.props.current;
        return layers.map((l, i) => <ListGroupItem key={i} className="layer" style={{display: 'flex'}}>
            <span>Layer #{i+1}</span>
            &nbsp;
            <span>Neurons: {l.depth}</span>
        </ListGroupItem>);
    }

    render(): JSX.Element {
        const { current } = this.props;
        const { id, layers, depth } = current;
        const { showJson } = this.state;

        return id ?
            <div id='net'>
                <div className="info">
                    <span className="id">ID: {id}</span>
                    <span className="depth">Layers count: <Badge>{depth}</Badge></span>
                    <ButtonToolbar className="buttons">
                        {/* Standard button */}
                        <Button bsStyle="success">Apply</Button>
                        <Button bsStyle="primary">Train</Button>
                        <Button bsStyle="warning">Clear net</Button>
                        <Button bsStyle="danger">Delete net</Button>
                    </ButtonToolbar>
                </div>
                <ListGroup className="layers-list">
                    { this.renderLayers() }
                </ListGroup>
                <Button className="toggle-json" onClick={this.toggleJson}>Toggle json view</Button>
                <Collapse className="json" in={showJson}>
                    <pre>
                        {JSON.stringify(current, null, 4) }
                    </pre>
                </Collapse>
            </div>
            :
            <Well className="no-content">
                <Link to="/">
                    No current net selected. Go to nets list
                </Link>
            </Well>;
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