import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 

const AppContent = () => {
  const location = useLocation(); // Obtiene la ruta actual

  // Definir rutas donde NO queremos mostrar el Sidebar
  const hideSidebar = location.pathname === "/login" || location.pathname === "/register";

  return (
    <Box sx={{ display: "flex" }}>
      {/* Mostrar Sidebar solo si NO estamos en Login o Register */}
      {!hideSidebar && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
                <Typography variant="h3" color="#6A1B9A">
                  TASKIFY
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                </Typography>
                <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
                  Empezar
                </Button>
              </Container>
            }
          />
        </Routes>
      </Box>
    </Box>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;