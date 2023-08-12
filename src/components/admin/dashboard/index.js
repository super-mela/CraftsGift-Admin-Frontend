import React, { Component } from "react";
import { GetOrderDetails, GetDashboardDetails } from "../../services";
import Moment from "react-moment";
import Loader from "../../loader";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { NotificationManager } from "react-notifications";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getList: [],
      isloaded: false,
      status: null,
      statusList: null,
      offset: 0,
      perPage: 10,
      orgtableData: [],
      currentPage: 0,
      searchData: "",
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
    let list = await GetOrderDetails.getAllOrderList();
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
  async getStatusList() {
    this.setState({ isloaded: true });
    let list = await GetDashboardDetails.getAllStatusOrder();
    if (list) {
      console.log(list)
      this.setState({ statusList: list.order, isloaded: false });
    } else {
      this.setState({ isloaded: true });
    }
  }
  async handleChangeStatus(e) {
    let { value } = e.target;
    this.setState({ isloaded: true });
    let list = await GetDashboardDetails.getOrderByStatus(value);
    if (list) {
      if (list.order) {
        this.setState({ getList: list.order, isloaded: false });
      }
      else {
        NotificationManager.error(list.msg, "Order")
        this.setState({ isloaded: false });
      }
    }
  }
  handleChangeSearch = (e) => {
    this.setState({ searchData: e.target.value })
  }
  handleSearch = async () => {
    let list = await GetDashboardDetails.getOrderByStatus(this.state.searchData);
    if (list) {
      console.log(list)
      if (list.order) {
        this.setState({ getList: list.order, isloaded: false });
      }
      else {
        NotificationManager.error(list.msg, "Order")
      }
    }
  }

  componentDidMount() {
    this.getOrderList();
    this.getStatusList();
  }

  render() {
    const { getList, isloaded, status, statusList } = this.state;
    return (
      <div id="layoutSidenav_content">
        <main>
          <div className="container-fluid">
            {isloaded ? <Loader /> : ""}
            <h2 className="mt-30 page-title">Dashboard</h2>
            <ol className="breadcrumb mb-30">
              <li className="breadcrumb-item active">Dashboard</li>
            </ol>
            <div className="row">
              <div className="col-xl-3 col-md-6">
                <div className="dashboard-report-card purple">
                  <div className="card-content">
                    <span className="card-title">Order Shipping</span>
                    {statusList
                      ? statusList.map((row, index) => (
                        <span
                          className="card-count"
                          key={index}
                          style={
                            row.status === "shipping"
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          {row.total}
                        </span>
                      ))
                      : ""}
                  </div>
                  <div className="card-media">
                    <i className="fab fa-rev" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="dashboard-report-card red">
                  <div className="card-content">
                    <span className="card-title">Order Cancel</span>
                    {statusList
                      ? statusList.map((row, index) => (
                        <span
                          className="card-count"
                          key={index}
                          style={
                            row.status === "cancel"
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          {row.total}
                        </span>
                      ))
                      : ""}
                  </div>
                  <div className="card-media">
                    <i className="far fa-times-circle" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="dashboard-report-card info">
                  <div className="card-content">
                    <span className="card-title">Order Process</span>
                    {statusList
                      ? statusList.map((row, index) => (
                        <span
                          className="card-count"
                          key={index}
                          style={
                            row.status === "pending"
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          {row.total}
                        </span>
                      ))
                      : ""}
                  </div>
                  <div className="card-media">
                    <i className="fas fa-sync-alt rpt_icon" />
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-md-6">
                <div className="dashboard-report-card success">
                  <div className="card-content">
                    <span className="card-title">Order Delivered</span>
                    {statusList
                      ? statusList.map((row, index) => (
                        <span
                          className="card-count"
                          key={index}
                          style={
                            row.status === "delieverd"
                              ? { display: "block" }
                              : { display: "none" }
                          }
                        >
                          {row.total}
                        </span>
                      ))
                      : ""}
                  </div>
                  <div className="card-media">
                    <i className="fas fa-money-bill rpt_icon" />
                  </div>
                </div>
              </div>
              <div className="col-xl-12 col-md-12">
                <div className="card card-static-2 mb-30">
                  <div className="row mx-0">
                    <div className="col-lg-6 col-md-6">
                      <div className="bulk-section mt-30 ">
                        <div className="input-group">
                          <input className="form-control" placeholder="Search" onChange={(e) => this.handleChangeSearch(e)} />
                          <button className="status-btn hover-btn" type="submit" onClick={this.handleSearch}>Search</button>

                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                      <div className="bulk-section mt-30 ">
                        <div className="input-group">
                          <b style={{ marginRight: "15px", display: "flex", alignItems: "center" }}>Select Status:</b>
                          <select
                            id="categeory"
                            className="form-control"
                            name="status"
                            value={status}
                            onChange={(e) => this.handleChangeStatus(e)}
                          >
                            <option selected disabled>Select Status</option>
                            <option value="pending">Processing</option>
                            <option value="shipping">Shipping</option>
                            <option value="delieverd">Delivered</option>
                            <option value="cancel">Cancel</option>
                          </select>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-title-2">
                    <h4>Recent Orders</h4>
                    <button onClick={() => this.getOrderList()} className="view-btn hover-btn">View All</button>
                  </div>
                  <div className="card-body-table">
                    <div className="table-responsive">
                      <table className="table ucp-table table-hover">
                        <thead>
                          <tr>
                            <th style={{ width: 50 }}>ID</th>
                            <th style={{ width: 50 }}>Invoice</th>
                            <th style={{ width: 130 }}>FirstName</th>
                            <th style={{ width: 130 }}>LastName </th>
                            <th style={{ width: 130 }}>Payment Method</th>
                            <th style={{ width: 130 }}>Amount</th>
                            <th style={{ width: 130 }}>Discount</th>
                            <th style={{ width: 130 }}>Shipping Cost</th>
                            <th style={{ width: 130 }}>Products</th>
                            <th style={{ width: 130 }}>Status</th>
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
                                <td>{row.invoice}</td>
                                <td>{row.firstname} </td>
                                <td>{row.lastname} </td>
                                <td>{row.paymentMethod} </td>
                                <td>{row.amount} </td>
                                <td>{row.discount} </td>
                                <td>{row.shippingCost} </td>
                                <td>{row.cart.map((item, i) => (
                                  item.name + " "
                                ))} </td>
                                <td>
                                  {row.status === "pending" ? (
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
                                    ""
                                  )}
                                </td>

                                <td className="action-btns">
                                  <Link
                                    className="views-btn"
                                    to={{
                                      pathname: `/admin/order/view/${row._id}`,
                                      state: row,
                                    }}
                                  >
                                    <i className="fas fa-eye" />
                                  </Link>
                                  <Link
                                    className="edit-btn"
                                    to={{
                                      pathname: `/admin/order/edit/${row._id}`,
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
        <footer className="py-4 bg-footer mt-auto">
          <div className="container-fluid">
            <div className="d-flex align-items-center justify-content-between small">
              <div className="text-muted-1">
                © 2023 <b>Crafts Gift</b>. by <a>Z-angel</a>
              </div>
              <div className="footer-links">
                <a href="/">Privacy Policy</a>
                <a href="/">Terms &amp; Conditions</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}
