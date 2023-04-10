import React, { Component } from 'react'
import { Button } from "@material-ui/core";
import { GetSettingDetails } from '../../../../../services';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
import { API_URL } from '../../../../../../config';

export default class CategoryAdvert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            catadverts: [],
            catadvert: {
                title: "",
                subtitle: "",
                priview: "",
                categoryimage: "",
                categoryfilename: "",
            },
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    getCartAdvert = async () => {
        let list = await GetSettingDetails.getCatAdvert();
        const catadvert = list.catadvert
        this.setState({ ...this.state, ...catadvert })
    }
    async componentDidMount() {
        this.getCartAdvert();
    }
    handlecatadvertMeta = async (e) => {
        console.log(this.state.catadvert)
        this.setState({ catadverts: [...this.state.catadverts, this.state.catadvert] })
        this.setState({ catadvert: { title: "", subtitle: "", priview: "", categoryimage: "", categoryfilename: "" } })
    }
    onFileChange = (event) => {
        this.setState({ ...this.state, catadvert: { ...this.state.catadvert, priview: URL.createObjectURL(event.target.files[0]), categoryfilename: new Date().getTime() + "." + event.target.files[0].type.split("/")[1], categoryimage: event.target.files[0] } });
    };

    handlecatadvert = (e, i) => {

        this.setState({ ...this.state, catadvert: { ...this.state.catadvert, [e.target.name]: e.target.value } })
    }
    handleRemovesCatAdvert = async (index) => {
        const remove = this.state.catadverts[index]
        this.state.remove = remove
        this.state.catadverts.splice(index, 1)
        this.setState({ catadvert: { title: "", subtitle: "", priview: "", categoryimage: "", categoryfilename: "" } })
        const data = this.state;
        if (!remove.priview) {
            await GetSettingDetails.getUpdateCatAdvert({ data })
                .then((response) => {
                    if (response) {
                        this.getAboutUs()
                    }
                })
                .catch((error) => console.log(error))
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { catadverts } = this.state
        if (catadverts.length != 3) {
            NotificationManager.error(`please add additional ${3 - catadverts.length} Category Advertisment`, "Category Advert")
        }
        else {
            const formData = new FormData();
            for (var index in catadverts) {
                catadverts[index].categoryimage && formData.append(catadverts[index].categoryfilename, catadverts[index].categoryimage, catadverts[index].categoryfilename);
                catadverts[index].priview = ""
                catadverts[index].categoryimage = ""
            }
            formData.append("catadverts", JSON.stringify(catadverts));
            swal({
                title: "Are you sure?",
                text: "You want to Add/update Category Advert",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then(async (success) => {
                    if (success) {
                        let list = await GetSettingDetails.createCatAdvert(formData);
                        if (list) {
                            NotificationManager.success("Category Advertisment Add/Update Successfuly", "Category Advert")
                        }
                    }
                });
        }
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
                    {this.state.catadverts.length === 3 ? null :
                        <div className='col-lg-4 col-md-6x'>
                            <div className="card-body-table" style={{ position: "relative", textAlign: "center", color: "white" }}>
                                <div className='txt-overlay'>
                                    <input type="text" className="form-control mb-2 cat-input" placeholder="Title" name="title" value={this.state.catadvert.title} onChange={(e) => this.handlecatadvert(e, 0)} />
                                    <input type="text" className="form-control cat-input" placeholder="Sub Title" name="subtitle" value={this.state.catadvert.subtitle} onChange={(e) => this.handlecatadvert(e)} />
                                </div>
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
                                        src={this.state.catadvert.priview}
                                        decoding="async" data-nimg="intrinsic"
                                        srcset={`${this.state.catadvert.priview} w=108 q=75 1x, ${this.state.catadvert.priview}w=1920 q=75 2x`}
                                        style={{ position: "absolute", inset: '0px', boxSizing: 'border-box', padding: '0px', border: "none", margin: "auto", display: "block", width: '0px', height: '0px', minWidth: '100%', maxWidth: '100', minHeight: '100%', maxHeight: '100%' }} />
                                </span>
                            </div>
                            <div className="form-group pb-4">
                                <input
                                    key={1}
                                    accept="image/*"
                                    type="file"
                                    className="form-control"
                                    name="image"
                                    onChange={this.onFileChange}
                                />
                            </div>
                            <div className='text-right'>
                                <button className='push-btn' onClick={this.handlecatadvertMeta}>+</button>
                            </div>
                        </div>
                    }

                </div >
                <div className='row mt-2'>
                    {this.state.catadverts.map((item, key) => (
                        <div className='col-lg-4 col-md-6x'>
                            <div className="card-body-table " style={{ position: "relative", textAlign: "center", color: "white" }}>
                                <div className='txt-overlay'>
                                    <input type="text" className="form-control mb-2 cat-input" placeholder="Title" name="title" value={item.title} />
                                    <input type="text" className="form-control cat-input" placeholder="Sub Title" name="subtitle" value={item.subtitle} />
                                </div>
                                <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px', position: "relative", maxWidth: '100%' }}>
                                    <span style={{ boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px', maxWidth: '100%' }}>
                                        <img
                                            alt=""
                                            aria-hidden="true"
                                            src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%27920%27%20height=%27750%27/%3e"
                                            style={{ display: "block", maxWidth: '100%', width: "initial", height: "initial", background: "none", opacity: 1, border: '0px', margin: '0px', padding: '0px' }} />
                                    </span>
                                    <img
                                        alt='Category Adevertisment'
                                        src={item.priview ? item.priview : API_URL + "/catadvert/" + item.categoryfilename}
                                        decoding="async" data-nimg="intrinsic"
                                        srcset={`${item.priview ? item.priview : API_URL + "/catadvert/" + item.categoryfilename} w=108 q=75 1x, ${item.priview ? item.priview : API_URL + "/catadvert/" + item.categoryfilename}w=1920 q=75 2x`}
                                        style={{ position: "absolute", inset: '0px', boxSizing: 'border-box', padding: '0px', border: "none", margin: "auto", display: "block", width: '0px', height: '0px', minWidth: '100%', maxWidth: '100', minHeight: '100%', maxHeight: '100%' }} />
                                </span>

                            </div>
                            <div className='text-right'>
                                <button className='remove-btn hover-btn' onClick={() => this.handleRemovesCatAdvert(key)}>x</button>
                            </div>
                        </div>
                    ))}

                </div>
                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add/Update</button>
            </div >

        )
    }
}
