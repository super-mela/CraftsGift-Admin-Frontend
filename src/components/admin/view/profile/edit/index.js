import React, { Component } from 'react'
import {
    Button, Paper
} from "@material-ui/core";
import { GetUserLogin } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import Loader from '../../../../loader';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false, _id: "", email: "", firstName: "", lastName: "", address: "",
            phoneNo: null,
        }
    }

    async componentDidMount() {
        this.handeleGetUser()
    }
    handeleGetUser() {
        GetUserLogin.getUserByToken()
            .then((user) => {
                this.setState({ ...user.data })
            }).catch((error) => {
                console.log(error)
            })
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleBack(e) {
        this.props.history.goBack();
    }
    handleSubmit = async () => {
        this.setState({ isLoaded: true })

        // perform all neccassary validations

        let { _id, email, firstName, lastName, address, phoneNo } = this.state;
        let data = { _id: _id, firstName: firstName, lastName, address: address, phoneNo: phoneNo, email: email }
        // make API call
        let user = await GetUserLogin.getUserUpdate(data);
        if (user) {
            this.setState({ isLoaded: false })
            this.props.history.goBack();
            NotificationManager.success("Update success", 'Edit Profile');
        } else {
            NotificationManager.error("Check field", 'Input');
        }
    }
    render() {
        let { isLoaded, firstName, lastName, email, phoneNo, address } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Update User</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item">Dashboard</li>
                    <li className="breadcrumb-item">User</li>
                </ol>
                <Paper className="user-management" style={{ padding: "1rem" }}>
                    {
                        isLoaded ? <Loader /> : null
                    }
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label>First Name</label>
                            <input type="text" className="form-control " name="firstName" value={firstName} onChange={(e) => this.handleChange(e)} />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Last Name</label>
                            <input type="text" className="form-control " name="lastName" value={lastName} onChange={(e) => this.handleChange(e)} />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Email</label>
                            <input type="text" className="form-control " name="email" value={email} disabled />
                        </div>
                        <div className="col-md-6 form-group">
                            <label>Phone Number</label>
                            <input type="number" className="form-control " name="phoneNo" value={phoneNo} onChange={(e) => this.handleChange(e)} />
                        </div>
                        <div className="col-md-12 form-group">
                            <label>Address</label>
                            <input type="text" className="form-control " name="address" value={address} onChange={(e) => this.handleChange(e)} />
                        </div>
                    </div>
                    <button className="btn btn-success col-sm-3 mt-3 py-2" onClick={this.handleSubmit}>Update</button>
                </Paper>

            </div>
        )
    }
}
