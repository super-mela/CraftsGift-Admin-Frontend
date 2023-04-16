import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import ChangePassword from './changepassword';
import Edit from './edit';

export default class Profile extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    <Switch>
                        <Route path={[`${match.path}/changepassword`]} component={ChangePassword} />
                        {/* <Route path={[`${match.path}/create`]} component={Create} /> */}
                        <Route path={[`${match.path}/edit`]} component={Edit} />
                    </Switch>
                </main>
            </div>
        );
    }
}