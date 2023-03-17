import React, { Component } from "react";
import { Button } from "@material-ui/core";
import MainCategorylist from "../../../../common/category/main-category";
import { GetCategoryDetails } from "../../../../services";
import SubCategorylist from "../../../../common/category/sub-category";
import { GetProductDetails } from "../../../../services";
import Loader from "../../../../loader";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";
export default class Newproduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getList: [],
      selectedCategory: "",
      selectedSubCategory: "",
      blockhide: false,
      toggle: false,
      isLoaded: false,
      name: "",
      net: "",
      price: 1,
      image: "",
      tags: [],
      desc: "",
      discount: 0,
      singleTag: "",
      discountPrice: 0,
      filename: ""
    };
  }

  handleBack() {
    this.props.history.goBack();
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }


  onFileChange = (event) => {
    this.setState({ filename: new Date().getTime() + "." + event.target.files[0].type.split("/")[1] });
    this.setState({ image: event.target.files[0] });
  };

  handleContentChange = (contentHtml) => {
    this.setState({
      content: contentHtml,
    });
  };

  handleCategory = async (value) => {
    this.setState({ selectedCategory: value });
    let category = value;
    let list = await GetCategoryDetails.getSelectSubCategory(category);
    this.setState({ getList: list.data.subCategories });
  };

  handleSubCategory = async (value) => {
    this.setState({ selectedSubCategory: value });
    this.setState({ blockhide: true });
  };

  handleChildCategory = async (value) => {
    this.setState({ selectedChildCategory: value });
  };

  caculationTable = () => {
    let price = this.state.price;
    let discounts = this.state.discount;
    if (price > 0) {
      let discount = Math.round(price - (price * discounts / 100));
      console.log(discount)
      this.setState({
        discountPrice: discount,
      });
    } else {
      NotificationManager.error(
        "Negative value & Zero Price not allowed",
        "Input Field"
      );
    }
  };

  handleAddTag = async (e) => {
    this.setState({ tags: [...this.state.tags, this.state.singleTag] })
    this.setState({ singleTag: "" })
  }

  handleRemoveTags = async (index) => {
    this.state.tags.splice(index, 1)
    this.setState({ singleTag: "" })

  }

  handleCheckPrice() {
    this.caculationTable();
    this.setState({ toggle: !this.state.toggle });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ isLoaded: true });
    const {
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
    console.log(JSON.stringify(this.state.tags))

    const formData = new FormData();
    formData.append("category", selectedCategory);
    formData.append("subCategory", selectedSubCategory);
    formData.append("name", name);
    formData.append("discount", discount);
    formData.append("net", net);
    formData.append("price", price);
    formData.append("image", image, filename);
    formData.append("tags", JSON.stringify(tags));
    formData.append("desc", desc);
    const config = {
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    swal({
      title: "Are you sure?",
      text: "You want to Add New Product",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (success) => {
      if (success) {
        let list = await GetProductDetails.addProductList(formData, config);
        if (list) {
          this.setState({ isLoaded: false });
          this.props.history.push("/admin/product/list");
        } else {
          NotificationManager.error("Please! Check input field", "Input Field");
        }
      }
    });
  };
  render() {
    const { getList, isLoaded } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-5 col-md-9 col-lg-6">
            <h2 className="mt-30 page-title">Products</h2>
          </div>
          <div className="col-lg-5 col-md-3 col-lg-6 back-btn">
            <Button variant="contained" onClick={(e) => this.handleBack()}>
              <i class="fas fa-arrow-left" /> Back
            </Button>
          </div>
        </div>
        <ol className="breadcrumb mb-30">
          <li className="breadcrumb-item">
            <a href="/">Dashboard</a>
          </li>
          <li className="breadcrumb-item">
            <a href="#/admin/product/create">Products</a>
          </li>
          <li className="breadcrumb-item active">Add Product</li>
        </ol>

        <div className="row">
          <div className="col-lg-6 col-md-6">
            <div className="card card-static-2 mb-30">
              <div className="card-body-table">
                <div className="news-content-right pd-20">
                  <div className="form-group">
                    <label className="form-label">Category*</label>
                    <MainCategorylist onSelectCategory={this.handleCategory} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="card card-static-2 mb-30">
              <div className="card-body-table">
                <div className="news-content-right pd-20">
                  <div className="form-group">
                    <label className="form-label">Sub Category*</label>
                    <SubCategorylist
                      state={getList}
                      onSelectSubCategory={this.handleSubCategory}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="row"
          style={
            this.state.blockhide ? { display: "block" } : { display: "none" }
          }
        >
          {isLoaded ? <Loader /> : ""}
          <div className="col-lg-12 col-md-12">
            <div className="card card-static-2 mb-30">
              <div className="card-title-2">
                <h4>Add New Product</h4>
              </div>
              <div className="card-body-table">
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
                          type="text"
                          className="form-control"
                          placeholder="Net Size"
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
                          name="discount"
                          value={this.state.discount}
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
                          onChange={this.onFileChange}
                          accept="image/*"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Tags*</label>
                        <div className='d-flex'>
                          <input
                            type="textarea"
                            className="form-control"
                            placeholder="Tags"
                            name="singleTag"
                            value={this.state.singleTag}
                            onChange={(e) => this.handleChange(e)}
                          />
                          <button className='btn' onClick={this.handleAddTag}>+</button>
                        </div>

                        {this.state.tags.map((item, key) => (
                          <div className='d-flex justify-content-between mx-4 bg-light align-items-center' key={key}>
                            <label className="form-label mb-0 ml-2">{item}</label>
                            <button className='btn' onClick={() => this.handleRemoveTags(key)}>x</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="row" style={{ paddingTop: "2rem", display: this.state.toggle ? "block" : "none" }} >
                    <div className="col-lg-4 col-md-4">
                      <div className="form-group">
                        <label className="form-label">Discount Price*</label>
                        <input
                          type="number"
                          className="form-control"
                          name="discountPrice"
                          disabled
                          value={this.state.discountPrice}
                        />
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
                        Add New Product
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
