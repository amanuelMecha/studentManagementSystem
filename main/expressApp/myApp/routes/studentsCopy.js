var express = require('express');
var router = express.Router();
const { ObjectID } = require('mongodb');
const fs = require('fs')


router.get('/', function (req, res) {
    req.db.collection('students').find().toArray()
        .then(data => {
            res.json({ status: "success", result: data })
        })


})

router.get('/:id', function (req, res) {
    console.log(typeof (req.params.id))
    req.db.collection('students').findOne({ Id: req.params.id })
        .then(data => {
            res.json({ status: "success", result: data })
        })


})

function validatingBody(req, res, next) {

    let email = req.body.email, Id = req.body.Id, fname = req.body.fname, lname = req.body.lname, major = req.body.major;
    console.log('emal', req.body.Id === "")
    if ((email === undefined || Id === undefined || fname === undefined ||
        lname === undefined || major === undefined) ||
        (email === "" || Id === "" || fname === "" ||
            lname === "" || major === "")) {
        res.json({ status: "Invalid body" })
    } else (
        next()
    )


}

router.post('/', validatingBody, function (req, res) {
    console.log('posttttttttt')
    req.db.collection('students').findOne({ email: req.body.email })
        .then(data => {
            if (!data) {
                req.db.collection('students').insertOne(req.body)
                    .then(data => {
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
    console.log('put methods')

    console.log(req.body)
    req.db.collection('students').findOne({ Id: req.params.id })
        .then(data => {
            if (data) {
                req.db.collection('students').updateOne({ Id: req.params.id }, { $set: { fname: req.body.fname } })
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
    console.log(typeof (req.params.id))
    let Id = req.params.id
    req.db.collection('students').removeOne({ Id: Id })
        .then(data => {
            res.json({ status: 'success' })
        })
        .catch(err => {
            res.json({ status: err })
        })
})



module.exports = router