import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { getCookie } from '../../../function';

export default class Sidebar extends Component {
    render() {
        let role = getCookie("role");
        return (
            <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                    <div className="sb-sidenav-menu">
                        <div className="nav">
                            <a className="nav-link active" href="/">
                                <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" /></div>
                                Dashboard
                            </a>

                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseProducts" aria-expanded="false" aria-controls="collapseProducts">
                                <div className="sb-nav-link-icon"><i className="fas fa-box" /></div>
                                Products
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>
                            <div className="collapse" id="collapseProducts" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link sub_nav_link" href="#/admin/product/list">All Products</a>
                                    <a className="nav-link sub_nav_link" href="#/admin/product/create">Add Product</a>
                                    <a className="nav-link sub_nav_link" href="#/admin/product/more-photo">Add More Image</a>
                                </nav>
                            </div>
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseCategories" aria-expanded="false" aria-controls="collapseCategories">
                                <div className="sb-nav-link-icon"><i className="fas fa-list" /></div>
                                Categories
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>
                            <div className="collapse" id="collapseCategories" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link sub_nav_link" href="#admin/category/list">All Categories</a>
                                    <a className="nav-link sub_nav_link" href="#/admin/category/create">Add Category</a>
                                </nav>
                            </div>
                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseOffers" aria-expanded="false" aria-controls="collapseOffers">
                                <div className="sb-nav-link-icon"><i className="fas fa-gift" /></div>
                                Offers
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down" /></div>
                            </a>
                            <div className="collapse" id="collapseOffers" aria-labelledby="headingTwo" data-parent="#sidenavAccordion">
                                <nav className="sb-sidenav-menu-nested nav">
                                    <a className="nav-link sub_nav_link" href="#admin/offer/list">All Offers</a>
                                    <a className="nav-link sub_nav_link" href="#/admin/offer/create">Add Offers</a>
                                </nav>
                            </div>
                            <a className={role === "admin" ? "nav-link" : "d-none"} href="#/admin/user/list">
                                <div className="sb-nav-link-icon"><i className="fas fa-users" /></div>
                                Roles Management
                            </a>
                            <a className="nav-link" href="#/admin/customer/list">
                                <div className="sb-nav-link-icon"><i className="fas fa-users" /></div>
                                Customers
                            </a>
                            <a className="nav-link" href="#/admin/payment/list">
                                <div className="sb-nav-link-icon"><i className="fas fa-users" /></div>
                                Payment
                            </a>

                        </div>
                    </div>
                </nav>
            </div>

        );
    }
}
