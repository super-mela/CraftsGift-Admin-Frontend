import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import AboutUs from './aboutUs';

export default class Setting extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    {/* <HashRouter> */}
                    <Switch>
                        <Route path={[`${match.path}/aboutus`]} component={AboutUs} />
                        {/* <Route path={[`${match.path}/edit`]} component={Edit} />
                        <Route path={[`${match.path}/create`]} component={Createproduct} />
                        <Route path={[`${match.path}/more-photo`]} component={Uploadphoto} /> */}
                    </Switch>
                    {/* </HashRouter> */}
                </main>
            </div>
        );
    }
}