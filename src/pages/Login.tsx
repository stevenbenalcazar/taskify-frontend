import { useState } from "react"; 
import { TextField, Button, Container, Typography, Box, Alert, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
import LogoName from "../assets/taskify-name.png"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Reiniciar errores antes de enviar

    if (!email || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true); // Mostrar carga mientras se procesa la solicitud

    try {
      const response = await fetch("http://3.229.31.59:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let errorMessage = "Error al iniciar sesión";
        try {
          const data = await response.json();
          errorMessage = data.message || errorMessage;
        } catch (jsonError) {
          console.error("Error al parsear la respuesta JSON:", jsonError);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log("Inicio de sesión exitoso:", data);
      navigate("/"); // Redirigir al usuario a la página principal

    } catch (err) {
      console.error("Error en el login:", err);

      if (err instanceof TypeError) {
        setError("No se pudo conectar con el servidor. Verifica tu conexión.");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido.");
      }
    } finally {
      setLoading(false); // Ocultar carga después de la solicitud
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
            disabled={loading} // Deshabilitar el botón mientras se procesa
            sx={{ 
              mt: 3, 
              backgroundColor: "#6A1B9A", 
              color: "white", 
              "&:hover": { backgroundColor: "#4A148C" }
            }} 
            onClick={handleLogin}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "white" }} /> : "Iniciar Sesión"}
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
