import React, { Component } from 'react'
import { Button } from "@material-ui/core";
import { GetSettingDetails } from '../../../../../services';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
import { API_URL } from '../../../../../../config';

export default class AdvertBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moto: "",
            title: "",
            description: "",
            caption: "",
            link: "",
            priview: "",
            advertbannerimage: "",
            advertbannerfilename: "",

        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    getadvertbanner = async () => {
        let list = await GetSettingDetails.getAdvertBanner();
        const banner = list.banner
        this.setState({ ...this.state, ...banner })
    }
    async componentDidMount() {
        this.getadvertbanner();
    }

    onBannerFileChange = (event) => {
        this.setState({ priview: URL.createObjectURL(event.target.files[0]), advertbannerfilename: new Date().getTime() + "." + event.target.files[0].type.split("/")[1], advertbannerimage: event.target.files[0] });
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { moto, title, description, caption, link, advertbannerimage, advertbannerfilename } = this.state
        const formData = new FormData();
        formData.append("moto", moto);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("caption", caption);
        formData.append("link", link);
        formData.append("advertbannerfilename", advertbannerfilename);
        formData.append("advertbannerimage", advertbannerimage, advertbannerfilename);
        swal({
            title: "Are you sure?",
            text: "You want to Add/update Advertisement Banner",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetSettingDetails.createAdvertBanner(formData);
                    if (list) {
                        NotificationManager.success("advertbanners Add/Update Successfuly", "advertbanners")
                    }
                }
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-lg-5 col-md-9 col-lg-6 ">
                        <h2 className="mt-30 page-title">Home page Advertisement Banner</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Setting</li>
                    <li className="breadcrumb-item active">Advertisement banner</li>
                </ol>
                <div className="row card-static-2">
                    <div className="col-lg-12 col-md-12 card-static-2">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add/Update Advertisement banner</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-8 col-md-12 d-flex flex-column justify-content-center'>
                        <label className="form-label py-2 mb-0 ml-2">Moto:</label>
                        <input type="text" className="form-control mb-2" placeholder="Moto" name="moto" value={this.state.moto} onChange={(e) => this.handleChange(e)} />
                        <label className="form-label py-2 mb-0 ml-2">Title:</label>
                        <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                        <label className="form-label py-2 mb-0 ml-2">Description:</label>
                        <textarea rows={2} type="text" className="form-control" placeholder="Descrption" name="description" value={this.state.description} onChange={(e) => this.handleChange(e)} />
                        <label className="form-label py-2 mb-0 ml-2">Button Caption :</label>
                        <input type="text" className="form-control" placeholder="Button Caption" name="caption" value={this.state.caption} onChange={(e) => this.handleChange(e)} />
                        <label className="form-label py-2 mb-0 ml-2">Button link:</label>
                        <input type="text" className="form-control" placeholder="Button Link" name="link" value={this.state.link} onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="col-lg-4 col-md-12">
                        <div className="h-100 card-static-2 d-flex flex-column justify-content-between">
                            <div className="card-body-table">
                                <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px', position: "relative", maxWidth: '100%' }}>
                                    <span style={{ boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px', maxWidth: '100%' }}>
                                        <img
                                            alt=""
                                            aria-hidden="true"
                                            src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27920%27%20height=%27750%27/%3e"
                                            style={{ display: "block", maxWidth: '100%', width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px' }} />
                                    </span>
                                    <img
                                        alt='Advertisement Banner'
                                        src={this.state.priview ? this.state.priview : API_URL + "/advertbanner/" + this.state.advertbannerfilename}
                                        decoding="async" data-nimg="intrinsic"
                                        srcset={`${this.state.priview ? this.state.priview : API_URL + "/advertbanner/" + this.state.advertbannerfilename} w=108 q=75 1x, ${this.state.priview ? this.state.priview : API_URL + "/advertbanner/" + this.state.advertbannerfilename}w=1920 q=75 2x`}
                                        style={{ position: "absolute", inset: '0px', boxSizing: 'border-box', padding: '0px', border: "none", margin: "auto", display: "block", width: '0px', height: '0px', minWidth: '100%', maxWidth: '100', minHeight: '100%', maxHeight: '100%' }} />
                                </span>
                            </div>
                            <div className="form-group pb-4">
                                <input
                                    accept="image/*"
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange={this.onBannerFileChange}
                                />
                            </div>
                        </div>
                    </div>
                </div >
                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add/Update</button>
            </div >
        )
    }
}
