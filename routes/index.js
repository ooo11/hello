const auth = require('http-auth');
const express = require('express');
//const mongoose = require('mongoose');
const path = require('path');
const { check, validationResult } = require('express-validator');

const router = express.Router();
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd')
});

router.get('/', auth.connect(basic), (req, res) => {
    res.render('index', { title: 'Search parts', message: 'Hello there!' });
});



module.exports = router;
