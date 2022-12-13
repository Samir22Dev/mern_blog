import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./Pages/Home";
import Blog from "./Pages/Blogs";
import AllCategory from "./Pages/AllCatetory";
import PostBlogs from './Pages/PostBlogs'
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import OneBlog from "./Pages/OneBlog";
import Cateblog from "./Pages/Cateblog";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/category" element={<AllCategory />} />
          <Route path="/post_blog" element={<PostBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/oneblog/:id" element={<OneBlog />} />
          <Route path="/cateblog/:id" element={<Cateblog />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
