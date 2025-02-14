import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoName from "../assets/taskify-name.png"; // Importamos solo el logo con nombre

// 🔹 Definir la URL de la API de manera centralizada
const API_URL = import.meta.env.VITE_API_URL || "http://35.171.68.13:3000";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError(""); // Reiniciar errores antes de enviar

    if (!name || !email || !password || !confirmPassword) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/users/register`, { // 🔹 Ahora toma la URL dinámica
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrar");
      }

      console.log("Registro exitoso:", data);
      navigate("/login"); // Redirigir al login después de registrarse

    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido.");
      }
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
        {/* Logo en la parte superior (grande) */}
        <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 3 }}>
          <img src={LogoName} alt="Taskify Name" style={{ height: "80px" }} />
        </Box>

        <Typography variant="h4" color="#6A1B9A" sx={{ fontWeight: "bold" }}>
          Crear Cuenta
        </Typography>

        <Box sx={{ mt: 3 }}>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            fullWidth
            label="Nombre"
            margin="normal"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            type="password"
            margin="normal"
            variant="outlined"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleRegister}
          >
            REGISTRARSE
          </Button>
          <Typography variant="body2" sx={{ mt: 2, textAlign: "center", color: "#6A1B9A" }}>
            ¿Ya tienes cuenta jean? <a href="/login" style={{ color: "#6A1B9A", fontWeight: "bold" }}>Inicia sesión aquí</a>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
