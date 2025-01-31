import { Container, Typography, Button } from "@mui/material";

function App() {
  return (
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
  );
}

export default App;
