import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Category = () => {

  const [category, setCategory] = useState([]);
  const [blog, setBlog] = useState([]);
  const [countCategory, setCountCategory] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/category")
      .then(res => {
        console.log('cat', res.data);
        setCategory(res.data);
      }).catch((error) => {
        console.log(error);
      })
  }, []);

  const blogsCategory = () => {
    axios.get("http://localhost:5000/blog")
      .then(res => {        
        setBlog('blog', res.data);
      }).catch((error) => {
        console.log(error);
      })
  }

  const totalCategory = (cateID) => {
    console.log('total category');

    const counts = {};    
    blog.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    console.log('duplicate', counts)  
  }

  totalCategory();

  return (
    <div>
      <div>All Category</div>
      <ol className="list-group list-group-numbered">
        {category.map((cat, index) => {
          return (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold"><Link to={`/cateblog/${cat._id}`}>{cat.categoryName}</Link></div>

              </div>
              <span className="badge bg-primary rounded-pill">14</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export default Category;