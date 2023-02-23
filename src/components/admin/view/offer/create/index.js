import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import { GetOfferDetails } from '../../../../services';
import Edit from './edit'
import swal from 'sweetalert';
export default class MainOffer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '', coupon: "", discount: "", image: "", leastAmount: "", expiresIn: "", getList: [],
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    async getOffer() {
        let list = await GetOfferDetails.getOfferList();
        this.setState({ getList: list.data })
    }
    async componentDidMount() {
        this.getOffer();
    }
    formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            houre = d.getHours(),
            min = '' + d.getMinutes(),
            sec = "" + d.getSeconds();
        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [year, month, day, " ", sec, min, houre].join('-');
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { name, coupon, discount, leastAmount, expiresIn, image } = this.state;
        let data = { name: name, coupon: coupon, discount: discount, leastAmount: leastAmount, expiresIn: expiresIn, image: image };
        console.log(data)
        swal({
            title: "Are you sure?",
            text: "You want to Add New Offer",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetOfferDetails.createOfferList(data);
                    if (list) {
                        this.setState({ name: "", coupon: "", discount: "", leastAmount: "", expiresIn: "", image: "" })
                        this.getOffer();
                    }
                }
            });
    }
    render() {
        let self = this.state.getList
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Categories</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Category</li>
                </ol>
                <div className="row">
                    <div className="col-lg-4 col-md-5">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add Main Category</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="news-content-right pd-20">
                                    <div className="form-group">
                                        <label className="form-label">Name*</label>
                                        <input type="text" className="form-control" placeholder="name" name="name" value={this.state.name} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="form-label">Coupon*</label>
                                        <div className='d-flex'>
                                            <input type="text" className="form-control" placeholder="Coupon" name="coupon" value={this.state.coupon} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="form-label">Discount*</label>
                                        <div className='d-flex'>
                                            <input type="text" className="form-control" placeholder="discount" name="discount" value={this.state.discount} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                    </div>     <div className="form-group mb-0">
                                        <label className="form-label">Least Amount*</label>
                                        <div className='d-flex'>
                                            <input type="text" className="form-control" placeholder="Least Amount" name="leastAmount" value={this.state.leastAmount} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                    </div>     <div className="form-group mb-0">
                                        <label className="form-label">Expired Date*</label>
                                        <div className='d-flex'>
                                            <input type="datetime-local" className="form-control" placeholder="Expires In" name="expiresIn" value={this.state.expiresIn} onChange={(e) => this.handleChange(e)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Image*</label>
                                        <input type="text" className="form-control" placeholder="Image link" name="image" value={this.state.image} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add New</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7">
                        <div className="all-cate-tags">
                            <div className="row justify-content-between">
                                <div className="col-lg-12 col-md-12">
                                    <div className="card card-static-2 mb-30">
                                        <div className="card-title-2">
                                            <h4>All Main Categories</h4>
                                        </div>
                                        <div className="card-body-table">
                                            <div className="table-responsive">
                                                <table className="table ucp-table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th style={{ width: 60 }}><input type="checkbox" className="check-all" /></th>
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Coupon</th>
                                                            <th scope="col">Discount</th>
                                                            <th scope="col">Least Amount</th>
                                                            <th scope="col">Expire Date</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            self.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                    <td>{row.name}</td>
                                                                    <td>{row.coupon}</td>
                                                                    <td>{row.discount}</td>
                                                                    <td>{row.leastAmount}</td>
                                                                    <td>
                                                                        <span className="delivery-time">{this.formatDate(row.expiresIn)}</span>
                                                                    </td>
                                                                    <td className="action-btns">
                                                                        <Edit state={row} getOffer={this.getOffer} />
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}
