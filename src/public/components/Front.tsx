import * as React from 'react';
import {connect} from 'react-redux';
import NetsList from './nets/NetsList';


export class Front extends React.Component<any, any> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div className="main">
                <NetsList/>
            </div>
        );
    };
}

const mapStateToProps = (state, ownProps) => {
    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Front);