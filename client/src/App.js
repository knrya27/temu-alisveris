
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SiparisFormu from "./SiparisFormu";
import AdminPanel from "./AdminPanel";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SiparisFormu />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
