import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import List from './list';
import MainOffer from './create';


export default class Category extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/list`]} component={List} />
                        <Route path={[`${match.path}/create`]} component={MainOffer} />
                    </Switch>
                </main>
            </div>
        );
    }
}