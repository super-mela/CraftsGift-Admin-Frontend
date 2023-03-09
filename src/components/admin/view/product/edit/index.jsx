import React, { Component } from 'react';
import {
    Button
} from "@material-ui/core";
import { GetProductDetails } from '../../../../services';
import RichTextEditor from '../../../../RichTextEditor';
import Loader from '../../../../loader';
import { NotificationManager } from 'react-notifications';
import swal from 'sweetalert';
export default class Edit extends Component {
    constructor(props) {
        super(props);
        let self = this.props.location.state.row;
        let value = self.status === "active" ? 1 : 0;
        this.state = {
            getList: [], getsublist: [], selectedCategory: self.category, selectedSubCategory: self.subCategory, toggle: false, loading: false, blockHide: false,
            productId: self._id, name: self.name, net: self.net, price: self.price, image: self.image, desc: self.desc, tags: self.tags, discount: self.discount,
            filename: "", oldfilename: self.image,
        }
    }
    handleBack() {
        this.props.history.goBack();
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    onFileChange = event => {
        this.setState({ filename: this.state.oldfilename.split('/')[2].split(".")[0] + "." + event.target.files[0].type.split("/")[1] });
        this.setState({ image: event.target.files[0] });
    };
    handleContentChange = contentHtml => {
        this.setState({
            content: contentHtml
        });
    };
    caculationTable = () => {
        let price = this.state.price;
        let net = this.state.net;
        if (price > 0 && net > 0) {
            let discount = Math.round(((price - net) / price) * 100);

            this.setState({
                discount: discount,
            });
        } else {
            NotificationManager.error(
                "Negative value & Zero Price not allowed",
                "Input Field"
            );
        }
    };
    handleCheckPrice() {
        this.caculationTable();
        this.setState({ toggle: !this.state.toggle })
    }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({ loading: true })
        const {
            productId,
            selectedCategory,
            selectedSubCategory,
            image,
            name,
            discount,
            net,
            price,
            tags,
            desc,
            filename,
        } = this.state;
        const formData = new FormData();
        formData.append("productId", productId);
        formData.append("category", selectedCategory);
        formData.append("subCategory", selectedSubCategory);
        formData.append("name", name);
        formData.append("discount", discount);
        formData.append("net", net);
        formData.append("price", price);
        formData.append("image", image, filename);
        formData.append("tags", JSON.stringify(tags));
        formData.append("desc", desc);
        formData.append("status", this.props.location.state.row.status);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        swal({
            title: "Are you sure?",
            text: "You want to Update Product",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetProductDetails.getUpdateProduct(formData, config);
                    if (list) {
                        this.setState({ loading: false })
                        this.props.history.push("/admin/product/list")
                    } else {
                        NotificationManager.error("Please! Check input field", "Input Field");
                    }
                }
            });

    }
    render() {
        const { loading } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Products</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item"><a href="#/admin/product/create">Products</a></li>
                    <li className="breadcrumb-item active">Update Product</li>
                </ol>

                <div className="row">
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mb-30">
                            <div className="card-title-2">
                                <h4>Update Product</h4>
                            </div>
                            <div className="card-body-table">
                                {
                                    loading ? <Loader /> : ''
                                }
                                <div className="news-content-right pd-20">
                                    <div className="row">
                                        <div className="col-lg-4 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">Product Name*</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Product Name"
                                                    name="name"
                                                    value={this.state.name}
                                                    onChange={(e) => this.handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">Price*</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    name="price"
                                                    value={this.state.price}
                                                    onChange={(e) => this.handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">net*</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="Net Price"
                                                    name="net"
                                                    value={this.state.net}
                                                    onChange={(e) => this.handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ paddingTop: "2rem" }}>
                                        <div className="col-lg-4 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">Discount%*</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    disabled
                                                    name="discount"
                                                    value={this.state.discount}
                                                    onChange={(e) => this.handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">Tags*</label>
                                                <input
                                                    type="textarea"
                                                    className="form-control"
                                                    placeholder="Tags"
                                                    name="tags"
                                                    value={this.state.tags}
                                                    onChange={(e) => this.handleChange(e)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-lg-4 col-md-4">
                                            <div className="form-group">
                                                <label className="form-label">image*</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    name="image"
                                                    onChange={this.onFileChange} />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{ paddingTop: "2rem" }}>
                                        <div className="form-group">
                                            <label className="form-label">Description*</label>
                                            <textarea
                                                rows="4"
                                                cols="100"
                                                className="form-control"
                                                name="desc"
                                                value={this.state.desc}
                                                onChange={(e) => this.handleChange(e)}
                                            />
                                        </div>
                                    </div>
                                    <div className="button_price">
                                        <div className="form-group">
                                            <Button
                                                className="checkprice"
                                                variant="contained"
                                                onClick={() => this.handleCheckPrice()}
                                            >
                                                Checkprice
                                            </Button>
                                        </div>
                                        <div
                                            className="form-group"
                                            style={{ display: this.state.toggle ? "block" : "none" }}
                                        >
                                            <button
                                                className="save-btn hover-btn"
                                                type="submit"
                                                onClick={this.handleSubmit}
                                            >
                                                Update Product
                                            </button>
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
