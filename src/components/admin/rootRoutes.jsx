import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Header from './header';
import Home from './dashboard';
import SideBar from './sidebar';
import Product from './view/product'
import Category from './view/category';
import Order from './view/order';
import Customer from './view/customer';
import User from './view/user';
import Payment from './view/payment';
import Offer from './view/offer';
import CustomOrder from './view/customOrder';
import Setting from './view/setting';
import Profile from './view/profile';
import Crystal from './view/crystal';

export default class rootRoutes extends Component {
  render() {
    const { match } = this.props;
    return (
      <main>
        <Header />
        <div id="layoutSidenav">
          <SideBar />
          <Switch>
            <Route exact path={[`${match.path}/home`, `${match.path}`]} component={Home} />
            <Route path={`${match.path}/product`} component={Product} />
            <Route path={`${match.path}/crystal`} component={Crystal} />
            <Route path={`${match.path}/category`} component={Category} />
            <Route path={`${match.path}/order`} component={Order} />
            <Route path={`${match.path}/customorder`} component={CustomOrder} />
            <Route path={`${match.path}/customer`} component={Customer} />
            <Route path={`${match.path}/offer`} component={Offer} />
            <Route path={`${match.path}/user`} component={User} />
            <Route path={`${match.path}/payment`} component={Payment} />
            <Route path={`${match.path}/setting`} component={Setting} />
            <Route path={`${match.path}/profile`} component={Profile} />


          </Switch>

        </div>
      </main>
    );
  }
}