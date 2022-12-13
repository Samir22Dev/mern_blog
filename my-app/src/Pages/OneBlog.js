import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../Component/Navbar";

const Blog = () => {

    const [allBlogs, setAllBlogs] = useState([])
    const id = useParams()   
    const serverPath = "http://localhost:5000/uploads/"

    useEffect(() => {
        axios.get(`http://localhost:5000/blog/one_blog/${id.id}`)
            .then(res => {
                console.log(res.data);
                setAllBlogs(res.data);
            }).catch((error) => {
                console.log(error);
            })
    }, []);


    return (
        <React.Fragment>
            <Navbar/>

            <div className="container">

            <div className="row">
                {allBlogs.map((blog, index) => {
                    return (
                        <div className="col-6" key={index}>
                            <div className="card">
                                <img src={ serverPath + blog.image_name} className="card-img-top" alt="image2" />
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">{blog.post}</p>
                                    <Link to="/" className="btn btn-primary btn-lg">Back</Link>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
            </div>
        </React.Fragment>
    )
}

export default Blog;
