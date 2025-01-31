import { Container, Typography, Button, Box } from "@mui/material";
import Sidebar from "./components/Sidebar"; // Importamos el Sidebar

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Fijo a la Izquierda */}
      <Sidebar />

      {/* Contenido Principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="md" style={{ textAlign: "center", marginTop: "50px" }}>
          <Typography variant="h3" color="primary">
            Bienvenido a TASKIFY
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Gestión de tareas con Material UI
          </Typography>
          <Button variant="contained" color="primary" style={{ marginTop: "20px" }}>
            Empezar
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default App;