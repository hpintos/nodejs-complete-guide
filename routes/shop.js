const path = require('path');

const express = require('express');

const adminData = require('./admin');

const router = express.Router();

router.get('/cart', (req, res, next) => {
  const products = adminData.products;
  res.render('shop/cart', {
    prods: products,
    pageTitle: 'Cart',
    path: '/cart',
  });
});

router.get('/', (req, res, next) => {
  const products = adminData.products;
  res.render('shop/product-list', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true
  });
});

module.exports = router;