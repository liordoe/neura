import * as React from 'react';
import Header from './Header';

export default class Layout extends React.Component {
    render(): JSX.Element {
        return (
            <div id="main-page-block">
                <Header/>
                <div className="container main-container">
                    {this.props.children}
                </div>
            </div>
        );
    };
}