import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Header from "./component/Header";
import Login from "./page/Login";

function App() {
  return (
      <div className="bg-gray-tone">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
      </div>
  )
}

export default App;
