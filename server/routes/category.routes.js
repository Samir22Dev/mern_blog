const express = require("express")
const router = express.Router()

const Category = require("../models/category.model");
const Blog = require("../models/blog.model");

router.get("/", (req, res) => {
    Category.find({}, (error, doc) => {
        if(error) {
            console.log(error);
            res.send(error)
        } else {
           
            res.json(doc);
        }
    });     
})

router.post("/", (req, res) => {
    console.log('line 20', req.body);

    const categoryData = new Category({
        categoryName: req.body.categoryName,
        isActive: 'Yes',
    })
    categoryData.save((error, doc) => {
        if(error){
            res.send(error)
        }
        else{
            res.json(doc);
        }
    });   
})

router.put("/:id", (req, res) => {
    res.json({msg: "category updated"})
})

router.delete("/:id", (req, res) => {

    Category.remove({ _id: req.params.id }, (err) => {
        if(err) {
            res.send(err);             
        } else {         
            res.send("doc deleted")
        }
    });
})


router.get("/count", (req, res) => {
    let countID = [];

    Category.find({}, (error, doc) => {
        if(error) {
            console.log(error);
            res.send(error)
        } else {
            for(i = 0; i < doc.length; i++) {  

                //-----------------------
                Blog.countDocuments({categoryId: doc[i]._id}, (err, data) => {
                    if(err) {
                        console.log('Error from find category Id', err);                        
                    } else {
                       
                        countID.push({ value: data });                        
                    }
                })
                
                //-----------------------------
                
            }
            console.log('countId', countID);
            res.json(doc);            
        }
    });     
})


module.exports = router;