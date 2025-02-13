import { useState } from 'react';
import axios from 'axios';
import Lists from './Lists';
import { Container, Box, Typography, TextField, Button } from '@mui/material';

const CreateBoard = () => {
  const [name, setName] = useState('');
  const [workspaceId, setWorkspaceId] = useState('');
  const [board, setBoard] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://52.45.52.31:3000/boards', {
        name,
        workspace_id: workspaceId,
      });
      setBoard(response.data);
      setMessage(`Board Created: ${response.data.name}`);
      setName('');
      setWorkspaceId('');
    } catch (error) {
      setMessage('Error creating board');
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
        <Typography variant="h4" gutterBottom>
          Create Board
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
          <TextField 
            fullWidth 
            label="Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            required 
            margin="normal"
          />
          <TextField 
            fullWidth 
            label="Workspace ID" 
            value={workspaceId} 
            onChange={(e) => setWorkspaceId(e.target.value)}
            required 
            margin="normal"
          />
          <Button variant="contained" color="primary" type="submit" fullWidth>
            Create
          </Button>
        </form>
        {message && <Typography color="error" mt={2}>{message}</Typography>}
      </Box>
      {board && <Lists />} {/* Renderizar Lists después de crear un tablero */}
    </Container>
  );
};

export default CreateBoard;
