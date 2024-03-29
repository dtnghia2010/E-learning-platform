import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./component/Header";
import Login from "./page/Login";
import Register from "./page/Register";
import HomePage from "./page/HomePage";
import Lecture from "./component/Lecture/Lecture";

function App() {

  return (
      <div className="bg-gray-tone">
          {/*<Header />*/}
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route exact path="/" element={<HomePage />}/>
            <Route exact path="/lecture" element={<Lecture />}/>

        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App;
