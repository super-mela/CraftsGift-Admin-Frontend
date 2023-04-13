import React, { Component } from 'react'
import {
    Typography, Button
} from "@material-ui/core";
import { GetCustomerDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
export default class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], searchData: ""
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    async componentDidMount() {
        this.getCustomer();
    }
    async getCustomer() {
        let list = await GetCustomerDetails.getAllCustomerList();
        this.setState({ getList: list.data })
    }
    handleChageSearch = (e) => {
        this.setState({ searchData: e.target.value })
    }
    handleSearch = async () => {
        let list = await GetCustomerDetails.searchCustomer(this.state.searchData);
        if (list) {
            if (list.data) {
                this.setState({ getList: list.data })
            }
            else {
                NotificationManager.error(list.msg, "Customer")
            }
        }
    }
    handlEditRow(row) {
        this.props.history.push({ pathname: `/admin/customer/email/${row.email}/${row.name}` })
    }
    async handlDeleteById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Customer from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetCustomerDetails.getCustomerDeleteById(id);
                    if (value) {
                        NotificationManager.success(value.msg, 'Status');
                        setTimeout(
                            async function () {
                                window.location.reload();
                            },
                            1000
                        );
                    }
                }
            });
    }
    render() {
        const { getList } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Customer</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Customer</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-6 col-md-6">
                        <div className="bulk-section mt-30">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search" onChange={(e) => this.handleChageSearch(e)} />
                                <div className="input-group-append">
                                    <button className="status-btn hover-btn" type="submit" onClick={this.handleSearch}>Search</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <button className="view-all-btn hover-btn" type="submit" onClick={() => this.getCustomer()}>View All</button>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>All Areas</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                <th style={{ width: 60 }}>ID</th>
                                                <th>Full Name</th>
                                                <th>Email</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {getList.map((row, index) => (
                                                <tr key={index}>
                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={7} /></td>
                                                    <td>{++index}</td>
                                                    <td>{row.name}</td>
                                                    <td>{row.email}</td>
                                                    <td className="action-btns">
                                                        {/* <Edit state={row} /> */}
                                                        <Typography onClick={(e) => this.handlEditRow(row)} className="email-btn" ><i className="fas fa-envelope" /></Typography>
                                                    </td>
                                                </tr>
                                            ))}
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
