import React from "react";
import Navbar from "../Component/Navbar";
import Category from "../Component/Category";
import Blog from "./Blogs";


const Home = () => {
    return (
        <React.Fragment>
            <Navbar />

            <div className="container">
                <h1>Home page</h1>

                <div className="row">
                    <div className="col-4"><Category/></div>
                    <div className="col-8"><Blog/></div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Home;