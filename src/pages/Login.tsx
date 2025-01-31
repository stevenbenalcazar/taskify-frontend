import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      // Aquí puedes redirigir al usuario al dashboard o guardar el token

    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
        <Typography variant="h4" color="primary">
          Iniciar Sesión
        </Typography>
      </Box>
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
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Iniciar Sesión
        </Button>
        <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
          ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
