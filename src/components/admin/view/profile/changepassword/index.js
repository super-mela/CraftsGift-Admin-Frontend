import React, { Component } from 'react'
import {
    Button, Paper
} from "@material-ui/core";
import { GetUserLogin } from '../../../../services';
import { NotificationManager } from 'react-notifications';
import Loader from '../../../../loader';

export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            password: null, confirmPassword: null, oldpassword: null
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleBack(e) {
        this.props.history.goBack();
    }
    handleSubmit = async () => {
        this.setState({ isLoaded: true })

        const { password, confirmPassword } = this.state;
        // perform all neccassary validations
        if (password !== confirmPassword) {
            alert("Passwords don't match");
        } else {
            let { oldpassword, password } = this.state;
            let data = { oldpassword: oldpassword, password: password }
            // make API call
            let user = await GetUserLogin.getUserUpdatePassword(data);
            if (user) {
                this.setState({ isLoaded: false })
                this.props.history.goBack();
                NotificationManager.success("Password Changed successfull", 'Password Changed');
            } else {
                NotificationManager.error("Check Input field!", 'Input');
            }
        }
    }
    render() {
        let { isLoaded, oldpassword, confirmPassword, password } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Change Password</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item">Dashboard</li>
                    <li className="breadcrumb-item">Change Password</li>
                </ol>
                <Paper className="user-management" style={{ padding: "1rem" }}>
                    {
                        isLoaded ? <Loader /> : null
                    }
                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label>Old Password</label>
                            <input type="password" className="form-control " name="oldpassword" value={oldpassword} onChange={(e) => this.handleChange(e)} />
                        </div>
                        <div className="col-md-6 " />

                        <div className="col-md-6 form-group">
                            <label>Password</label>
                            <input type="password" className="form-control " name="password" value={password} onChange={(e) => this.handleChange(e)} />
                        </div>
                        <div className="col-md-6 " />

                        <div className="col-md-6 form-group">
                            <label>Confirm Password</label>
                            <input type="password" className="form-control " name="confirmPassword" value={confirmPassword} onChange={(e) => this.handleChange(e)} />
                        </div>
                    </div>
                    <button className="btn btn-success col-sm-3 mt-3 py-2" onClick={this.handleSubmit}>Apply</button>
                </Paper>

            </div>
        )
    }
}
