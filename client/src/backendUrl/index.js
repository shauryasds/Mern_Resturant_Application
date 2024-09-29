const backendUrl="https://frontend-resturant.vercel.app"
const apiUrl = {
  login: {
    method: "POST",
    url: `${backendUrl}/api/Login`,
  },
  logout: {
    method: "POST",
    url: `${backendUrl}/api/Logout`,
  },
  signup: {
    method: "POST",
    url: `${backendUrl}/api/signup`,
  },
  getcategory: {
    method: "GET",
    url: `${backendUrl}/api/getcategory`,
  },
  getproduct: {
    method: "GET",
    url: `${backendUrl}/api/getproduct`,
  },
  getuser: {
    method: "GET",
    url: `${backendUrl}/api/getuser`,
  },
  getcart: {
    method: "POST",
    url: `${backendUrl}/api/getcart`,
  },
  setcategory: {
    method: "POST",
    url: `${backendUrl}/api/createcategory`,
  },
  setproduct: {
    method: "POST",
    url: `${backendUrl}/api/createproduct`,
  },
  addorder: {
    method: "POST",
    url: `${backendUrl}/api/addorder`,
  },
  payment: {
    method: "POST",
    url: `${backendUrl}/api/payment`,
  },
  updateorder: {
    method: "POST",
    url: `${backendUrl}/api/updateorder`,
  },
  getorder: {
    method: "POST",
    url: `${backendUrl}/api/getorder`,
  },
  getorderadmin: {
    method: "POST",
    url: `${backendUrl}/api/getorderadmin`,
  },
  updateProduct: {
    method: "PUT",
    url: `${backendUrl}/api/updateproduct`,
  },
  updatecategory: {
    method: "PUT",
    url: `${backendUrl}/api/updatecategory`,
  },
  updateuser: {
    method: "PUT",
    url: `${backendUrl}/api/updateuser`,
  },
  updatecart: {
    method: "PUT",
    url: `${backendUrl}/api/updatecart`,
  },
  updateselfuser: {
    method: "PUT",
    url: `${backendUrl}/api/updateselfuser`,
  },
  deleteuser: {
    method: "DELETE",
    url: `${backendUrl}/api/deleteuser`,
  },
  deletecart: {
    method: "DELETE",
    url: `${backendUrl}/api/deletecart`,
  },
  deletecategory: {
    method: "DELETE",
    url: `${backendUrl}/api/deletecategory`,
  },
  deleteproduct: {
    method: "DELETE",
    url: `${backendUrl}/api/deleteproduct`,
  },

  isLoggedIn: {
    method: "POST",
    url: `${backendUrl}/api/isLoggedIn`,
  },
};
export default apiUrl;
