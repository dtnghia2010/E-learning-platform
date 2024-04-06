import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./component/layout/Header";
import Login from "./page/Login";
import Register from "./page/Register";
import HomePage from "./page/HomePage";
import CourseList from "./page/course/CourseList";
import Footer from "./component/layout/Footer";
import Lecture from "./component/Lecture/Lecture";
import Profile from "./page/Profile";

function App() {

  return (
      <div className="bg-gray-tone">
          <Header />
      <BrowserRouter>
          <Header />
        <Routes>
          <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route exact path="/" element={<HomePage />}/>
            <Route exact path="/lecture" element={<Lecture />}/>
            <Route exact path="/profile" element={<Profile />}/>

            <Route path="/course" element={<CourseList/>}/>
        </Routes>
      </BrowserRouter>
          <Footer/>
      </div>
  )
}

export default App;
