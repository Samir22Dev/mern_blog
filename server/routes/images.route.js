const express = require("express");
const router = express.Router();
const path = require('path');
const multer = require('multer');
const Blog = require("../models/blog.model");

router.post("/", (req, res) => {
    res.send('blog routes');
});