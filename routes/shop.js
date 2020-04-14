const path = require('path');

const rootDir = require('../utils/path');

const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = routes;