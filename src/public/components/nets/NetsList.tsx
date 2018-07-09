import * as React from 'react';
import {connect} from 'react-redux';
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';
import NetElement from './NetElement';
import {getAll} from "../../actions/NetActions";
import {Link} from "react-router-dom";

export class NetsList extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {all} = this.props;
        !all.length && getAll();
    }

    render(): JSX.Element {
        const { all } = this.props;
        return (
            <ListGroup className="nets-list">
                <ListGroupItem className="net-list-element">
                    <span className="id">Id</span>
                    <span className="depth">Depth</span>
                    <span className="layers">Layers</span>
                    <span className="buttons"></span>
                </ListGroupItem>
                {
                    all.map((n, i)=> <NetElement key={i} {...n}/>)
                }
            </ListGroup>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        all: state.Nets.getIn(['all'], {})
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NetsList);