import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

const API_URL = "http://54.166.53.144:5001/api/lists";// Reemplaza con la URL correcta

const Lists: React.FC = () => {
  const [lists, setLists] = useState<{ id: number; nombre: string; descripcion: string }[]>([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  // 🔹 Cargar listas al montar el componente
  useEffect(() => {
    fetchLists();
  }, []);

  const fetchLists = async () => {
    try {
      const response = await fetch(`${API_URL}`);
      const data = await response.json();
      setLists(data);
    } catch (error) {
      console.error("❌ Error al obtener listas:", error);
    }
  };

  const handleCreateList = async () => {
    if (!nombre.trim()) return;

    try {
      const response = await fetch(`${API_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, descripcion }),
      });

      if (!response.ok) throw new Error("Error al crear la lista");

      setNombre("");
      setDescripcion("");
      fetchLists(); // 🔄 Actualizar la lista después de crear una nueva
    } catch (error) {
      console.error("❌ Error al crear la lista:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        📋 Gestionar Listas
      </Typography>

      {/* Formulario para agregar nueva lista */}
      <Box display="flex" flexDirection="column" gap={2} mb={4}>
        <TextField label="Nombre de la lista" value={nombre} onChange={(e) => setNombre(e.target.value)} fullWidth />
        <TextField label="Descripción (opcional)" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} fullWidth />
        <Button variant="contained" color="primary" onClick={handleCreateList}>
          Crear Lista
        </Button>
      </Box>

      {/* Mostrar listas existentes */}
      <Typography variant="h6" gutterBottom>
        📌 Listas Existentes:
      </Typography>
      <List>
        {lists.length > 0 ? (
          lists.map((list) => (
            <ListItem key={list.id}>
              <ListItemText primary={list.nombre} secondary={list.descripcion || "Sin descripción"} />
            </ListItem>
          ))
        ) : (
          <Typography variant="body1">No hay listas creadas aún.</Typography>
        )}
      </List>
    </Container>
  );
};

export default Lists;
