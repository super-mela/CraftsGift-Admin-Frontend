import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import { GetSettingDetails } from '../../../../../services';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
import { API_URL } from '../../../../../../config';

export default class CategoryAdvert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            founders: [],
            paragraph1: "",
            paragraph2: "",
            paragraph3: "",
            paragraph4: "",
            sidefilename: "",
            sideimage: "",
            sideprivew: "",
            card1: {
                title: "",
                subTitle: "",
                paragraph: ""
            },
            card2:
            {
                title: "",
                subTitle: "",
                paragraph: ""
            },
            bannerfilename: "",
            bannerimage: "",
            bannerprivew: "",
            founder: {
                name: "",
                proffession: "",
                priview: "",
                founderimage: "",
                founderfilename: "",
            },
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day].join('-');
    }
    getAboutUs = async () => {
        let list = await GetSettingDetails.getAboutUs();
        const aboutus = list.aboutus
        this.setState({ ...this.state, ...aboutus })
    }
    async componentDidMount() {
        this.getAboutUs();
    }
    handleFounderMeta = async (e) => {
        this.setState({ founders: [...this.state.founders, this.state.founder] })
        this.setState({ founder: { name: "", proffession: "", priview: "", founderimage: "", founderfilename: "" } })
    }
    onFileChange = (event) => {
        this.setState({ ...this.state, founder: { ...this.state.founder, priview: URL.createObjectURL(event.target.files[0]), founderfilename: new Date().getTime() + "." + event.target.files[0].type.split("/")[1], founderimage: event.target.files[0] } });
    };

    onSideFileChange = (event) => {
        this.setState({ sidefilename: this.state.sidefilename ? this.state.sidefilename : new Date().getTime() + "." + event.target.files[0].type.split("/")[1] })
        this.setState({ sideimage: event.target.files[0] })
        this.setState({ sideprivew: URL.createObjectURL(event.target.files[0]) })
    };
    onBannerFileChange = (event) => {
        this.setState({ bannerfilename: this.state.bannerfilename ? this.state.bannerfilename : new Date().getTime() + "." + event.target.files[0].type.split("/")[1] })
        this.setState({ bannerimage: event.target.files[0] })
        this.setState({ bannerprivew: URL.createObjectURL(event.target.files[0]) })
    };

    handleRemovesFounders = async (index) => {
        const remove = this.state.founders[index]
        this.state.remove = remove
        this.state.founders.splice(index, 1)
        this.setState({ founder: { name: "", proffession: "", priview: "", image: "", filename: "" } })
        const data = this.state;

        await GetSettingDetails.getUpdateAboutUs({ data })
            .then((response) => {
                if (response) {
                    this.getAboutUs()
                }
            })
            .catch((error) => console.log(error))
    }
    handleFounder = (e) => {
        this.setState({ ...this.state, founder: { ...this.state.founder, [e.target.name]: e.target.value } })
    }
    handleCard1 = (e) => {
        this.setState({ ...this.state, card1: { ...this.state.card1, [e.target.name]: e.target.value } })
    }
    handleCard2 = (e) => {
        this.setState({ ...this.state, card2: { ...this.state.card2, [e.target.name]: e.target.value } })
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { title, founders, paragraph1, paragraph2, paragraph3, paragraph4, sidefilename, sideimage, card1, card2, bannerfilename, bannerimage } = this.state

        const formData = new FormData();
        formData.append("title", title);
        formData.append("paragraph1", paragraph1);
        formData.append("paragraph2", paragraph2);
        formData.append("paragraph3", paragraph3);
        formData.append("paragraph4", paragraph4);
        formData.append("card1", JSON.stringify(card1));
        formData.append("card2", JSON.stringify(card2));
        formData.append("sidefilename", sidefilename);
        formData.append("bannerfilename", bannerfilename);
        sideimage && formData.append("sideimage", sideimage, sidefilename);
        bannerimage && formData.append("bannerimage", bannerimage, bannerfilename);
        for (var index in founders) {
            founders[index].founderimage && formData.append(founders[index].founderfilename, founders[index].founderimage, founders[index].founderfilename);
            founders[index].priview = ""
            founders[index].founderimage = ""
        }
        formData.append("founders", JSON.stringify(founders));
        swal({
            title: "Are you sure?",
            text: "You want to Add/update About Us",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetSettingDetails.createAboutUs(formData);
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
                        <h2 className="mt-30 page-title">Category Advertisment</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Setting</li>
                    <li className="breadcrumb-item active">Category Advert</li>
                </ol>
                <div className="row card-static-2">
                    <div className="col-lg-12 col-md-12 card-static-2">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add/Update Category Advert</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6x d-flex flex-column justify-content-center'>
                        <label className="form-label py-2 mb-0 ml-2">Title:</label>
                        <input type="text" className="form-control mb-2" placeholder="Title" name="name" value={this.state.founder.name} onChange={(e) => this.handleFounder(e)} />
                        <label className="form-label py-2 mb-0 ml-2">Sub Title:</label>
                        <input type="text" className="form-control" placeholder="Sub Title" name="proffession" value={this.state.founder.proffession} onChange={(e) => this.handleFounder(e)} />
                    </div>
                    <div className="col-lg-6 col-md-6">
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
                                        alt='About Us'
                                        src={this.state.sideprivew ? this.state.sideprivew : API_URL + "/aboutus/" + this.state.sidefilename}
                                        decoding="async" data-nimg="intrinsic"
                                        srcset={`${this.state.sideprivew ? this.state.sideprivew : API_URL + "/aboutus/" + this.state.sidefilename} w=108 q=75 1x, ${this.state.sideprivew ? this.state.sideprivew : API_URL + "/aboutus/" + this.state.sidefilename}w=1920 q=75 2x`}
                                        style={{ position: "absolute", inset: '0px', boxSizing: 'border-box', padding: '0px', border: "none", margin: "auto", display: "block", width: '0px', height: '0px', minWidth: '100%', maxWidth: '100', minHeight: '100%', maxHeight: '100%' }} />
                                </span>

                            </div>
                            <div className="form-group pb-4">

                                <input
                                    accept="image/*"
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange={this.onSideFileChange}
                                />
                            </div>
                            <div className='text-right'>
                                <button className='btn' onClick={this.handleFounderMeta}>+</button>
                            </div>
                        </div>
                    </div>
                </div >
                <div className='row'>
                    <div className=" mb-0 row mx-0">
                        {this.state.founders.map((item, key) => (
                            <div className=' col-lg-6 col-md-6 flex-column p-4' key={key}>
                                <div className='d-flex  flex-row rounded-lg py-2' style={{ backgroundColor: "#dad7cd" }}>
                                    <div className=' col-lg-6 col-md-6 d-flex flex-column justify-content-center'>
                                        <label className="form-label py-2 mb-0 ml-2">{item.name}</label>
                                        <label className="form-label py-2 mb-0 ml-2" style={{ color: "gray" }}>{item.proffession}</label>
                                    </div>
                                    <div className=' col-lg-6 col-md-6 '>
                                        <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px', position: "relative", maxWidth: '100%' }}>
                                            <span style={{ boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px', maxWidth: '100%' }}>
                                                <img
                                                    alt=""
                                                    aria-hidden="true"
                                                    src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27920%27%20height=%27750%27/%3e"
                                                    style={{ display: "block", maxWidth: '100%', width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px' }} />
                                            </span>
                                            <img
                                                alt='Founder'
                                                src={item.priview ? item.priview : API_URL + "/aboutus/founders/" + item.founderfilename}
                                                decoding="async" data-nimg="intrinsic"
                                                srcset={`${item.priview ? item.priview : API_URL + "/aboutus/founders/" + item.founderfilename} w=108 q=75 1x, ${item.priview ? item.priview : API_URL + "/aboutus/founders/" + item.founderfilename}w=1920 q=75 2x`}
                                                style={{ position: "absolute", inset: '0px', boxSizing: 'border-box', padding: '0px', border: "none", margin: "auto", display: "block", width: '0px', height: '0px', minWidth: '100%', maxWidth: '100', minHeight: '100%', maxHeight: '100%' }} />
                                        </span>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <button className='btn' onClick={() => this.handleRemovesFounders(key)}>x</button>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add/Update</button>

            </div >

        )
    }
}
