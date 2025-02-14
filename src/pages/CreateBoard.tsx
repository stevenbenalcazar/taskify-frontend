import { useState } from "react";
import TaskifyBoard from "../components/TaskifyBoard";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

const API_ENDPOINTS = {
  createBoard: "http://52.45.52.31:3000/boards",
  updateLists: "http://34.230.174.23:5005/api/lists",
  deleteLists: "http://34.194.216.89:5003/api/lists",
  viewLists: "http://52.201.26.144:5002/api/lists",
  updateCards: "http://54.158.130.207:5007/cards",
  createCards: "http://54.145.242.234"
};

interface CreateBoardProps {
  closeModal: () => void;
}

const CreateBoard: React.FC<CreateBoardProps> = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [showBoard, setShowBoard] = useState(false);

  const handleCreate = () => {
    console.log("Simulando llamada a API:", API_ENDPOINTS.createBoard);
    setShowBoard(true);
    // NO LLAMES closeModal aquí si quieres que siga abierto
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Create Board
        </Typography>
        <form style={{ width: "100%", maxWidth: "500px" }}>
          <TextField 
            fullWidth 
            label="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            margin="normal"
          />
          <TextField 
            fullWidth 
            label="Workspace ID" 
            value={workspaceId} 
            onChange={(e) => setWorkspaceId(e.target.value)}
            margin="normal"
          />
          <Button 
            variant="contained" 
            color="primary" 
            fullWidth 
            onClick={handleCreate} // ✅ Simula llamada a API
          >
            Create
          </Button>
          <Button 
            variant="outlined"
            fullWidth 
            onClick={closeModal} // ✅ Agregar botón para cerrar manualmente
          >
            Cancelar
          </Button>
        </form>
      </Box>
      {showBoard && (
        <Box mt={5} width="100%">
          <Typography variant="h5" gutterBottom>
            {name || "Nuevo Tablero"}
          </Typography>
          <TaskifyBoard />
        </Box>
      )}
    </Container>
  );
};

export default CreateBoard;
