import './styles/app.scss';
import './index.html';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Router from './components/Router';
import Store from './stores/Main';

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render():JSX.Element {
        return (
            <Provider store={Store}>
                <BrowserRouter>
                    <Router/>
                </BrowserRouter>
            </Provider>
        );
    }
}

const rootContainer: HTMLElement = document.getElementById('app');
ReactDOM.render(
    <Main/>,
    rootContainer
);
