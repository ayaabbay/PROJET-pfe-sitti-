import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from './Components/Sidebar';
import Header from './Components/Header';
import Home from './pages/Home';
import TeacherDashboard from './pages/TeacherDashbord.jsx';
import UploadReport from './pages/UploadReport.jsx';


const App = () => {
  // État pour gérer le mode clair/sombre
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('currentMode') || 'light'; // Récupère le mode depuis localStorage ou 'light'
  });

  // Sauvegarde le mode dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('currentMode', mode);
  }, [mode]);

  // Crée un thème basé sur le mode actuel
  const theme = createTheme({
    palette: {
      mode: mode, // Définit le mode clair ou sombre
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Sidebar />
        <Header setMode={setMode} /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teacherdashbord" element={<TeacherDashboard/>} /> 
          <Route path="/uploadreport" element={<UploadReport/>} /> 
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
