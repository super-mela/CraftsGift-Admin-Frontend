import React, { Component } from "react";
import { GetCustomOrderDetails, GetDashboardDetails } from "../../../../services";
import Moment from "react-moment";
import Loader from "../../../../loader";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
export default class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getList: [],
            isloaded: false,
            status: null,
            offset: 0,
            perPage: 10,
            orgtableData: [],
            currentPage: 0,
        };
    }
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState(
            {
                currentPage: selectedPage,
                offset: offset,
            },
            () => {
                this.loadMoreData();
            }
        );
    };

    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(
            this.state.offset,
            this.state.offset + this.state.perPage
        );
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            getList: slice,
        });
    }
    async getOrderList() {
        this.setState({ isloaded: true });
        let list = await GetCustomOrderDetails.getAllCustomOrderList();
        if (list) {
            var tdata = list.order;
            var slice = tdata.slice(
                this.state.offset,
                this.state.offset + this.state.perPage
            );
            this.setState({
                pageCount: Math.ceil(tdata.length / this.state.perPage),
                orgtableData: tdata,
                getList: slice,
                isloaded: false,
            });
        } else {
            this.setState({ isloaded: true });
        }
    }

    async handleChangeStatus(e) {
        let { value } = e.target;
        this.setState({ isloaded: true });
        let list = await GetDashboardDetails.getOrderByStatus(value);
        if (list) {
            this.setState({ getList: list.order, isloaded: false });
        }
    }
    componentDidMount() {
        this.getOrderList();
    }

    render() {
        const { getList, isloaded, status } = this.state;
        return (
            <div >
                <main>
                    <div className="container-fluid">
                        {isloaded ? <Loader /> : ""}
                        <h2 className="mt-30 page-title">Dashboard</h2>
                        <ol className="breadcrumb mb-30">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                        <div className="row">
                            <div className="col-xl-12 col-md-12">
                                <div className="card card-static-2 mb-30">
                                    <div className="col-lg-5 col-md-6">
                                        <div className="bulk-section mt-30">
                                            <div className="search-by-name-input">
                                                <input className="form-control" placeholder="Search" />
                                                <b>Select Status:</b>
                                            </div>
                                            <div className="input-group">
                                                <select
                                                    id="categeory"
                                                    className="form-control"
                                                    name="status"
                                                    value={status}
                                                    onChange={(e) => this.handleChangeStatus(e)}
                                                >
                                                    <option selected>Select Status</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="shipping">Shipping</option>
                                                    <option value="delieverd">Delivered</option>
                                                    <option value="cancel">Cancel</option>
                                                </select>
                                                <div className="input-group-append">
                                                    <button className="status-btn hover-btn" type="submit" onChange={(e) => this.handleChangeStatus(e)}>Search Product</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-title-2">
                                        <h4>Recent Custom Orders</h4>
                                    </div>
                                    <div className="card-body-table">
                                        <div className="table-responsive">
                                            <table className="table ucp-table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th style={{ width: 50 }}>ID</th>
                                                        <th style={{ width: 50 }}>Order ID</th>
                                                        <th style={{ width: 130 }}>FirstName</th>
                                                        <th style={{ width: 130 }}>LastName </th>
                                                        <th style={{ width: 200 }}>Status</th>
                                                        <th style={{ width: 200 }}>Date</th>
                                                        <th style={{ width: 200 }}>Delivery Date</th>
                                                        <th style={{ width: 100 }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {getList === "undefined" ? (
                                                        <p>Loading</p>
                                                    ) : (
                                                        getList.map((row, index) => (
                                                            <tr key={index}>
                                                                <td>{index + 1}</td>
                                                                <td>{row.orderId}</td>
                                                                <td>{row.firstname} </td>
                                                                <td>{row.lastname} </td>
                                                                <td>
                                                                    {row.status === "Pending" ? (
                                                                        <span className="badge-item badge-primary">
                                                                            {row.status}
                                                                        </span>
                                                                    ) : row.status === "shipping" ? (
                                                                        <span className="badge-item badge-info">
                                                                            {row.status}
                                                                        </span>
                                                                    ) : row.status === "delieverd" ? (
                                                                        <span className="badge-item badge-success">
                                                                            {row.status}
                                                                        </span>
                                                                    ) : (
                                                                        <span className="badge-item badge-danger">
                                                                            {row.status}
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <span className="delivery-time">
                                                                        <Moment format="MMMM Do YYYY">
                                                                            {row.date}
                                                                        </Moment>
                                                                    </span>
                                                                    <span className="delivery-time">
                                                                        <Moment format=" h:mm:ss a">
                                                                            {row.date}
                                                                        </Moment>
                                                                    </span>
                                                                </td>
                                                                <td>
                                                                    {row.deliverydate ? (
                                                                        <span className="delivery-time">
                                                                            <Moment format="MMMM Do YYYY">
                                                                                {row.deliverydate}
                                                                            </Moment>
                                                                        </span>
                                                                    ) : (
                                                                        "Not Assign"
                                                                    )}
                                                                </td>

                                                                <td className="action-btns">
                                                                    <Link
                                                                        className="views-btn"
                                                                        to={{
                                                                            pathname: `/admin/customorder/view/${row._id}`,
                                                                            state: row,
                                                                        }}
                                                                    >
                                                                        <i className="fas fa-eye" />
                                                                    </Link>
                                                                    <Link
                                                                        className="edit-btn"
                                                                        to={{
                                                                            pathname: `/admin/customorder/edit/${row._id}`,
                                                                            state: { row },
                                                                        }}
                                                                    >
                                                                        <i className="fas fa-edit" />
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    )}
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
                                            activeClassName={"active"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>

            </div>
        );
    }
}
