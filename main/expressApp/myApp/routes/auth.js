var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

const jwtManager = require('../jwt/jwtManager');

// const hasher = require('bcryptjs');

//login
router.post('/login', (req, res) => {

    req.db.collection('students')
        .findOne({ 'email': req.body.email })
        .then(data => {
            let password = bcrypt.compareSync(`${req.body.password}`, data.password); // true or false
            if (password) {
                const payload = {};
                payload.email = data.email;
                payload.firstname = data.fname;//'student'
                const token = jwtManager.generate(payload);
                res.json({ status: 'success', result: token });
            } else {
                res.json({ status: 'invalid email or password' })
            }
        })
        .catch(err => {
            res.json({ status: err })
        })

});



//sign up
function validatingBody(req, res, next) {
    let email = req.body.email, password = req.body.password, Id = req.body.id, fname = req.body.fname, lname = req.body.lname, major = req.body.major;
    if ((email === undefined || password === undefined || Id === undefined || fname === undefined ||
        lname === undefined || major === undefined) ||
        (email === "" || password === "" || Id === "" || fname === "" ||
            lname === "" || major === "")) {
        res.json({ status: "Invalid body" })
    } else (
        next()
    )
}

router.post('/signup', validatingBody, (req, res) => {
    req.db.collection("students").findOne({ 'email': req.body.email })
        .then(doc => {
            console.log("docccc", doc)
            if (doc) {
                res.json({ status: 'User exists' });
            }
            const user = req.body;
            let x = req.body.password;
            console.log('before hasj', user)
            let hash = bcrypt.hashSync(`${x}`, salt);
            console.log('hassssssh', hash)
            user.password = hash
            // user.password = hasher.hashSync(req.body.password, 12);
            console.log('after hsing', user)
            req.db.collection("students").insertOne(user)
                .then(data => {
                    console.log('dataaa', data.ops[0])
                    const payload = {};
                    payload.email = data.ops[0].email;
                    payload.firstname = data.ops[0].fname;//'student'
                    const token = jwtManager.generate(payload);
                    res.json({ status: 'success', result: token });
                    //res.json({ status: 'success', data: data });
                })
                .catch(err => {
                    res.json({ status: err })
                })
        })
        .catch(err => {
            res.json({ status: err })
        })
});


module.exports = router;