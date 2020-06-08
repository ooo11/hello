const auth = require('http-auth');
const express = require('express');
//const mongoose = require('mongoose');
const path = require('path');
const { check, validationResult } = require('express-validator');
const fs = require('fs');

const router = express.Router();
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd')
});

router.get('/', auth.connect(basic), (req, res) => {
    res.render('index', { title: 'Search parts', message: 'Hello there!' });
});

router.get('/all', auth.connect(basic), (req, res) => {
    res.render('indexAll', { title: 'All parts', page: 'All Parts', data: '/data', mainLink: '/main' });
});


router.get('/data', (req, res) => {

    fs.readFile('./data/complete.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });

});


module.exports = router;
