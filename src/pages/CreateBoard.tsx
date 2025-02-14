import { useState } from "react";
import TaskifyBoard from "../components/TaskifyBoard";
import { Container, Box, Typography, TextField, Button } from "@mui/material";

interface CreateBoardProps {
  closeModal: () => void;
}

const CreateBoard: React.FC<CreateBoardProps> = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [showBoard, setShowBoard] = useState(false);

  const handleCreate = () => {
    setShowBoard(true);
    // NO LLAMES closeModal aquí si quieres que siga abierto
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Create Board
        </Typography>
        <form style={{ width: '100%', maxWidth: '500px' }}>
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
            onClick={handleCreate} // ✅ NO LLAMES closeModal AQUÍ
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
