import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import { GetPaymentDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import Loader from '../../../../loader';
import swal from 'sweetalert';
export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], isLoaded: false, searchData: ""
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    async componentDidMount() {
        this.setState({ isLoaded: true })
        this.getAllPayment();
    }
    async getAllPayment() {
        let list = await GetPaymentDetails.getAllPaymentList();
        if (list) {
            this.setState({ getList: list.data, isLoaded: false })
        }
    }
    async handleChangeStatus(e) {
        let { value } = e.target;
        this.setState({ isloaded: true });
        let list = await GetPaymentDetails.searchPaymentList(value);
        if (list) {
            if (list.payment) {
                this.setState({ getList: list.payment, isloaded: false });
            }
            else {
                NotificationManager.error(list.msg, "Payments");
                this.setState({ isloaded: false });
            }
        }
    }
    handleChangeSearch = (e) => {
        this.setState({ searchData: e.target.value })
    }
    handeleSearch = async () => {
        this.setState({ isloaded: true });
        let list = await GetPaymentDetails.searchPaymentList(this.state.searchData);
        if (list) {
            console.log(list)
            if (list.payment) {
                this.setState({ getList: list.payment, isloaded: false });
            }
            else {
                NotificationManager.error(list.msg, "Payments");
                this.setState({ isloaded: false });
            }
        }
    }
    render() {
        const { getList, isLoaded } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Payment List</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item">Dashboard</li>
                    <li className="breadcrumb-item active">payment</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-6 col-md-6">
                        <div className="bulk-section mt-30 ">
                            <div className="input-group">
                                <input className="form-control" placeholder="Search" onChange={(e) => this.handleChangeSearch(e)} />
                                <button className="status-btn hover-btn" type="submit" onClick={this.handeleSearch} >Search</button>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="bulk-section mt-30 ">
                            <div className="input-group">
                                <b style={{ marginRight: "15px", display: "flex", alignItems: "center" }}>Select Status:</b>
                                <select
                                    id="categeory"
                                    className="form-control"
                                    name="status"
                                    onChange={(e) => this.handleChangeStatus(e)}
                                >
                                    <option selected disabled>Select Status</option>
                                    <option value="pending">Processing</option>
                                    <option value="shipping">Shipping</option>
                                    <option value="delieverd">Delivered</option>
                                    <option value="cancel">Cancel</option>
                                </select>

                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        {
                            isLoaded ? <Loader /> : ''
                        }
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>All Payments</h4>
                                <button onClick={() => this.getAllPayment()} className="view-btn hover-btn">View All</button>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                <th style={{ width: 60 }}>ID</th>
                                                <th>Date</th>
                                                <th>Customer</th>
                                                <th>OrderId</th>
                                                <th>Transaction Amount</th>
                                                <th>Payment Type</th>
                                                <th>Payment Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                getList.map((row, index) => (
                                                    <tr key={index}>
                                                        <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={7} /></td>
                                                        <td>{++index}</td>
                                                        <td>{row.date}</td>
                                                        <td>{row.firstname + ' ' + row.lastname}</td>
                                                        <td>{row.invoice}</td>
                                                        <td>{row.amount}$</td>
                                                        <td>{row.paymentMethod}</td>
                                                        <td>{row.status === "payed" ? <span className="text-success">success</span> : <span className="text-danger">pendding</span>}</td>

                                                    </tr>
                                                ))
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
