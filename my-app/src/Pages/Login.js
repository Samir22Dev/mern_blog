import React from "react";
import Navbar from "../Component/Navbar";
import { Formik } from 'formik';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import App from "../App";

const Login = () => {
    const navigate = useNavigate();

    return (
        <React.Fragment>
            <Navbar />

            <div className="container">
                <div className="col-md-4 offset-md-4">
                    <h1>Login Page</h1>

                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validate={values => {
                            const errors = {};
                            if (!values.email) {
                                errors.email = 'Email is required';
                            } else if (
                                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                            ) {
                                errors.email = 'Invalid email address';
                            }
                            if (!values.password) {
                                errors.password = 'password is required';
                            }
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {                                

                                axios.post('http://localhost:5000/login', {
                                    email: values.email,
                                    password: values.password,
                                })
                                    .then((response) => {
                                        console.log(response.data);
                                        var item_value = sessionStorage.setItem("login_key", values.email);
                                        console.log('login page: ', item_value);

                                        if (response.data.status === false) {
                                            alert('There is no user found with that email and password. Please try again.');
                                        } else {
                                            console.log('Login Successfully');
                                            navigate("/");
                                        }                                        
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
                                    value={values.email} className="form-control"
                                />
                                <span style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</span>
                                <br /> <br />

                                <label htmlFor="formFile" className="form-label">Valid Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password} className="form-control"
                                />
                                <span style={{ color: 'red' }}>{errors.password && touched.password && errors.password}</span>
                                <br />
                                <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
                                    Login
                                </button>
                                <button type="button" className="btn btn-link"><Link to="/signup">SignUp</Link></button>

                            </form>
                        )}
                    </Formik>
                </div>
            </div>
        </React.Fragment >

    )

}

export default Login;
