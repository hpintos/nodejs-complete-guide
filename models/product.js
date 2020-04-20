const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const FILE_PATH = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');
const RANDOM_BOOK_IMG = 'https://www.gstatic.com/webp/gallery/4.sm.jpg';

const getProductsFromFile = (callback) => {
    fs.readFile(FILE_PATH, (err, fileContent) => {
        if (err)
            return callback([]);
        callback(JSON.parse(fileContent));
    });
};

module.exports = class Product {
    constructor({productId, title, imageUrl, description, price}) {
        this.id = productId;
        this.title = title;
        this.imageUrl = imageUrl !== '' ? imageUrl : RANDOM_BOOK_IMG;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
                const prodIndex = products.findIndex(p => { return p.id === this.id });
                products[prodIndex] = this;
            } else {
                this.id = Math.random().toString();
                products.push(this);           
            }
            fs.writeFile(FILE_PATH, JSON.stringify(products), err => {
                console.log(err);
            })
        });
    }

    static delete(id) {
        getProductsFromFile(products => {
            const prodIndex = products.findIndex(p => { return p.id === id });
            const prodToDelete = {...products[prodIndex]};
            products.splice(prodIndex, 1);
            fs.writeFile(FILE_PATH, JSON.stringify(products), err => {
                if (err) {
                    return console.log(err);
                }
                Cart.deleteProduct(prodToDelete);
            })
            
        });;
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findById(id, callback) {
        getProductsFromFile(products => {
            const prod = products.find(p =>{
                return p.id === id;
            });
            callback(prod);
        });
    }
}