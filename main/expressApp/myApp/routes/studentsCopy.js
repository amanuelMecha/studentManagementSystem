var express = require('express');
var router = express.Router();
const { ObjectID } = require('mongodb');
const fs = require('fs')
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);


router.get('/', function (req, res) {
    req.db.collection('students').find().toArray()
        .then(data => {
            res.json({ status: "success", result: data })
        })


})

router.get('/:id', function (req, res) {
    console.log(req.params.id)
    req.db.collection('students').findOne({ id: { $eq: parseInt(req.params.id) } })
        .then(data => {
            console.log(data)
            res.json({ status: "success", result: data })
        })


})

function validatingBody(req, res, next) {
    console.log('validity check', req.body)


    let email = req.body.email, id = req.body.id, fname = req.body.fname, lname = req.body.lname, major = req.body.major;
    if ((email === undefined || id === undefined || fname === undefined ||
        lname === undefined || major === undefined) ||
        (email === "" || id === "" || fname === "" ||
            lname === "" || major === "")) {
        res.json({ status: "Invalid body" })
    } else (
        next()
    )


}

router.post('/', validatingBody, function (req, res) {
    console.log('post', req.body)
    req.db.collection('students').findOne({ email: req.body.email })
        .then(data => {

            if (!data) {
                let x = req.body.password;
                console.log('before hasj', x)
                let hash = bcrypt.hashSync(`${x}`, salt);
                let payload = req.body
                payload.password = hash
                console.log('post body', payload)
                req.db.collection('students').insertOne(payload)
                    .then(data => {
                        console.log(data)
                        res.json({ status: 'success' })
                    })
            } else {
                res.json({ status: "User exist" })
            }
        })
        .catch(err => {
            res.json({ status: err })
        })

})

router.put('/:id', (req, res) => {
    console.log('put methods', req.body.email)

    console.log(req.body)
    req.db.collection('students').findOne({ id: parseInt(req.params.id) })
        .then(data => {
            if (data) {
                req.db.collection('students').updateOne({ id: parseInt(req.params.id) }, {
                    $set: {
                        fname: req.body.fname,
                        lname: req.body.lname, major: req.body.major, email: req.body.email
                    }
                })
                    .then(data => {
                        res.json({ status: 'success' })
                    })
            } else {
                res.json({ status: "User not found" })
            }
            // res.json({ status: data })
        })
        .catch(err => {
            res.json({ status: err })
        })
})

router.delete('/:id', (req, res) => {
    console.log('delete function before bcrypt')
    //console.log(id)
    // let password = bcrypt.compareSync(`${req.body.password}`, data.password);
    console.log('delete function')
    req.db.collection('students').removeOne({ id: parseInt(req.params.id) })
        .then(data => {
            res.json({ status: 'success' })
        })
        .catch(err => {
            res.json({ status: err })
        })
})



module.exports = router