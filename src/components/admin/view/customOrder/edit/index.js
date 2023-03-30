import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
import { GetCustomOrderDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import Moment from 'react-moment';
import { API_URL } from '../../../../../config';


export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.location.state.row._id, status: this.props.location.state.row.status, deliverydate: '', compos: ""
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleUpdateStatus = async (event) => {
        let data = { status: this.state.status, _id: this.state._id, deliverydate: new Date(this.state.deliverydate) }
        if (data) {
            let update = await GetCustomOrderDetails.getCustomeOrderStatusUpdate(data);
            if (update) {
                NotificationManager.success(update.msg, 'Status');
                setTimeout(
                    async function () {
                        window.location.href = "#/admin/customorder/list"
                    },
                    1000
                );
            } else {
                NotificationManager.error("Check Status", "Status");
            }
        }
    }

    handleEmail = async () => {
        const data = { description: this.state.compos, email: this.props.location.state.row.email, orderId: this.props.location.state.row.orderId }
        if (data) {
            let email = await GetCustomOrderDetails.getCustomOrderEmailSend(data);
            if (email) {
                NotificationManager.success(email.msg, 'Status');
                setTimeout(
                    async function () {
                        window.location.href = "#/admin/customorder/list"
                    },
                    1000
                );
            }
        }
        else {
            NotificationManager.error("Compose Email", "Email")
        }

    }

    render() {
        let self = this.props.location.state.row;
        return (
            <div>
                <main>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-5 col-md-9 col-lg-6">
                                <h2 className="mt-30 page-title">Orders</h2>
                            </div>
                            <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                                <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                            </div>
                        </div>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                            <li className="breadcrumb-item"><a href="/">Orders</a></li>
                            <li className="breadcrumb-item active">Order Edit</li>
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
                                                        {self.zip},<br />
                                                        <br />
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
                                                <div className="col-lg-7" >
                                                    <div className="select-status">
                                                        <label htmlFor="status">Email</label>
                                                        <div className="input-group">
                                                            <textarea
                                                                placeholder='Compose email...'
                                                                className="custom-text"
                                                                name='compos'
                                                                rows={6}
                                                                value={this.state.email}
                                                                onChange={(e) => this.handleChange(e)}
                                                            />
                                                        </div>
                                                        <div className="order-total-dt">
                                                            <div className="order-total-right-text">
                                                                <button className="status-btn hover-btn" type="submit" onClick={this.handleEmail}>Send Email</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-5">
                                                    <div className="select-status">
                                                        <label htmlFor="status">Delivery Date*</label>
                                                        <div className="input-group">
                                                            <input className="custom-select" type="date" name="deliverydate" value={this.state.deliverydate} onChange={(e) => this.handleChange(e)} />
                                                        </div>
                                                    </div>
                                                    <div className="select-status">
                                                        <label htmlFor="status">Status*</label>
                                                        <div className="input-group">
                                                            <select id="status" name="status" className="custom-select" value={this.state.status} onChange={(e) => this.handleChange(e)}>
                                                                <option value="pendding">Pending</option>
                                                                <option value="shipping">Shipping</option>
                                                                <option value="delieverd">Delivered</option>
                                                                <option value="cancel">Cancel</option>
                                                            </select>
                                                            <div className="input-group-append">
                                                                <button className="status-btn hover-btn" type="submit" onClick={this.handleUpdateStatus}>Submit</button>
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
