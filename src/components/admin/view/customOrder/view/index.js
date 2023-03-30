import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import Moment from 'react-moment';
import { API_URL } from '../../../../../config';

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
                            <li className="breadcrumb-item active">Order Request</li>
                        </ol>
                        <div className="row">
                            {self ?
                                <div className="col-xl-12 col-md-12">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h2 className="title1458">Request</h2>
                                            <span className="order-id">Order ID: {self.orderId}</span>
                                        </div>
                                        <div className="invoice-content">
                                            <div className="row">
                                                <div className="col-lg-6 col-sm-6">
                                                    <div className="ordr-date">
                                                        <b>Order Date :</b> <Moment format='MMMM Do YYYY'>{self.date}</Moment>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-sm-6">

                                                    <div className="ordr-date right-text" >
                                                        <b>Client Address :</b><br />
                                                        +{self.phone},<br />
                                                        {self.country},<br />
                                                        {self.city},<br />
                                                        {self.address},<br />
                                                        {self.zip},<br /><br />
                                                    </div>

                                                </div>
                                                <div className="col-lg-5" >
                                                    <div >
                                                        <img className='image-card' src={API_URL + "/customorder/" + self.image} alt="Custom order" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-7">
                                                    <div className="order-total-dt text-display">
                                                        <div className="order-total-left-text">
                                                            Discription:
                                                        </div>
                                                        <div className="order-total-justify-text">
                                                            {"  "}  {self.description}
                                                        </div>

                                                    </div>

                                                </div>
                                                <div className="col-lg-7" />
                                                <div className="col-lg-5">
                                                    <div className="select-status">
                                                        <label htmlFor="status">Status*</label>
                                                        <div className="input-group justify-content-between">
                                                            <div className="status-active">
                                                                {/* {self.paymentMethod} */}
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
