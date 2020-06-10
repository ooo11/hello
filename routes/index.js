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

router.get('/api/repairlist', (req, res) => {

    fs.readFile('./data/newlist.json', (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });

});


router.post('/api/repairlist', async (req, res) => {


    ///this work in writing
    const repairlist = req.body;
    console.log(repairlist);
    const jsonString = JSON.stringify(repairlist, null, 2);

    console.log(jsonString);

    fs.writeFile('./data/newlist.json', jsonString, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });


});


module.exports = router;
