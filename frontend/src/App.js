import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./page/Login";
import Register from "./page/Register";
import HomePage from "./page/HomePage";
import Lecture from "./component/Lecture/Lecture";
import Profile from "./page/Profile";
import Header from "./component/layout/Header";
import Footer from "./component/layout/Footer";

function App() {

  return (
      <div className="bg-gray-tone">
          <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login style={{ position: 'relative', zIndex: 5 }} />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/" element={<HomePage />}/>
            <Route exact path="/lecture" element={<Lecture />}/>
            <Route exact path="/profile" element={<Profile />}/>
        </Routes>
      </BrowserRouter>
          <Footer/>
      </div>
  )
}

export default App;
