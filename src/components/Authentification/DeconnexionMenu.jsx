import useAuth from "../../hooks/useAuth";
import { Button, Menu, MenuItem } from "@mui/material";

export default function DeconnexionMenu({ anchorEl, open, onClose }) {
  // fonction de logout côté front-end
  const { logout } = useAuth();
  // logout côté back-end (suppression du cookie de session)
  const url = import.meta.env.VITE_API_URL + "/users/logout";
  function logoutFromBackend() {
    fetch(url, {
      method: "POST",
      credentials: "include",
    });
  }
  function handleClick() {
    onClose();
    logoutFromBackend();
    logout();
  }

  function handleClick() {
    onClose();
    logoutFromBackend();
    logout();
  }
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={onClose} sx={{ mt: 1 }}>
      <MenuItem onClick={handleClick}>Se déconnecter</MenuItem>
    </Menu>
  );
}
