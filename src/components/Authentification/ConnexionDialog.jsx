import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";

export default function ConnexionDialog({ open, onClose }) {
  // récupération de la fonction de login côté front-end
  const { login } = useAuth();
  // variables pour formulaire contrôlé
  const [pseudoValue, setPseudoValue] = useState("");
  const [pwValue, setPwValue] = useState("");
  // messages d'erreur en cas de connexion ratéé
  const [error, setError] = useState(null);
  // url de connexion niveau back-end
  const url = import.meta.env.VITE_API_URL + "/users/login";
  async function loginAttempt() {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        pseudo: pseudoValue,
        password: pwValue,
      }),
    });

    if (response.status === 200) {
      setError(null);
      const data = await response.json();      
      login(data.user);
      onClose();
    } else {
      setError("Pseudo ou mot de passe incorrect");
    }
  }
  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Connexion</DialogTitle>
        <DialogContent>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Pseudo"
            type="text"
            color="secondary"
            value={pseudoValue}
            onChange={(event) => setPseudoValue(event.target.value)}
            fullWidth
          />

          <TextField
            autoFocus
            margin="dense"
            label="Mot de passe"
            type="password"
            color="secondary"
            value={pwValue}
            onChange={(event) => setPwValue(event.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="secondary">
            Annuler
          </Button>
          <Button onClick={loginAttempt} color="secondary">
            Se connecter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
