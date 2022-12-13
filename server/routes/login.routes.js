const express = require("express")
const router = express.Router()
const User = require("../models/users.model")


router.post("/", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log("email", email, " password", password);

    User.findOne({ $and: [{ "email": email }, { "password": password }] }, (err, data) => {

        if (err) {
            console.log('err', err);
            res.send(err);
        }
        else {
            console.log('data: ', data);

            if (data == null || data.length <= 0) {
                console.log('no user found');
                res.send({ status: false, message: 'no user found' });
            } else {

                console.log('--- session login:');


                res.send({ status: true, data });
            }
        }
    });

})

module.exports = router;