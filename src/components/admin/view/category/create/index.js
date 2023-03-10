import React, { Component } from 'react'
import {
    Button
} from "@material-ui/core";
import { GetCategoryDetails } from '../../../../services';
import Edit from './edit'
import swal from 'sweetalert';
import { API_URL } from '../../../../../config';
export default class MainCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: '', subCategory: [], image: "", getList: [], subSingle: '', filename: "",
        }
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleBack() {
        this.props.history.goBack();
    }
    async getCategory() {
        let list = await GetCategoryDetails.getCategoryList();
        this.setState({ getList: list.data })
    }
    async componentDidMount() {
        this.getCategory();
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

    handlesubcategory = async (e) => {
        this.setState({ subCategory: [...this.state.subCategory, this.state.subSingle] })
        this.setState({ subSingle: "" })
    }
    onFileChange = (event) => {
        this.setState({ filename: new Date().getTime() + "." + event.target.files[0].type.split("/")[1] });
        this.setState({ image: event.target.files[0] });
    };
    handleRemovesubcategory = async (index) => {
        this.state.subCategory.splice(index, 1)
        this.setState({ subSingle: "" })
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { categoryName, subCategory, image, filename } = this.state;
        const formData = new FormData();
        formData.append("categoryName", categoryName);
        formData.append("subCategories", JSON.stringify(subCategory));
        formData.append("image", image, filename);
        swal({
            title: "Are you sure?",
            text: "You want to Add New Category",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let list = await GetCategoryDetails.createCategoryList(formData);
                    if (list) {
                        this.setState({ categoryName: "", subCategory: [], image: "" })
                        this.getCategory();
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
                                        <label className="form-label">Category Name*</label>
                                        <input type="text" className="form-control" placeholder="Category name" name="categoryName" value={this.state.categoryName} onChange={(e) => this.handleChange(e)} />
                                    </div>
                                    <div className="form-group mb-0">
                                        <label className="form-label">SubCategory*</label>
                                        <div className='d-flex'>
                                            <input type="text" className="form-control" placeholder="SubCategory" name="subSingle" value={this.state.subSingle} onChange={(e) => this.handleChange(e)} />
                                            <button className='btn' onClick={this.handlesubcategory}>+</button>
                                        </div>

                                        {this.state.subCategory.map((item, key) => (
                                            <div className='d-flex justify-content-between mx-4 bg-light align-items-center' key={key}>
                                                <label className="form-label mb-0 ml-2">{item}</label>
                                                <button className='btn' onClick={() => this.handleRemovesubcategory(key)}>x</button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Image*</label>
                                        <input
                                            accept="image/*"
                                            type="file"
                                            className="form-control"
                                            name="image"
                                            onChange={this.onFileChange}
                                        />
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
                                                            <th scope="col">Image</th>
                                                            <th scope="col">Category Name</th>
                                                            <th scope="col">SubCategory</th>
                                                            <th scope="col">Date</th>
                                                            <th scope="col">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            self.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td><input type="checkbox" className="check-item" name="ids[]" defaultValue={5} /></td>
                                                                    <td>
                                                                        <div className="cate-img-5">
                                                                            {/* <img src={row.image} alt={row.categoryName} /> */}
                                                                            <img src={API_URL + "/category/" + row.image} alt={row.name} />
                                                                        </div>
                                                                    </td>
                                                                    <td>{row.categoryName}</td>
                                                                    <td>{row.subCategories.map((item => (<div>{item}<br /></div>)))}</td>
                                                                    <td>
                                                                        <span className="delivery-time">{this.formatDate(row.date)}</span>
                                                                    </td>
                                                                    <td className="action-btns">
                                                                        <Edit state={row} getCategory={this.getCategory} />
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
