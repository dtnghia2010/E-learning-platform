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

function App() {
  return (
      <div className="bg-gray-tone">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App;
