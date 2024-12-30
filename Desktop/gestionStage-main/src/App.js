import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Navbar from "./components/Navbar";
import ProfesseurCrud from "./components/ProfesseurCrud";
import StudentCrud from "./components/StudentCrud";
import TemplateViewer from "./components/TemplateViewer";
import ExaminateurCrud from "./components/ExaminateurCrud";
import RapporteurCrud from "./components/RapporteurCrud";
import EncadrantCrud from "./components/EncadrantCrud";
import StageCrud from "./components/StageCrud";
import Dashboard from "./components/Dashboard";

import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleMenuClick = (menuName) => {
    setActivePage(menuName);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/dashboard/*"
          element={
            <div className="dashboard-container">
              <Navbar />
              <div className="app-container">
                <Sidebar onMenuClick={handleMenuClick} />
                <MainContent>
                  {activePage === "Dashboard" && <Dashboard />}
                  {activePage === "NosProfesseurs" && <ProfesseurCrud />}
                  {activePage === "NosEtudiants" && <StudentCrud />}
                  {activePage === "Templates" && <TemplateViewer />}
                  {activePage === "Examinateurs" && <ExaminateurCrud />}
                  {activePage === "Rapporteurs" && <RapporteurCrud />}
                  {activePage === "Encadrants" && <EncadrantCrud />}
                  {activePage === "NosStages" && <StageCrud />}
                </MainContent>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
