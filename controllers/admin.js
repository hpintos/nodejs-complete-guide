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
    Product.findByPk(req.params.productId).then(product=>{
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
    }).catch(err => console.log(err));
}

exports.postEditProduct = (req, res, next) => {
    Product.findByPk(req.body.productId).then(product=>{
        if (!product) {
            console.log('Not found. Redirecting...');
            return;
        }
        ({title: product.title, price: product.price, imageUrl: product.imageUrl, description: product.description} = req.body);
        return product.save();
    }).then(()=>{
        res.redirect('/admin/products');
    }).catch(err => console.log(err));
};

exports.postAddProduct = (req, res, next) => {
    Product.create(req.body).then(()=>{
        res.redirect('/admin/products');
    }).catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
    Product.findByPk(req.body.productId).then(product=>{
        if (!product) {
            console.log('Not found. Redirecting...');
            return;
        }
        return product.destroy();
    }).then(()=>{
        res.redirect('/admin/products');
    }).catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    Product.findAll().then(products => {
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        });
    });
};