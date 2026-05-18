import { useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import ConnexionDialog from "./ConnexionDialog";
import InscriptionDialog from "./InscriptionDialog";

export default function AuthentificationMenu({ anchorEl, open, onClose }) {
  const [connexionDialogOpen, setConnexionDialogOpen] = useState(false);
  const [inscriptionDialogOpen, setInscriptionDialogOpen] = useState(false);
  function handleClickConnexion() {
    onClose();
    // délai pour laisser le menu se fermer
    setTimeout(() => {
    setConnexionDialogOpen(true);
  }, 100);
  }
  function handleCloseConnection() {
    setConnexionDialogOpen(false);
  }
  function handleClickInscription() {
    onClose();
    // délai pour laisser le menu se fermer
    setTimeout(() => {
    setInscriptionDialogOpen(true);
  }, 100);
  }
  function handleCloseInscription() {
    setInscriptionDialogOpen(false);
  }

  return (
    <>
      <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
        <MenuItem onClick={handleClickConnexion}>Se connecter</MenuItem>
        <MenuItem onClick={handleClickInscription}>S'inscrire</MenuItem>
      </Menu>
      <ConnexionDialog
        open={connexionDialogOpen}
        onClose={handleCloseConnection}
      />
      <InscriptionDialog
        open={inscriptionDialogOpen}
        onClose={handleCloseInscription}
      />
    </>
  );
}
