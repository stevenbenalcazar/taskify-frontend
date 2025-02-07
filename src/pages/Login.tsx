import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import LogoName from "../assets/taskify-name.png"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Reiniciar errores antes de enviar

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("https://tu-api.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      console.log("Inicio de sesión exitoso:", data);
      navigate("/"); // Redirigir al usuario a la página principal

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box 
        sx={{ 
          textAlign: "center", 
          marginTop: 5, 
          backgroundColor: "white", 
          borderRadius: "12px", 
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", 
          padding: 4
        }}
      >
        {/* Logo en la parte superior */}
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
          <img src={LogoName} alt="Taskify Name" style={{ height: "70px" }} />
        </Box>

        <Typography variant="h4" color="#6A1B9A" sx={{ fontWeight: "bold" }}>
          Iniciar Sesión
        </Typography>

        <Box sx={{ mt: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            fullWidth
            label="Correo Electrónico"
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button 
            variant="contained" 
            fullWidth 
            sx={{ 
              mt: 3, 
              backgroundColor: "#6A1B9A", 
              color: "white", 
              "&:hover": { backgroundColor: "#4A148C" }
            }} 
            onClick={handleLogin}
          >
            Iniciar Sesión
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "#6A1B9A" }}>
            ¿No tienes cuenta? <a href="/register" style={{ color: "#6A1B9A", fontWeight: "bold" }}>Regístrate aquí</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
