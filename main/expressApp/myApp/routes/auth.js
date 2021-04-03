var express = require('express');
var router = express.Router();

const jwtManager = require('../jwt/jwtManager');

// const hasher = require('bcryptjs');

//login
router.post('/login', (req, res) => {
    req.db.collection('students')
        .findOne({ 'email': req.body.email })
        .then(data => {
            console.log('newwwwwwwwwwwww', data)
            if (data) {
                const payload = {};
                payload.email = data.email;
                payload.firstname = data.fname;//'student'
                const token = jwtManager.generate(payload);
                res.json({ status: 'success', result: token });
            } else {
                res.json({ status: 'User not exist' })
            }
        })

});


//sign up
router.post('/signup', (req, res) => {

    req.db.collection("students").findOne({ 'Email': req.body.Email })
        .then(doc => {
            if (doc) {
                res.json({ status: 'User exists' });
            }
            const user = req.body;
            // user.password = hasher.hashSync(req.body.password, 12);

            req.db.collection("students").insertOne(user)
                .then(data => {
                    res.json({ status: 'success' });
                })
        })
});


module.exports = router;