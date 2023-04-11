import React, { Component } from 'react'
import { Button } from "@material-ui/core";
import { GetSettingDetails } from '../../../../../services';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
import { API_URL } from '../../../../../../config';

export default class Slider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sliders: [],
            slider: {
                title: "",
                subtitle: "",
                priview: "",
                sliderimage: "",
                sliderfilename: "",
            },
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    getSlider = async () => {
        let list = await GetSettingDetails.getSlider();
        const aboutus = list.aboutus
        this.setState({ ...this.state, ...aboutus })
    }
    async componentDidMount() {
        this.getSlider();
    }
    handlesliderMeta = async (e) => {
        this.setState({ sliders: [...this.state.sliders, this.state.slider] })
        this.setState({ slider: { title: "", subtitle: "", priview: "", sliderimage: "", sliderfilename: "" } })
    }
    onSideFileChange = (event) => {
        this.setState({ ...this.state, slider: { ...this.state.slider, priview: URL.createObjectURL(event.target.files[0]), sliderfilename: new Date().getTime() + "." + event.target.files[0].type.split("/")[1], sliderimage: event.target.files[0] } });
    };
    handleRemovessliders = async (index) => {
        const remove = this.state.sliders[index]
        this.state.remove = remove
        this.state.sliders.splice(index, 1)
        this.setState({ slider: { title: "", subtitle: "", priview: "", image: "", filename: "" } })
        const data = this.state;
        if (!remove.priview) {
            await GetSettingDetails.getUpdateSlider({ data })
                .then((response) => {
                    if (response) {
                        this.getSlider()
                    }
                })
                .catch((error) => console.log(error))
        }
    }
    handleslider = (e) => {
        this.setState({ ...this.state, slider: { ...this.state.slider, [e.target.name]: e.target.value } })
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { sliders } = this.state
        const formData = new FormData();
        for (var index in sliders) {
            sliders[index].sliderimage && formData.append(sliders[index].sliderfilename, sliders[index].sliderimage, sliders[index].sliderfilename);
            sliders[index].priview = ""
            sliders[index].sliderimage = ""
        }
        formData.append("sliders", JSON.stringify(sliders));
        swal({
            title: "Are you sure?",
            text: "You want to Add/update Sliders",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetSettingDetails.createSliders(formData);
                    if (list) {
                        NotificationManager.success("Sliders Add/Update Successfuly", "Sliders")
                    }
                }
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-lg-5 col-md-9 col-lg-6 ">
                        <h2 className="mt-30 page-title">Slider</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Setting</li>
                    <li className="breadcrumb-item active">Slider</li>
                </ol>
                <div className="row card-static-2">
                    <div className="col-lg-12 col-md-12 card-static-2">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add/Update Slider</h4>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 col-md-6x d-flex flex-column justify-content-center'>
                        <label className="form-label py-2 mb-0 ml-2">Title:</label>
                        <input type="text" className="form-control mb-2" placeholder="Title" name="title" value={this.state.slider.title} onChange={(e) => this.handleslider(e)} />
                        <label className="form-label py-2 mb-0 ml-2">Sub Title:</label>
                        <input type="text" className="form-control" placeholder="Sub Title" name="subtitle" value={this.state.slider.subtitle} onChange={(e) => this.handleslider(e)} />
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
                                        alt='Sliders'
                                        src={this.state.slider.priview}
                                        decoding="async" data-nimg="intrinsic"
                                        srcset={`${this.state.slider.priview} w=108 q=75 1x, ${this.state.slider.priview}w=1920 q=75 2x`}
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
                                <button className='push-btn' onClick={this.handlesliderMeta}>+</button>
                            </div>
                        </div>
                    </div>
                </div >
                <div className='row'>
                    <div className=" mb-0 row mx-0">
                        {this.state.sliders.map((item, key) => (
                            <div className=' col-lg-6 col-md-6 flex-column p-4' key={key}>
                                <div className='d-flex  flex-row rounded-lg py-2' style={{ backgroundColor: "#dad7cd" }}>
                                    <div className=' col-lg-6 col-md-6 d-flex flex-column justify-content-center'>
                                        <label className="form-label py-2 mb-0 ml-2">{item.title}</label>
                                        <label className="form-label py-2 mb-0 ml-2" style={{ color: "gray" }}>{item.subtitle}</label>
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
                                                alt='slider'
                                                src={item.priview ? item.priview : API_URL + "/slider/" + item.sliderfilename}
                                                decoding="async" data-nimg="intrinsic"
                                                srcset={`${item.priview ? item.priview : API_URL + "/slider/" + item.sliderfilename} w=108 q=75 1x, ${item.priview ? item.priview : API_URL + "/slider/" + item.sliderfilename}w=1920 q=75 2x`}
                                                style={{ position: "absolute", inset: '0px', boxSizing: 'border-box', padding: '0px', border: "none", margin: "auto", display: "block", width: '0px', height: '0px', minWidth: '100%', maxWidth: '100', minHeight: '100%', maxHeight: '100%' }} />
                                        </span>
                                    </div>
                                </div>
                                <div className='text-right'>
                                    <button className='remove-btn hover-btn' onClick={() => this.handleRemovessliders(key)}>x</button>
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
