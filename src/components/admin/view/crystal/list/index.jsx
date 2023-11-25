import React, { Component } from 'react';
import {
    Button, Typography
} from "@material-ui/core";
import { GetCrystalDetails } from '../../../../services';
import AutoSelect from "../../../../common/autoselect";
import { API_URL } from '../../../../../config';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import swal from 'sweetalert';

const Arrays = (data, fieldName, fieldValue) => {
    let arrayItem = [];
    if (data && Array.isArray(data)) {
        data.map((item, key) => {
            arrayItem.push({ label: ++key + '--' + item[fieldName], value: item[fieldValue] });
            return null;
        });
    }
    return arrayItem;
};
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [], selectedCrystal: '', isloaded: false, limit: 20,
            offset: 0,
            perPage: 30,
            orgtableData: [],
            currentPage: 0
        }
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
    async getCrystalList() {
        this.setState({ isloaded: false })
        let list = await GetCrystalDetails.getAllCrystalList();
        if (list) {
            var tdata = list.crystal;
            var slice = tdata.slice(this.state.offset, this.state.offset + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                getList: slice,
                isloaded: true
            })
        }
    }
    async componentDidMount() {
        this.getCrystalList();
    }
    handleSelectedCrystal = async (name, selected) => {
        if (name === "product_id") {
            this.setState({
                list: {
                    ...this.state.list,
                    [name]: selected.value,
                },
                selectedCrystal: selected,
            });
            this.setState({ changed: true });
        }
    }
    handleViewAll = () => {
        this.getCrystalList()
    }
    async handlDeleteById(id) {
        swal({
            title: "Are you sure?",
            text: "You want to delete Crystal from the List",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then(async (success) => {
                if (success) {
                    let value = await GetCrystalDetails.getDeleteCrystal(id);
                    if (value) {
                        this.getCrystalList();
                    }
                }
            });
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: false })
        let list = await GetCrystalDetails.getCrystalById(this.state.selectedCrystal.value);
        if (list) {
            this.setState({ getList: list.data, isloaded: true })
        }

    }
    //pagination 
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            getList: slice
        })

    }
    //end pagination 
    render() {
        const { getList, selectedCrystal, isloaded } = this.state;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-9 col-lg-6">
                        <h2 className="mt-30 page-title">Crystals</h2>
                    </div>
                    <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
                        <Button variant="contained" onClick={(e) => this.handleBack()}><i className="fas fa-arrow-left" /> Back</Button>
                    </div>
                </div>
                <ol className="breadcrumb mb-30">
                    <li className="breadcrumb-item"><a href="/">Dashboard</a></li>
                    <li className="breadcrumb-item active">Crystal</li>
                </ol>
                <div className="row justify-content-between">
                    <div className="col-lg-12">
                        <a href="#/admin/crystal/create" className="add-btn hover-btn">Add New</a>
                    </div>

                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-4 col-md-4">
                                <br />
                                <AutoSelect
                                    className="basic-single"
                                    value={selectedCrystal}
                                    onChange={this.handleSelectedCrystal}
                                    isSearchable={true}
                                    name="product_id"
                                    options={Arrays(getList, "name", "_id")}
                                />
                            </div>
                            <div className="col-lg-2 col-md-2">
                                <button className="save-btn hover-btn" type="submit" onClick={this.handleSubmit}>Search</button>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <button className="view-all-btn hover-btn" type='submit' onClick={this.handleViewAll}>View All</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12">
                        <div className="card card-static-2 mt-30 mb-30">
                            <div className="card-title-2">
                                <h4>All Crystals</h4>
                            </div>
                            <div className="card-body-table">
                                <div className="table-responsive">
                                    <table className="table ucp-table table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ width: 60 }}>Id</th>
                                                <th style={{ width: 100 }}>Image</th>
                                                <th>Name</th>
                                                <th>Price</th>
                                                <th>Net Size</th>
                                                <th>Discount</th>
                                                <th >purchase</th>
                                                <th style={{ width: 120 }}>Tags</th>
                                                <th>Status</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {isloaded ?
                                                getList.map((row, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <div className="cate-img-5">
                                                                {/* <img src={row.image} alt={row.name} /> */}
                                                                <img src={API_URL + "/api/crystal/" + row.image} alt={row.name} />
                                                            </div>
                                                        </td>
                                                        <td>{row.name}</td>
                                                        <td>${row.price}</td>
                                                        <td>{row.net}</td>
                                                        <td>{row.discount}%</td>
                                                        <td>{row.purchases}</td>
                                                        <td>{row.tags.map((item, i) => (
                                                            <div key={i}>{item}</div>
                                                        ))}</td>
                                                        <td>
                                                            {row.status === 'in stock' ? <span className="badge-item badge-status-success">{row.status}</span> :
                                                                <span className="badge-item badge-status">{row.status}</span>
                                                            }
                                                        </td>
                                                        <td className="action-btns">
                                                            <Link to={{
                                                                pathname: `/admin/crystal/edit`,
                                                                state: { row }
                                                            }}>
                                                                <Typography className="edit-btn"><i className="fas fa-edit" /></Typography>
                                                            </Link>
                                                            <Typography className="delete-btn" onClick={(e) => this.handlDeleteById(row._id)} ><i className="fas fa-trash-alt" /></Typography>
                                                        </td>
                                                    </tr>
                                                ))
                                                : 'Loading...'

                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <ReactPaginate
                                    previousLabel={"prev"}
                                    nextLabel={"next"}
                                    breakLabel={"..."}
                                    breakClassName={"break-me"}
                                    pageCount={this.state.pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={5}
                                    onPageChange={this.handlePageClick}
                                    containerClassName={"pagination"}
                                    subContainerClassName={"pages pagination"}
                                    activeClassName={"active"} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
