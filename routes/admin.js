const path = require('path');

const rootDir = require('../utils/path');

const express = require('express');

const router = express.Router();

const products = [];

router.get('/products', (req, res, next) => {
  res.render('admin/products', { 
    pageTitle: 'Admin Product', 
    path: '/admin/products',
  });
});

router.get('/add-product', (req, res, next) => {
  res.render('admin/add-product', { 
    pageTitle: 'Add Product', 
    path: '/admin/add-product', 
    formsCSS: true, 
    productCSS: true, 
    activeAddProduct: true 
  });
});

router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;