import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import { GetSettingDetails } from '../../../../services';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';

export default class AboutUs extends Component {
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

    handleFounderMeta = async (e) => {
        console.log(this.state.founder)
        this.setState({ founders: [...this.state.founders, this.state.founder] })
        this.setState({ founder: { name: "", proffession: "", priview: "", founderimage: "", founderfilename: "" } })
    }
    onFileChange = (event) => {
        this.setState({ ...this.state, founder: { ...this.state.founder, priview: URL.createObjectURL(event.target.files[0]), founderfilename: new Date().getTime() + "." + event.target.files[0].type.split("/")[1], founderimage: event.target.files[0] } });
    };

    onSideFileChange = (event) => {
        this.setState({ sidefilename: new Date().getTime() + "." + event.target.files[0].type.split("/")[1] })
        this.setState({ sideimage: event.target.files[0] })
        this.setState({ sideprivew: URL.createObjectURL(event.target.files[0]) })
    };
    onBannerFileChange = (event) => {
        this.setState({ bannerfilename: new Date().getTime() + "." + event.target.files[0].type.split("/")[1] })
        this.setState({ bannerimage: event.target.files[0] })
        this.setState({ bannerprivew: URL.createObjectURL(event.target.files[0]) })
    };

    handleRemovesFounders = async (index) => {
        this.state.founders.splice(index, 1)
        this.setState({ founder: { name: "", proffession: "", priview: "", image: "", filename: "" } })
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
        console.log(this.state)
        const formData = new FormData();
        formData.append("title", title);
        formData.append("paragraph1", paragraph1);
        formData.append("paragraph2", paragraph2);
        formData.append("paragraph3", paragraph3);
        formData.append("paragraph4", paragraph4);
        formData.append("card1", JSON.stringify(card1));
        formData.append("card2", JSON.stringify(card2));
        formData.append("founders", JSON.stringify(founders));
        formData.append("sideimage", sideimage, sidefilename);
        formData.append("bannerimage", bannerimage, bannerfilename);
        for (var row of founders) {
            formData.append(row.founderfilename, row.founderimage, row.founderfilename);
            console.log(formData.get(row.founderfilename))

        }
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
                        <h2 className="mt-30 page-title">Categories</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Setting</li>
                    <li className="breadcrumb-item active">About Us</li>
                </ol>
                <div className="row">
                    <div className="col-lg-6 col-md-6 card-static-2">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add/Update About Us</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group">
                                        <label className="form-label">Title*</label>
                                        <input type="text" className="form-control" placeholder="Title" name="title" value={this.state.title} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Paragraph 1*</label>
                                        <textarea rows={5} type="text" className="form-control" placeholder="Paragraph 1" name="paragraph1" value={this.state.paragraph1} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Paragraph 2*</label>
                                        <textarea rows={5} type="text" className="form-control" placeholder="Paragraph 2" name="paragraph2" value={this.state.paragraph2} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className='row'>
                                        <div className="col-lg-6 col-md-6 py-2 ">
                                            <div className='p-2 bg-light rounded'>
                                                <label className="form-label">Card 1</label>
                                                <div className="form-group">
                                                    <label className="form-label">Title*</label>
                                                    <input type="text" className="form-control" placeholder="Card Title" name="title" value={this.state.card1.title} onChange={(e) => this.handleCard1(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Sub Title*</label>
                                                    <input type="text" className="form-control" placeholder="Card SubTitle" name="subTitle" value={this.state.card1.subTitle} onChange={(e) => this.handleCard1(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Paragraph*</label>
                                                    <textarea rows={3} type="text" className="form-control" placeholder="Card Paragraph" name="paragraph" value={this.state.card1.paragraph} onChange={(e) => this.handleCard1(e)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6  py-2">
                                            <div className='bg-light p-2 rounded'>
                                                <label className="form-label">Card 2</label>
                                                <div className="form-group">
                                                    <label className="form-label">Title*</label>
                                                    <input type="text" className="form-control" placeholder="Card title" name="title" value={this.state.card2.title} onChange={(e) => this.handleCard2(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Sub Title*</label>
                                                    <input type="text" className="form-control" placeholder="Card subTitle" name="subTitle" value={this.state.card2.subTitle} onChange={(e) => this.handleCard2(e)} />
                                                </div>
                                                <div className="form-group">
                                                    <label className="form-label">Paragraph*</label>
                                                    <textarea rows={3} type="text" className="form-control" placeholder="Card paragraph" name="paragraph" value={this.state.card2.paragraph} onChange={(e) => this.handleCard2(e)} />
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 d-flex  ">
                        <div className="h-100 card-static-2 d-flex flex-column justify-content-between">

                            <div className="card-title-2">
                                <h4>Side Image</h4>
                            </div>
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
                                        src={this.state.sideprivew}
                                        decoding="async" data-nimg="intrinsic"
                                        srcset={`${this.state.sideprivew} w=108 q=75 1x, ${this.state.sideprivew}w=1920 q=75 2x`}
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
                        </div>

                    </div>
                </div >
                <div className='row'>
                    <div className="form-group col-12">
                        <label className="form-label">Paragraph 3*</label>
                        <textarea rows={5} type="text" className="form-control" placeholder="Paragraph 3" name="paragraph3" value={this.state.paragraph3} onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="form-group col-12">
                        <label className="form-label">Paragraph 4*</label>
                        <textarea rows={5} type="text" className="form-control" placeholder="Paragraph 4" name="paragraph4" value={this.state.paragraph4} onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="form-group col-12 card-static-2">
                        <span style={{ boxSizing: 'border-box', display: 'inline-block', overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px', position: "relative", maxWidth: '100%' }}>
                            <span style={{ boxSizing: 'border-box', display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px', maxWidth: '100%' }}>
                                <img
                                    alt=""
                                    aria-hidden="true"
                                    src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%271920%27%20height=%27570%27/%3e"
                                    style={{ display: "block", maxWidth: '100%', width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px' }} />
                            </span>
                            <img
                                alt="About Us"
                                src={this.state.bannerprivew}
                                decoding="async"
                                data-nimg="intrinsic"
                                className="block rounded-lg"
                                srcset={`${this.state.bannerprivew}w=1920 q=75 1x, ${this.state.bannerprivew}w=3840 q=75 2x`}
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
                    <div className=" mb-0 row mx-0">
                        <div className='row d-flex  flex-row'>
                            <div className="text-right col-lg-2 col-md-4">
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
                                        src={this.state.founder.priview}
                                        decoding="async" data-nimg="intrinsic"
                                        srcset={`${this.state.founder.priview} w=108 q=75 1x, ${this.state.founder.priview}w=1920 q=75 2x`}
                                        style={{ position: "absolute", inset: '0px', boxSizing: 'border-box', padding: '0px', border: "none", margin: "auto", display: "block", width: '0px', height: '0px', minWidth: '100%', maxWidth: '100', minHeight: '100%', maxHeight: '100%' }} />
                                </span>
                                <input type="text" className="form-control" placeholder="Full Name" name="name" value={this.state.founder.name} onChange={(e) => this.handleFounder(e)} />
                                <input type="text" className="form-control" placeholder="Profession" name="proffession" value={this.state.founder.proffession} onChange={(e) => this.handleFounder(e)} />
                                <input
                                    accept="image/*"
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange={this.onFileChange}
                                />
                                <button className='btn' onClick={this.handleFounderMeta}>+</button>
                            </div>

                            {this.state.founders.map((item, key) => (
                                <div className=' col-lg-2 col-md-4 flex-column' key={key}>
                                    {/* <label className="form-label mb-0 ml-2">{item}</label> */}
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
                                            src={item.priview}
                                            decoding="async" data-nimg="intrinsic"
                                            srcset={`${item.priview} w=108 q=75 1x, ${item.priview}w=1920 q=75 2x`}
                                            style={{ position: "absolute", inset: '0px', boxSizing: 'border-box', padding: '0px', border: "none", margin: "auto", display: "block", width: '0px', height: '0px', minWidth: '100%', maxWidth: '100', minHeight: '100%', maxHeight: '100%' }} />
                                    </span>

                                    <label className="form-label py-2 mb-0 ml-2">{item.name}</label><br />
                                    <label className="form-label py-2 mb-0 ml-2">{item.proffession}</label>
                                    <div className='text-right'>
                                        <button className='btn ' onClick={() => this.handleRemovesFounders(key)}>x</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add/Update</button>

            </div >

        )
    }
}
