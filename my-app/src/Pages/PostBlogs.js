import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Component/Navbar.js";
import { Formik, Field, Input } from 'formik';


const PostBlogs = () => {

  const navigate = useNavigate();

  const [allCategoty, setAllCategory] = useState([])
  const [uimage, setUImage] = useState('');

  var formData = new FormData();
  const reader = new FileReader();
  let imagePath = null;


  useEffect(() => {
    var item_value = sessionStorage.getItem("login_key");
    console.log('log: ', item_value);
    if (item_value == null) {
      alert('Please login before posting.');
      navigate('/login');
    }
    else {
      navigate('/post_blog');
    }

    axios.get("http://localhost:5000/category")
      .then(res => {
        setAllCategory(res.data);
      }).catch((error) => {
        console.log(error);
      })
  }, []);

  return (
    <React.Fragment >
      <Navbar />
      <div className="container">
        <h3 >Add New Blogs</h3>

        <Formik
          initialValues={{ title: '', description: '', category: '' }}
          validate={values => {
            const errors = {};
            if (!values.title) {
              errors.title = 'Blog Title is required';
            }
            if (!values.description) {
              errors.description = 'Blog description is required';
            }
            if (!values.category) {
              errors.category = 'Please select a category';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log(values);
              var imagefile = document.querySelector('#photo');
              formData.append("title", values.title);
              formData.append("post", values.description);
              formData.append('categoryId', values.category)
              formData.append("photo", imagefile.files[0]);


              console.log('get value:', formData.get('photo').filename)

              const config = {
                headers: { 'Content-Type': 'multipart/form-data' }
              }

              if (imagefile.files[0] == undefined) {
                alert('Please choose an image');
                setSubmitting(false);
              }
              else {
                const result = axios.post('http://localhost:5000/blog', formData, config);

                setSubmitting(true);
                navigate("/");
              }

              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue
           
          }) => (
            <form onSubmit={handleSubmit} encType="multipart/form-data">

              <label htmlFor="exampleInputEmail1" className="form-label">All Categories</label>

              <select name="category" className="form-select" onChange={handleChange}
                onBlur={handleBlur}
                value={values.category} aria-label="Default select example">
                <option>Please Select Category</option>

                {allCategoty.map((category, index) => {
                  return (
                    <option key={index} value={category._id}>{category.categoryName}</option>
                  )
                }
                )}
              </select>
              <span style={{ color: 'red' }}>{errors.category && touched.category && errors.category}</span>
              <br />

              <label htmlFor="exampleInputEmail1" className="form-label">Blog Title</label>

              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title} className="form-control"
              />
              <span style={{ color: 'red' }}>{errors.title && touched.title && errors.title}</span>
              <br />
              <label htmlFor="exampleInputEmail1" className="form-label">Blog Description</label>
              <input
                type="text"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description} className="form-control"
              />
              <span style={{ color: 'red' }}>{errors.description && touched.description && errors.description}</span>
              <br />



              <input
                type="file"
                
                id="photo"
                name="photo" accept='image/*'
                onChange={(event) => {
                  setFieldValue("photo", event.currentTarget.files[0]);
                  imagePath = URL.createObjectURL(event.target.files[0]);

                }}                
                className="form-control"
              />
              <span style={{ color: 'red' }}>{errors.uploadimage && touched.uploadimage && errors.uploadimage}</span>
              <br />
              <button className="btn btn-primary btn-sm" type="submit" disabled={isSubmitting}>
                Add Post
              </button>
              <br /><br />

              {imagePath && (
                <img src={imagePath} width='450' height='250' />
              )
              }
            </form>
          )}
        </Formik>
      </div>
    </React.Fragment>
  )
}

export default PostBlogs;
