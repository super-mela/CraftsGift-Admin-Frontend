import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import Moment from 'react-moment';

export default class View extends Component {
    handleBack() {
        this.props.history.goBack();
    }
    render() {
        let self = this.props.location.state
        console.log(self)
        return (
            <div>
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-5 col-md-9 col-lg-6">
                                <h2 className="mt-30 page-title">Orders</h2>
                            </div>
                            <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                                <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                            </div>
                        </div>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li className="breadcrumb-item"><a href="/">Orders</a></li>
                            <li className="breadcrumb-item active">Order invoice</li>
                        </ol>
                        <div className="row">
                            {self ?
                                <div className="col-xl-12 col-md-12">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h2 className="title1458">Invoice</h2>
                                            <span className="order-id">Order {self.invoice}</span>
                                        </div>
                                        <div className="invoice-content">
                                            <div className="row">
                                                <div className="col-lg-6 col-sm-6">
                                                    <div className="ordr-date">
                                                        <b>Order Date :</b> <Moment format='MMMM Do YYYY'>{self.date}</Moment>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6">
                                                    {/* {
                                                        self.Addresses.map((data, index) => ( */}
                                                    <div className="ordr-date right-text" >
                                                        <b>Order Date :</b><br />
                                                        +{self.phone},<br />
                                                        {self.country},<br />
                                                        {self.city},<br />
                                                        {self.address},<br />
                                                        {self.zip},<br />
                                                    </div>
                                                    {/* ))
                                                    } */}
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="card card-static-2 mb-30 mt-30">
                                                        <div className="card-title-2">
                                                            <h4>Recent Orders</h4>
                                                        </div>
                                                        <div className="card-body-table">
                                                            <div className="table-responsive">
                                                                <table className="table ucp-table table-hover">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style={{ width: 130 }}>#</th>
                                                                            {/* <th>Image</th> */}
                                                                            <th>Item</th>
                                                                            <th style={{ width: 150 }} className="text-center">Price</th>
                                                                            <th style={{ width: 150 }} className="text-center">Qty</th>
                                                                            <th style={{ width: 100 }} className="text-center">Total</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {/* {self.Addresses.map((prop) => {
                                                                            return ( */}
                                                                        {self.cart.map((p, index) => (
                                                                            <tr key={index}>
                                                                                <td>{p.productId}</td>
                                                                                {/* <td >
                                                                                            <img src={p.photo} alt="cartimage" style={{ height: '50px' }} />
                                                                                        </td> */}
                                                                                <td>
                                                                                    {p.name}
                                                                                </td>
                                                                                <td className="text-center">${p.price}</td>
                                                                                <td className="text-center">{p.quantity}</td>
                                                                                <td className="text-center">${parseFloat(p.price) * parseFloat(p.quantity)}</td>
                                                                            </tr>
                                                                        ))}
                                                                        {/* );
                                                                        })} */}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7" />
                                                <div className="col-lg-5">
                                                    <div className="order-total-dt">
                                                        <div className="order-total-left-text">
                                                            Discount
                                                        </div>
                                                        <div className="order-total-right-text">
                                                            ${self.discount}
                                                        </div>
                                                    </div>
                                                    <div className="order-total-dt">
                                                        <div className="order-total-left-text">
                                                            Delivery Fees
                                                        </div>
                                                        <div className="order-total-right-text">
                                                            ${self.shippingCost}
                                                        </div>
                                                    </div>
                                                    <div className="order-total-dt">
                                                        <div className="order-total-left-text fsz-18">
                                                            Total Amount
                                                        </div>
                                                        <div className="order-total-right-text fsz-18">
                                                            &#8377;{self.amount}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-7" />
                                                <div className="col-lg-5">
                                                    <div className="select-status">
                                                        <label htmlFor="status">Status*</label>
                                                        <div className="input-group justify-content-between">
                                                            <div className="status-active">
                                                                {self.paymentMethod}
                                                            </div>
                                                            <div className="status-active">
                                                                {self.status}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                : 'Loading'}
                        </div>
                    </div>
                </main>

            </div>
        )
    }
}
