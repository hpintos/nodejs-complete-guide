const fs = require('fs');
const path = require('path');

const Product = require('../models/product');

const FILE_PATH = path.join(path.dirname(process.mainModule.filename), 'data', 'cart.json');


const getCartFromFile = (callback) => {
    fs.readFile(FILE_PATH, (err, fileContent) => {
        if (err)
            return callback({});
        callback(JSON.parse(fileContent));
    });
};

module.exports = class Cart {

    static fetchCart(callback) {
        getCartFromFile(callback);
    }
    
    static addProduct({id, price}) {
        getCartFromFile(cart => {
            cart.products = cart.products || [];
            cart.totalPrice = cart.totalPrice || 0;
            const prodIndex = cart.products.findIndex( p => p.id === id);
            if (prodIndex > -1) {
                cart.products[prodIndex].qty++;
            } else {
                cart.products.push({ id, qty: 1});
            }
            cart.totalPrice += parseInt(price);
            fs.writeFile(FILE_PATH, JSON.stringify(cart), err => {
                console.log(err);
            })
        });
    }

    static deleteProduct({id, price}) {
        getCartFromFile(cart => {
            const prodIndex = cart.products.findIndex( p => p.id === id);
            if (prodIndex > -1) {
                const product = cart.products[prodIndex];
                cart.totalPrice -= (parseInt(price) * product.qty);
                cart.products.splice(prodIndex, 1);
                fs.writeFile(FILE_PATH, JSON.stringify(cart), err => {
                    console.log(err);
                })
            } 
        });
    }

}