const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('shop/product-list', {
            prods: products,
            pageTitle: 'All products',
            path: '/products',
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    }).catch(err=>console.log(err));
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId).then((product)=>{
        res.render('shop/product-details', { 
            product, 
            pageTitle: 'Product details', 
            path: '/products' 
        });
    });
};

exports.getCart = (req, res, next) => {
    Cart.fetchCart(cart=>{
        res.render('shop/cart', {
            pageTitle: 'Your cart',
            path: '/cart',
            cart,
        });
    })
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findByPk(prodId).then(product=>{
        Cart.addProduct(product);
    })
    res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        pageTitle: 'Your orders',
        path: '/orders',
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'Checkout',
        path: '/checkout',
    });
};

exports.getIndex = (req, res, next) => {
    Product.findAll().then((products) => {
        res.render('shop/index', {
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    }).catch(err=>console.log(err));
};