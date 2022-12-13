const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    categoryName: {type:String, required: [true, 'category name is required'], trim: true},
    isActive: {type:String, required: [true,'isactive is required'], trim:true}
}, {timestamps:true})

let Category = mongoose.model('category', categorySchema);

module.exports = Category;