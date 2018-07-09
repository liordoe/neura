import * as React from 'react';
import {ListGroupItem, Badge} from 'react-bootstrap'
import {Link} from "react-router-dom";

export interface NetElementProps {
    layers: Array<any>;
    depth: number;
    id: string;
}

export default class NetElement extends React.Component<NetElementProps, any> {
    constructor(props) {
        super(props);

        this.setAsCurrent = this.setAsCurrent.bind(this);
    }

    setAsCurrent(id) {

    }

    render(): JSX.Element {
        const {layers, id, depth} = this.props;
        return (
            <ListGroupItem className="net-list-element">
                <Link className="id" to={`/net/${id}`}>{id}</Link>
                <span className="depth"><Badge>{depth}</Badge></span>
                <span className="layers">[
                    {
                        layers.slice(0, -1).map((l, i) => <span key={i}>{l.depth},</span>)
                    }
                ]</span>
                <span className="buttons">
                    <Link to={`/configure/${id}`}>Configure</Link>
                </span>
            </ListGroupItem>
        );
    }
}