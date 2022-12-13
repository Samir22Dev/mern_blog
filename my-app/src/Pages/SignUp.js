import React from "react";
import Navbar from "../Component/Navbar";
import { Formik } from 'formik';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignUp = () => {
    const navigate = useNavigate()
    return (
        <React.Fragment>
            <Navbar />

            <div className="container">
                <div className="row">
                    <div className="col-md-4 offset-md-4">

                        <h1>SignUp Page</h1>

                        <Formik
                            initialValues={{ email: '', password: '', User: '' }}
                            validate={values => {
                                const errors = {};
                                if (!values.email) {
                                    errors.email = 'Email is Required';
                                } else if (
                                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                ) {
                                    errors.email = 'Invalid email address';
                                }
                                if (!values.password) {
                                    errors.password = 'password is required';
                                }
                                if (!values.User) {
                                    errors.User = 'User is required';
                                }
                                return errors;
                            }}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {                                   
                                    axios.post('http://localhost:5000/user', {
                                        userName: values.User,
                                        email: values.email,
                                        password: values.password,
                                    })
                                        .then((response) => {
                                            console.log(response.data);
                                            navigate("/login")
                                            
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });                                    
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
                                
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="formFile" className="form-label">Your Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email} className='form-control'
                                    />
                                    <span style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</span>
                                    <br /> <br />
                                    <label htmlFor="formFile" className="form-label">username</label>

                                    <input
                                        type="text"
                                        name="User"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.User} className='form-control'
                                    />
                                    <span style={{ color: 'red' }}>{errors.User && touched.User && errors.User}</span>
                                    <br /> <br />
                                    <label htmlFor="formFile" className="form-label">password</label>

                                    <input
                                        type="password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password} className='form-control'
                                    />
                                    <span style={{ color: 'red' }}>{errors.password && touched.password && errors.password}</span>
                                    <br />
                                    <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                        Signup
                                    </button>
                                </form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </React.Fragment >

    )

}

export default SignUp;
