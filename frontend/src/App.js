import './App.css';
import {
    BrowserRouter,
    Routes,
    Route, useLocation,
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
import QuizSearch from "./page/Quiz/QuizSearch";
import Quizz from "./component/Quiz/Quizz";
import CreateQuizz from "./page/Quiz/CreateQuizz";
import CreateQuestion from "./page/Quiz/CreateQuestion";
import UpdateQuestion from "./page/Quiz/UpdateQuestion";
import FinalResult from "./page/Quiz/FinalResult";
import Chapter from "./page/chapter/Chapter";


function App() {

  return (
      <div className="bg-gray-tone flex flex-col min-h-screen">
          <BrowserRouter>
              <MainRoutes/>
          </BrowserRouter>
          <Footer/>
      </div>
  )
}

function MainRoutes() {
    const location = useLocation();

    return (
        <>
            {!location.pathname.startsWith("/quizz") && <Header />}
            <main className="flex-grow">
                <Routes>
                    <Route path="/login" element={<Login style={{ position: 'relative', zIndex: 5 }} />} />
                    <Route path="/register" element={<Register />} />
                    <Route exact path="/" element={<HomePage />}/>

                    <Route path="/course/:category_id" element={<CourseList />} />

                    <Route path="/document/:course_id" element={<DocumentList/>} />
                    <Route path="/addDocument" element={<CreateDocument/>} />

            <Route exact path="/lecture/:id" element={<Lecture />}/>
            <Route exact path="/profile" element={<Profile />}/>
                    <Route exact path="/chapter/:id" element={<Chapter/>}/>
            <Route path="/update_document/:documentId" element={<UpdateDocument />}/>
            <Route exact path="/update_chapter" element={<UpdateChapter />}/>
                    <Route path="/create_question/:id" element={<CreateQuestion/>}   />
            <Route path="/search_quiz" element={<QuizSearch/>}/>

                        <Route path="/quizz/:id" element={
                                <Quizz />
                        } />
             <Route path="/create_quizz" element={<CreateQuizz/>} />
             <Route path="/result/:id" element={<FinalResult/>}/>
                </Routes>


            </main>
        </>
    );
}

export default App;
