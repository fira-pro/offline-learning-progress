import TextField from "@mui/material/TextField";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useAppStore } from "../store/useAppStore";
import { useState } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function SelectUser() {
  const { users, setCurrentUser, createUser } =
    useAppStore();
  const [newUserName, setNewUserName] = useState("");

  const handleSelectUser = (user) => {
    setCurrentUser(user);
  };

  const handleCreateUser = async () => {
    if (newUserName.trim()) {
      await createUser(newUserName.trim());
      setNewUserName("");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Offline Learning
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Select User
          </Typography>
          <List>
            {users.map((user) => (
              <ListItem
                key={user.id}
                button="true"
                onClick={() => handleSelectUser(user)}
                sx={{
                  border: "1px solid #ddd",
                  mb: 1,
                  borderRadius: 1,
                }}
              >
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Create New User
          </Typography>
          <TextField
            fullWidth
            label="Enter your name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            onKeyPress={(e) =>
              e.key === "Enter" && handleCreateUser()
            }
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={handleCreateUser}
            disabled={!newUserName.trim()}
          >
            Create User
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
