var express = require('express');
var router = express.Router();
const { ObjectID } = require('mongodb');
const fs = require('fs')

router.get('/', function (req, res) {
    console.log('MAme', req.body)

    res.redirect('http://127.0.0.1:5500/form2.html')
    //res.redirect('http://127.0.0.1:5501/routes/form2.html')
    //res.sendFile('form2.html', { root: __dirname })


})

router.post('/', function (req, res) {

    console.log('amanuel', JSON.stringify(req.body))
    res.end(JSON.stringify(req.body))

})


module.exports = router