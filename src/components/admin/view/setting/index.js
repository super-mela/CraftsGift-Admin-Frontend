import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import AboutUs from './aboutUs';
import BannerImage from './banner';
import ShippingType from './shipping';
import CategoryAdvert from './advertisemnt/category';
import Slider from './advertisemnt/slider';
import AdvertBanner from './advertisemnt/banner';

export default class Setting extends Component {
    render() {
        const { match } = this.props;
        return (
            <div id="layoutSidenav_content">
                <main>
                    {/* <HashRouter> */}
                    <Switch>
                        <Route path={[`${match.path}/aboutus`]} component={AboutUs} />
                        <Route path={[`${match.path}/bannerimage`]} component={BannerImage} />
                        <Route path={[`${match.path}/shippingtype`]} component={ShippingType} />
                        <Route path={[`${match.path}/categoryadvert`]} component={CategoryAdvert} />
                        <Route path={[`${match.path}/slider`]} component={Slider} />
                        <Route path={[`${match.path}/advertbanner`]} component={AdvertBanner} />
                    </Switch>
                    {/* </HashRouter> */}
                </main>
            </div>
        );
    }
}