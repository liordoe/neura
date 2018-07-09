import * as React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './layout/Main';
import NetsList from './nets/NetsList';
import NetMain from './net/NetMain';
import Alert from './Alert';
import Configure from "./net/Configure";

const Router: React.StatelessComponent <any> =	() =>
    <Layout>
        <Switch>
            <Route exact path="/" component={NetsList}/>
            <Route exact path="/current" component={NetMain}/>
            <Route exact path="/alert" component={Alert}/>
            <Route exact path="/net/:id" component={NetMain}/>
            <Route exact path="/configure/:id" component={Configure}/>
        </Switch>
    </Layout>;

export default Router;