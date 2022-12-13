const express = require("express")
const router = express.Router()
const User = require("../models/users.model")


router.get("/", (req, res) => {
    
    User.find({},(error,doc) =>{
        if(error) {
            res.send(error)        
        } else {
            res.json(doc)
        }
    });    
})

router.post("/", (req, res) => {
    const userData = new User({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        isActive: 'Yes',
    })
    userData.save((error, doc) => {
        if(error) {
            res.send(error)
        } else {
            res.json(doc)
        }
    });    
})

router.put("/:id", (req, res) => {
    res.json({msg: "user updated"})
})

router.delete("/:id", (req, res) => {

    User.remove({ _id: req.params.id }, (err) => {
        if(err) {
            res.send(err);             
        } else {         
            res.send("doc deleted")
        }
    });

    
})

module.exports = router;