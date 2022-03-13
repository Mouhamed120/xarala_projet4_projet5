// import "../node_modules/bootstrap/dist/css/bootstrap.css";
import Header from "./components/header/Header";
import { Home } from "./components/home/Home";
import Menu from "./components/navbar/Menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Write from "./components/write/Write";
import Blog from "./components/blog/Blog";
import Contact from "./components/contact/Contact";
import About from "./components/about/About";
import { Context } from "./components/context/Contex";
import { useContext } from "react";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Single from "./components/single/Single";
import Settings from "./components/settings/Settings";

function App() {
  const { user } = useContext(Context);

  return (
    <div>
      <Router>
        <Menu />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/blog/:blogId" element={<Single />}></Route>
          <Route path="/blog" element={user ? <Blog /> : <Login />}></Route>
          <Route path="/write" element={user ? <Write /> : <Login />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/login" element={user ? <Home /> : <Login />}></Route>
          <Route
            path="/settings"
            element={user ? <Settings /> : <Login />}
          ></Route>
          <Route
            path="/register"
            element={user ? <Home /> : <Register />}
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
