import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import { GetSettingDetails } from '../../../../services';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
import { API_URL } from '../../../../../config';

export default class BannerImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerfilename: "",
            bannerimage: "",
            bannerprivew: "",
        }
    }

    handleBack() {
        this.props.history.goBack();
    }
    getAboutUs = async () => {
        let list = await GetSettingDetails.getBannerImage();
        const banner = list.banner
        this.setState({ ...this.state, ...banner })
    }
    async componentDidMount() {
        this.getAboutUs();
    }

    onBannerFileChange = (event) => {
        this.setState({ bannerfilename: this.state.bannerfilename ? this.state.bannerfilename : new Date().getTime() + "." + event.target.files[0].type.split("/")[1] })
        this.setState({ bannerimage: event.target.files[0] })
        this.setState({ bannerprivew: URL.createObjectURL(event.target.files[0]) })
    };

    handleSubmit = async event => {
        event.preventDefault();
        const { bannerfilename, bannerimage } = this.state
        const formData = new FormData();
        bannerimage && formData.append("bannerimage", bannerimage, bannerfilename);
        formData.append("bannerfilename", bannerfilename);
        swal({
            title: "Are you sure?",
            text: "You want to Add/update Banner Iamge",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetSettingDetails.createBannerIamge(formData);
                    if (list) {
                        NotificationManager.success("About Us Add/Update Successfuly", "About Us")
                    }
                }
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-lg-5 col-md-9 col-lg-6 ">
                        <h2 className="mt-30 page-title">Banner Image</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Setting</li>
                    <li className="breadcrumb-item active">Banner Image</li>
                </ol>
                <div className='row'>
                    <div className="form-group col-12 card-static-2">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add/Update Banner Image</h4>
                            </div>
                        </div>
                        <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px', position: "relative", maxWidth: '100%' }}>
                            <span style={{ boxSizing: 'border-box', display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px', maxWidth: '100%' }}>
                                <img
                                    alt=""
                                    aria-hidden="true"
                                    src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%271920%27%20height=%27570%27/%3e"
                                    style={{ display: "block", maxWidth: '100%', width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px' }} />
                            </span>
                            <img
                                alt="Banner Image"
                                src={this.state.bannerprivew ? this.state.bannerprivew : API_URL + "/bannerimage/" + this.state.bannerfilename}
                                decoding="async"
                                data-nimg="intrinsic"
                                className="block rounded-lg"
                                srcset={`${this.state.bannerprivew ? this.state.bannerprivew : API_URL + "/bannerimage/" + this.state.bannerfilename}w=1920 q=75 1x, ${this.state.bannerprivew ? this.state.bannerprivew : API_URL + "/bannerimage/" + this.state.bannerfilename}w=3840 q=75 2x`}
                                style={{ position: "absolute", inset: '0px', boxSizing: 'border-box', padding: '0px', border: 'none', margin: "auto", display: "block", width: '0px', height: '0px', minWidth: '100%', maxWidth: '100%', minHeight: '100%', maxHeight: '100%' }} />
                        </span>
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
                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add/Update</button>

            </div >

        )
    }
}
