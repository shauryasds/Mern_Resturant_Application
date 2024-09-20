// Import required modules
const express = require('express');
const router = express.Router();
const auth = require('../auth');
const loginMiddleware = require('../loginMiddleware');

// Authentication routes
const loginController = require('../login');
const logoutController = require('../logout');
const isLoggedInController = require('../isLoggedIn');
const signupController = require('../signup');

router.post('/login', loginController);
router.post('/logout', loginMiddleware, logoutController);
router.post('/isloggedin', isLoggedInController);
router.post('/signup', signupController);

// Product routes
const createProductController = require('../CreateProduct');
const updateProductController = require('../UpdateProduct');
const deleteProductController = require('../deleteproduct');
const getProductsController = require('../getProducts');

router.post('/createproduct',auth,  createProductController);
router.put('/updateproduct',auth,  updateProductController);
router.delete('/deleteproduct',auth,  deleteProductController);
router.get('/getproduct', getProductsController);

// Category routes
const createCategoryController = require('../createCategory');
const updateCategoryController = require('../updateCategory');
const deleteCategoryController = require('../deleteCategory');
const getCategoryController = require('../getCategory');

router.post('/createcategory', auth, createCategoryController);
router.put('/updatecategory',  auth, updateCategoryController);
router.delete('/deletecategory',  auth, deleteCategoryController);
router.get('/getcategory', getCategoryController);

// User routes
const updateUserController = require('../updateUser');
const deleteUserController = require('../deleteUser');
const getUserController = require('../getUser');
const updateUserDetails = require('../updateUserDetails');

router.put('/updateuser', auth, updateUserController);
router.put('/updateselfuser', loginMiddleware, updateUserDetails);
router.delete('/deleteuser', auth,  deleteUserController);
router.get('/getuser', getUserController);


const updatecart = require('../updteCart');
const getCart = require('../getCart');
const removeFromCart = require('../RemoveCart');

router.post('/getcart',getCart)
router.put('/updatecart',loginMiddleware,updatecart)
router.delete('/deletecart',loginMiddleware,removeFromCart)



const addorder=require('../addOrder');
const getOrder = require('../getOrder');
const getOrderadmin = require('../getOrdersAdmin');
const updateOrder = require('../updateOrder');
router.post('/addorder',loginMiddleware,addorder)
router.post('/getorder',loginMiddleware,getOrder)
router.post('/getorderadmin',auth,getOrderadmin)
router.post('/updateorder',auth,updateOrder)



const paymentPage = require('../paymentPage');


router.post('/payment',loginMiddleware,paymentPage)

module.exports = router;