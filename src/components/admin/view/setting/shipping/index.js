import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import { GetSettingDetails } from '../../../../services';
import swal from 'sweetalert';
import { NotificationManager } from 'react-notifications';
import { API_URL } from '../../../../../config';

export default class ShippingType extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shippers: [],
            shipper: {
                name: "",
                discription: "",
                price: "",
            },
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    getShippers = async () => {
        let list = await GetSettingDetails.getShipper();
        const shippers = list.shipper
        this.setState({ ...this.state, ...shippers })
    }
    async componentDidMount() {
        this.getShippers();
    }
    handleshipperMeta = async (e) => {
        this.setState({ shippers: [...this.state.shippers, this.state.shipper] })
        this.setState({ shipper: { name: "", discription: "", price: "" } })
    }

    handleRemovesshippers = async (index) => {
        this.state.shippers.splice(index, 1)
        this.setState({ shipper: { name: "", discription: "", price: "" } })
        const data = this.state;

        await GetSettingDetails.getUpdateShippers({ data })
            .then((response) => {
                if (response) {
                    this.getShippers()
                }
            })
            .catch((error) => console.log(error))
    }
    handleshipper = (e) => {
        this.setState({ ...this.state, shipper: { ...this.state.shipper, [e.target.name]: e.target.value } })
    }
    handleSubmit = async event => {
        event.preventDefault();
        const { shippers } = this.state
        swal({
            title: "Are you sure?",
            text: "You want to Add/update Shipping Type",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetSettingDetails.createShippers({ shippers });
                    if (list) {
                        NotificationManager.success("Shipping type Add/Update Successfuly", "Shipping Types")
                    }
                }
            });
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row ">
                    <div className="col-lg-5 col-md-9 col-lg-6 ">
                        <h2 className="mt-30 page-title">Shipping Type</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i class="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Setting</li>
                    <li className="breadcrumb-item active">Shipping Type</li>
                </ol>
                <div className="row card-static-2">
                    <div className="col-lg-12 col-md-12 ">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Add/Update Shipping Type</h4>
                            </div>
                        </div>
                    </div>
                    <div className="text-right col-lg-6 col-md-6 col-sm-12">
                        <input type="text" className="form-control mb-2" placeholder="Shipping company" name="name" value={this.state.shipper.name} onChange={(e) => this.handleshipper(e)} />
                        <input type="text" className="form-control mb-2" placeholder="Discription" name="discription" value={this.state.shipper.discription} onChange={(e) => this.handleshipper(e)} />
                        <input type="number" className="form-control" placeholder="price" name="price" value={this.state.shipper.price} onChange={(e) => this.handleshipper(e)} />
                        <button className='btn' onClick={this.handleshipperMeta}>+</button>
                    </div>
                    {this.state.shippers.map((item, key) => (
                        <div className=' col-lg-6 col-md-6 col-sm-12 flex-column shadow-lg mb-2' key={key}>
                            <label className="form-label py-2 mb-0 ml-2">{item.name}</label><br />
                            <label className="form-label py-2 mb-0 ml-2">{item.discription}</label><br />
                            <label className="form-label py-2 mb-0 ml-2">${item.price}</label>
                            <div className='text-right'>
                                <button className='btn ' onClick={() => this.handleRemovesshippers(key)}>x</button>
                            </div>
                        </div>
                    ))}
                </div >
                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Add/Update</button>
            </div >

        )
    }
}
