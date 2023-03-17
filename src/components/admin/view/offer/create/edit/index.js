import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import { GetOfferDetails } from '../../../../../services';
import { API_URL } from '../../../../../../config';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        console.log(this.props)
        const { name, coupon, discount, leastAmount, expiresIn, image } = this.props.state;
        this.state = {
            name: name, coupon: coupon, discount: discount, leastAmount: leastAmount, expiresIn: expiresIn, image: image, filename: image, oldfilename: image, preview: null
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onFileChange = event => {
        this.setState({ filename: this.state.oldfilename.split(".")[0] + "." + event.target.files[0].type.split("/")[1] });
        this.setState({ image: event.target.files[0] });
        const objectUrl = URL.createObjectURL(event.target.files[0])
        this.setState({ preview: objectUrl })
    };
    handleOpen() {
        this.setState({ open: !this.state.open, loading: true })
    }

    handleClose() {
        this.setState({ open: !this.state.open })
    }
    async handleSubmit(e) {
        const { name, coupon, discount, leastAmount, expiresIn, image, filename, preview } = this.state;
        const formData = new FormData();
        formData.append("_id", this.props.state._id);
        formData.append("name", name);
        formData.append("coupon", coupon);
        formData.append("discount", discount);
        formData.append("leastAmount", leastAmount);
        formData.append("expiresIn", expiresIn);
        preview && formData.append("image", image, filename);
        // let data = { _id: this.props.state._id, name: this.state.name, coupon: this.state.coupon, discount: this.state.discount, leastAmount: this.state.leastAmount, expiresIn: this.state.expiresIn, image: this.state.image }
        let list = await GetOfferDetails.getUpdateOfferList(formData);
        if (list) {
            this.props.getOffer()
            this.handleClose()
            // window.location.reload();
        }
    }
    render() {
        return (
            <div >
                <a className="edit-btn" onClick={(e) => this.handleOpen()}><i className="fas fa-edit" /></a>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                >
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Offer</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.handleClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
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
                                        <input type="number" className="form-control" placeholder="discount" name="discount" value={this.state.discount} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>     <div className="form-group mb-0">
                                    <label className="form-label">Least Amount*</label>
                                    <div className='d-flex'>
                                        <input type="number" className="form-control" placeholder="Least Amount" name="leastAmount" value={this.state.leastAmount} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>     <div className="form-group mb-0">
                                    <label className="form-label">Expired Date*</label>
                                    <div className='d-flex'>
                                        <input type="datetime-local" className="form-control" placeholder="Expires In" name="expiresIn" value={this.state.expiresIn} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="form-group">
                                            <label className="form-label">old Image*</label>
                                            <div className="cate-img-5">
                                                <img src={API_URL + "/offer/" + this.props.state.image} alt="old" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="form-group">
                                            <label className="form-label">New Image*</label>
                                            <div className="cate-img-5">
                                                <img src={this.state.preview} alt="new" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="form-group">
                                            <label className="form-label">Choose Image*</label>
                                            <input
                                                accept="image/*"
                                                type="file"
                                                className="form-control"
                                                name="image"
                                                onChange={this.onFileChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => this.handleClose()}>Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => this.handleSubmit()}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

