import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import QuizList from "./pages/QuizList/QuizList";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz";
import AttemptQuiz from "./pages/AttemptQuiz/AttemptQuiz";
import MyQuizzes from "./pages/MyQuizzes/MyQuizzes";
import MyAttempts from "./pages/MyAttempts/MyAttempts";
import Result from "./pages/Result/Result";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/attempt/:id" element={<AttemptQuiz />} />
        <Route path="/my-quizzes" element={<MyQuizzes />} />
        <Route path="/my-attempts" element={<MyAttempts />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </>
  );
}

export default App;