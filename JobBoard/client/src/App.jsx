import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import SavedJobs from "./pages/SavedJobs";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyOtp from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/jobs" element={<JobList />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/job/:id" element={<JobDetails />} />

        <Route path="/saved-jobs" element={<SavedJobs />} />

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

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}

export default App;