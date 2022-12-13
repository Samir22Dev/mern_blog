const mongoose = require('mongoose');

const blogSchame = mongoose.Schema({
    title: {type:String, required:true, trim:true},
    post: {type:String, required:true, trim:true},    
    categoryId: {type: mongoose.Schema.Types.ObjectId, ref: 'category'},
    image_name: {type:String, trim: true }

},{timestamps:true})

const Blog= mongoose.model('blog',blogSchame)

module.exports= Blog;