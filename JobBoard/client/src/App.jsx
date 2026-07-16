import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import EmployerDashboard from "./pages/EmployerDashboard";
import CandidateDashboard from "./pages/CandidateDashboard";
import Companies from "./pages/Companies";
import About from "./pages/About";
import Applicants from "./pages/Applicants";
import ProtectedRoute from "./components/ProtectedRoute";
import PostJob from "./pages/PostJob";
import EditJob from "./pages/EditJob";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/jobs" element={<JobList />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/job/:id" element={<JobDetails />} />

        <Route
          path="/employer"
          element={
            <ProtectedRoute role="employer">
              <EmployerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/post-job"
          element={
            <ProtectedRoute role="employer">
              <PostJob />
            </ProtectedRoute>
          }
        />

        {/* NEW EDIT JOB ROUTE */}
        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute role="employer">
              <EditJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidate"
          element={
            <ProtectedRoute role="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicants/:jobId"
          element={<Applicants />}
        />

        <Route path="/companies" element={<Companies />} />

        <Route path="/about" element={<About />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;