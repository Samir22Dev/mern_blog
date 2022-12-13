import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Component/Navbar.js";
import { Formik } from 'formik';


const AllCategory = () => {

    const [allCategory, setAllCategory] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/category")
            .then(res => {
                console.log(res.data);
                setAllCategory(res.data);
            }).catch((error) => {
                console.log(error);
            })
    }, []);

    const insertCategory = () => {
        console.log('ok');

    }


    return (
        <React.Fragment>
            <Navbar />
            <div className="container">
                <h3>Add New Category</h3>
                <Formik
                    initialValues={{ category: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.category) {
                            errors.category = 'Please add new category';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                       
                        axios.post('http://localhost:5000/category', {
                            categoryName: values.category,
                        })
                            .then((response) => {
                                console.log(response.data);
                                setAllCategory([...allCategory, { _id: response.data._id, categoryName: values.category, isActive: 'Yes' }]);
                                values.category = '';
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                        console.log('name: ', values.category);
                        setSubmitting(false);
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
                       
                    }) => (
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="exampleInputEmail1" className="form-label">Add New Category</label>

                            <input className="form-control"
                                type="text"
                                name="category"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.category}
                            />
                            <span style={{ color: 'red' }}>{errors.category && touched.category && errors.category}</span><br />
                            <div>
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    INSERT CATEGORY
                                </button>
                            </div>
                        </form>
                    )}

                </Formik>


                {/*----------------------------- end form --------------------*/}

                <br /><br />
                <h3>All Category</h3>
                
                <table className="table table-hover table-striped">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">S#</th>
                            <th scope="col">Category Id</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Is Active</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>

                    <tbody>
                        {allCategory.map((category, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{category._id}</td>
                                    <td>{category.categoryName}</td>
                                    <td>{category.isActive}</td>
                                    <td>Edit</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>



            </div>
        </React.Fragment>
    )
}

export default AllCategory;
