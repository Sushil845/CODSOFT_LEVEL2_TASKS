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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/employer" element={<EmployerDashboard />} />
        <Route path="/candidate" element={<CandidateDashboard />} />
        <Route path="/companies" element={<Companies />} />
<Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;