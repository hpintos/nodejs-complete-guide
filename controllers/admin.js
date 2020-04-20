const Product = require('../models/product');



exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        editing: false
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    Product.findById(req.params.productId, product=>{
        if (!product) {
            console.log('Not found. Redirecting...');
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            formsCSS: true,
            productCSS: true,
            product: product,
            editing: editMode === 'true'
        });
    });
}

exports.postEditProduct = (req, res, next) => {
    console.log(req.body);
    const product = new Product(req.body);
    product.save();
    res.redirect('/');
};

exports.postAddProduct = (req, res, next) => {
    const prod = new Product(req.body);
    prod.save();
    res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
    Product.delete(req.body.productId);
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};