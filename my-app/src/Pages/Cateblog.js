import React from "react";
import { useParams,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Component/Navbar";

const Cateblog = () =>{

    const [allBlogs, setAllBlogs] = useState([])
    const cateid = useParams()    
    const serverPath = "http://localhost:5000/uploads/"
    
    useEffect(() => {
        axios.get(`http://localhost:5000/blog/category_blog/${cateid.id}`)
            .then(res => {               
                setAllBlogs(res.data);
            }).catch((error) => {
                console.log(error);
            })
    }, []);

    return(
        <React.Fragment>
            <Navbar />
            <div className="container">
              <div className="row">
                {allBlogs.map((blog, index) => {
                    return (
                        <div className="col-6" key={index}>
                            <div className="card">
                                <img src={ serverPath + blog.image_name} className="card-img-top" alt="image2" />
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">{ blog.post.length < 170 ? blog.post : blog.post.substring(0, 170) + '...'}</p>
                                    <Link to={`/oneblog/${blog._id}`} className="btn btn-primary btn-sm">View Detail</Link>
                                    <div>{blog.categoryId.categoryName}</div>
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

export default Cateblog;