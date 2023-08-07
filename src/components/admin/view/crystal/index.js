import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import List from './list';
import Createcrystal from './new-add';
import Edit from './edit';
import Uploadphoto from './crystal-slider';

export default class Crystal extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    {/* <HashRouter> */}
                    <Switch>
                        <Route exact path={[`${match.path}/list`]} component={List} />
                        <Route path={[`${match.path}/edit`]} component={Edit} />
                        <Route path={[`${match.path}/create`]} component={Createcrystal} />
                        <Route path={[`${match.path}/more-photo`]} component={Uploadphoto} />
                    </Switch>
                    {/* </HashRouter> */}
                </main>
            </div>
        );
    }
}