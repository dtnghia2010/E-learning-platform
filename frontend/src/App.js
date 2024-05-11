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
import CourseList from "./component/course/CourseList";

import DocumentList from "./component/document/DocumentList";
import CreateDocument from "./page/CreateDocument";
import UpdateDocument from "./page/UpdateDocument/UpdateDocument\'";
import UpdateChapter from "./page/chapter/UpdateChapter";


function App() {

  return (
      <div className="bg-gray-tone flex flex-col min-h-screen">

      <BrowserRouter>
          <Header />
          <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<Login style={{ position: 'relative', zIndex: 5 }} />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/" element={<HomePage />}/>

            <Route path="/course/:category_id" element={<CourseList />} />

            <Route path="/document/:course_id" element={<DocumentList/>} />
            <Route path="/addDocument" element={<CreateDocument/>} />

            <Route exact path="/lecture" element={<Lecture />}/>
            <Route exact path="/profile" element={<Profile />}/>
            <Route path="/update_document/:documentId" element={<UpdateDocument />}/>
            <Route exact path="/update_chapter" element={<UpdateChapter />}/>







        </Routes>
              </main>
      </BrowserRouter>
          <Footer/>
      </div>
  )
}

export default App;
