// const API_URL = "https://backend.habeshagebeya.com";
// const API_URL = "http://172.20.19.67:5000";
const API_URL = document.domain === 'localhost'
  ? "http://localhost:5000"
  : "https://backend.habeshagebeya.com";

const Apis = {
  //Authentication api
  GetUserLogin: `${API_URL}/api/auth/rootLogin`,
  GetUserRegsiter: `${API_URL}/api/auth/register`,
  GetAllUserList: `${API_URL}/api/auth/user/getAllUserList`,
  GetUserUpdate: `${API_URL}/api/auth/user/update`,
  GetDeleteUserList: `${API_URL}/api/auth/user/delete`,

  //Dashboard
  GetOrderByStatus: `${API_URL}/api/order/status`,
  GetAllStatusOrder: `${API_URL}/api/order/count`,

  //Offer api
  CreateOfferList: `${API_URL}/api/offer/create`,
  GetAllOfferList: `${API_URL}/api/offer/list`,
  GetUpdateOfferList: `${API_URL}/api/offer/update`,
  SearchOfferList: `${API_URL}/api/offer/search`,
  GetOfferDeleteById: `${API_URL}/api/offer/delete`,

  //location api
  GetAllLocationCreate: `${API_URL}/api/location/create`,
  GetAllLocationList: `${API_URL}/api/location/list`,
  GetLocationDeleteById: `${API_URL}/api/location/delete`,
  GetLocationUpdate: `${API_URL}/api/location/update`,

  //area api
  CreateAreaList: `${API_URL}/api/location/area/create`,
  GetAllAreaList: `${API_URL}/api/location/area/list`,
  GetAreaDeleteById: `${API_URL}/api/location/area/delete`,
  GetAreaUpdate: `${API_URL}/api/location/area/update`,
  GetAllAreaByLocation: `${API_URL}/api/location/area/getAllAreaList?locationId=`,

  //category api
  CreateCategoryList: `${API_URL}/api/category/create`,
  GetAllCategoryList: `${API_URL}/api/category/main-list`,
  GetUpdateCategoryList: `${API_URL}/api/category/main-list/update`,

  //Sub category api
  CreateSubCategoryList: `${API_URL}/api/category/create-sub`,
  GetAllCategoryByType: `${API_URL}/api/category/search`,
  GetUpdateSubCategoryList: `${API_URL}/api/category/sub-list/update`,
  GetSubDeleteById: `${API_URL}/api/category/sub-list/delete`,

  //Child category api
  GetAllSubCategory: `${API_URL}/api/category/getAllSubCategory?categoryId=`,
  CreateChildCategory: `${API_URL}/api/category/create-sub-child`,
  GetAllChildCategoryList: `${API_URL}/api/category/list`,
  GetChildDeleteById: `${API_URL}/api/category/child/deleteById`,
  GetAllSubChildCategory: `${API_URL}/api/category/getAllSubChildCategory?subcategoryId=`,

  //product api
  AddProductList: `${API_URL}/api/product/add`,
  GetAllProductList: `${API_URL}/api/product/getAllproductList`,
  GetAllProductPhoto: `${API_URL}/api/product/getAllPhoto`,
  GetUpdateProduct: `${API_URL}/api/product/update`,
  GetUploadProductImage: `${API_URL}/api/product/upload-img`,
  GetDeleteProduct: `${API_URL}/api/product/delete`,
  GetProductById: `${API_URL}/api/product/getProductById`,

  GetProductPhotoDeleteById: `${API_URL}/api/product/aws/delete/photo`,

  //affiliate api
  GetUpdateAffiliate: `${API_URL}/api/product/updateaffiliate`,
  GetAffiliateById: `${API_URL}/api/product/getAffiliateById?id=`,
  GetAllAffiliateList: `${API_URL}/api/product/getAllaffiliateList`,
  GetDeleteAffiliate: `${API_URL}/api/product/affiliatedelete`,

  //order detail
  GetAllOrderDetails: `${API_URL}/api/order/list`,
  GetOrderStatusUpdate: `${API_URL}/api/order/status/update`,

  //custom order detail
  GetAllCustomOrderDetails: `${API_URL}/api/order/custom/list`,
  GetCustomOrderStatusUpdate: `${API_URL}/api/order/custom/status/update`,
  SearchCustomOrder: `${API_URL}/api/order/custom/search`,
  GetAllCustomStatusOrder: `${API_URL}/api/order/custom/count`,
  GetCustomOrderEmail: `${API_URL}/api/order/custom/email`,

  // customer details
  GetAllCustomerDetails: `${API_URL}/api/customer/list`,
  GetCustomerDeleteById: `${API_URL}/api/customer/delete`,

  //payment list
  GetAllPaymentList: `${API_URL}/api/payment/getAllPayment`,
};
export { API_URL, Apis };
