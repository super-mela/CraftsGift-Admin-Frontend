import React, { Component } from 'react'
import { Button, Paper } from "@material-ui/core";
import Loader from '../../../../loader';
import { GetCustomerDetails } from '../../../../services';
import { NotificationManager } from 'react-notifications';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        let { email, name } = this.props.match.params;
        this.state = {
            isLoaded: false, email: email, fullname: name, subject: "", message: null
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit = async () => {
        this.setState({ isLoaded: true })
        let { email, fullname, subject, message } = this.state;
        let data = { fullname: fullname, email: email, subject: subject, message: message }
        // make API call
        let user = await GetCustomerDetails.sendCustomerEmail(data);
        if (user) {
            this.setState({ isLoaded: false })
            this.props.history.goBack();
            NotificationManager.success("Update success", 'Message');
        } else {
            NotificationManager.error("Check field", 'Input');
        }
    }

    render() {
        let { isLoaded, fullname, email, message, subject, } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Send Email</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Customer</li>
                </ol>
                <div className="row justify-content-center">
                    <Paper className="user-management" style={{ padding: "1rem" }}>
                        {
                            isLoaded ? <Loader /> : null
                        }
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>First Name</label>
                                <input type="text" className="form-control " name="fullname" value={fullname} disabled />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Email</label>
                                <input type="text" className="form-control " name="email" value={email} disabled />
                            </div>
                            <div className="col-md-12 form-group">
                                <label>Subject</label>
                                <input type="text" className="form-control " name="subject" value={subject} onChange={(e) => this.handleChange(e)} />
                            </div>
                            <div className="col-md-12 form-group">
                                <label>Message</label>
                                <textarea rows={5} type="text" className="form-control " name="message" value={message} onChange={(e) => this.handleChange(e)} />
                            </div>
                        </div>
                        <button className="btn btn-success col-sm-3 mt-3 py-2 float-right" onClick={this.handleSubmit}>Send Email</button>
                    </Paper>
                </div>
            </div>

        )
    }
}
