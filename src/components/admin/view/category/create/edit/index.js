import React, { Component } from 'react';
import { Modal } from '@material-ui/core';
import { GetCategoryDetails } from '../../../../../services';
import swal from 'sweetalert';
import { API_URL } from '../../../../../../config';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        const { _id, categoryName, subCategories, image } = this.props.state;
        this.state = {
            _id: _id, categoryName: categoryName, subCategories: subCategories, image: image, subSingle: '', filename: "", oldfilename: image, preview: ""
        }
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    handleOpen() {
        this.setState({ open: !this.state.open, loading: true })
    }

    onFileChange = event => {
        this.setState({ filename: this.state.oldfilename.split('/')[1].split(".")[0] + "." + event.target.files[0].type.split("/")[1] });
        this.setState({ image: event.target.files[0] });
        const objectUrl = URL.createObjectURL(event.target.files[0])
        this.setState({ preview: objectUrl })
    };

    handleClose() {
        this.setState({ open: !this.state.open })
    }

    handlesubcategories = async (e) => {
        this.setState({ subCategories: [...this.state.subCategories, this.state.subSingle] })
        this.setState({ subSingle: "" })
    }

    handleRemovesubcategories = async (index) => {
        this.state.subCategories.splice(index, 1)
        this.setState({ subSingle: "" })
    }

    async handleSubmit(e) {
        const { _id, categoryName, subCategories, image, filename } = this.state
        const formData = new FormData();
        formData.append("_id", _id);
        formData.append("categoryName", categoryName);
        formData.append("subCategories", JSON.stringify(subCategories));
        formData.append("image", image, filename);
        swal({
            title: "Are you sure?",
            text: `You want to Update ${categoryName}`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCategoryDetails.getUpdateCategoryList(formData);
                    if (list) {
                        this.props.getCategory()
                        this.handleClose()
                        window.location.reload();
                    }
                }
            });
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
                                <h5 className="modal-title" id="exampleModalLabel">Update Location</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => this.handleClose()}>
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label className="form-label">Category Name*</label>
                                    <input type="text" className="form-control" placeholder="Category name" name="categoryName" value={this.state.categoryName} onChange={(e) => this.handleChange(e)} />
                                </div>
                                <div className="form-group mb-0">
                                    <label className="form-label">SubCategories*</label>
                                    <div className='d-flex'>
                                        <input type="text" className="form-control" placeholder="SubCategories" name="subSingle" value={this.state.subSingle} onChange={(e) => this.handleChange(e)} />
                                        <button className='btn' onClick={this.handlesubcategories}>+</button>
                                    </div>

                                    {this.state.subCategories.map((item, key) => (
                                        <div className='d-flex justify-content-between mx-4 bg-light align-items-center' key={key}>
                                            <label className="form-label mb-0 ml-2">{item}</label>
                                            <button className='btn' onClick={() => this.handleRemovesubcategories(key)}>x</button>
                                        </div>
                                    ))}
                                </div>
                                <div className='row'>
                                    <div className='col'>
                                        <div className="form-group">
                                            <label className="form-label">old Image*</label>
                                            <div className="cate-img-5">
                                                <img src={API_URL + "/category/" + this.props.state.image} alt="old image" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col'>
                                        <div className="form-group">
                                            <label className="form-label">New Image*</label>
                                            <div className="cate-img-5">
                                                <img src={this.state.preview} alt="new image" />
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

