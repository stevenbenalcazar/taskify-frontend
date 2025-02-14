import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { Container, Typography, Button, Box, Dialog } from "@mui/material";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateBoard from "./pages/CreateBoard";

const AppContent = () => {
  const location = useLocation();
  const hideSidebar = location.pathname === "/login" || location.pathname === "/register";
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      {!hideSidebar && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-board" element={<CreateBoard closeModal={() => setOpen(false)} />} /> {/* ✅ Pasa la prop closeModal */}
          <Route
            path="/"
            element={
              <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
                <Typography variant="h3" color="#6A1B9A">
                  TASKIFY
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Organiza tus tareas con tableros interactivos.
                </Typography>
                <Button variant="contained" color="primary" style={{ marginTop: "20px" }} onClick={() => setOpen(true)}>
                  Crear Tablero
                </Button>

                {/* ✅ Muestra el modal con CreateBoard */}
                <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
                  <CreateBoard closeModal={() => setOpen(false)} />
                </Dialog>
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
