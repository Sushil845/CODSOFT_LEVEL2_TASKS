import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import QuizList from "./pages/QuizList/QuizList";
import CreateQuiz from "./pages/CreateQuiz/CreateQuiz";
import AttemptQuiz from "./pages/AttemptQuiz/AttemptQuiz";
import MyQuizzes from "./pages/MyQuizzes/MyQuizzes";
import MyAttempts from "./pages/MyAttempts/MyAttempts";
import Result from "./pages/Result/Result";
import EditQuiz from "./pages/EditQuiz/EditQuiz";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">

      <Navbar />

      <main className="flex-grow-1">

        <Routes>

          {/* Public Routes */}

          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}

          <Route
            path="/quizzes"
            element={
              <ProtectedRoute>
                <QuizList />
              </ProtectedRoute>
            }
          />

          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CreateQuiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/attempt/:id"
            element={
              <ProtectedRoute>
                <AttemptQuiz />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-quizzes"
            element={
              <ProtectedRoute>
                <MyQuizzes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-attempts"
            element={
              <ProtectedRoute>
                <MyAttempts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/result"
            element={
              <ProtectedRoute>
                <Result />
              </ProtectedRoute>
            }
          />

          <Route
            path="/edit-quiz/:id"
            element={
              <ProtectedRoute>
                <EditQuiz />
              </ProtectedRoute>
            }
          />

        </Routes>

      </main>

      <Footer />

    </div>
  );
}

export default App;