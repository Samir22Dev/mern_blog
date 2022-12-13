const express = require("express")
const router = express.Router()
const mongoose = require('mongoose');
const multer = require('multer');

const Blog = require("../models/blog.model")

router.get("/", (req, res) => {

    Blog.find({}).populate('categoryId', 'categoryName').exec().then(
        doc => {           
            if(doc.length >= 0){
                res.json(doc);                
            }
            else{
                res.json({ message: 'No data found' });
            }            
        }
    ).catch(err => console.log(err));    
   
})

//-----------------------------

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        cb(
            null,
            new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
        );
    },
});

//---------------------

const filefilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


const upload = multer({ storage: storage, filefilter: filefilter });

router.post("/", upload.single('photo'), (req, res) => {
   
    console.log('file name: ', req.file.filename);
    let imageName = req.file.filename;

    const Blogdata = new Blog({
        title: req.body.title,
        post: req.body.post,        
        categoryId: req.body.categoryId,
        image_name: imageName,
    });   

    Blogdata.save((err, item) => {
        if(err){
            return err;
        }
        console.log('Blog Generated', item);       
        res.json(item);
    });    
});

router.put("/:id", (req, res) => {
    res.json({msg: "blog updated"});
})

router.delete("/:id", (req, res) => {

    Blog.remove({ _id: req.params.id }, (err) => {
        if(err) {
            res.send(err);             
        } else {         
            res.send("doc deleted")
        }
    });
})

router.get("/one_blog/:id", (req, res) => {    
    const blogId = mongoose.Types.ObjectId(req.params.id);
    console.log('ok', blogId)

    Blog.find({_id: blogId}, (err, item) => {
        if(err){
            console.log('Error from One Blog route:', err);
            res.send(err);
        }
        console.log('one blog: ', item);
        res.json(item);
    });
})

router.get("/category_blog/:id", (req, res) => {    
    const category_Id = mongoose.Types.ObjectId(req.params.id);
    console.log('ok', category_Id);

    Blog.find({categoryId: category_Id}, (err, item) => {
        if(err){
            console.log('Error from One Blog route:', err);
            res.send(err);
        }
        console.log('category blog: ', item);
        res.json(item);
    });
})

module.exports = router;