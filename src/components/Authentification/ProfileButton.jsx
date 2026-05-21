import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { IconButton, Avatar } from "@mui/material";
import AuthentificationMenu from "./AuthentificationMenu";
import DeconnexionMenu from "./DeconnexionMenu";

export default function ProfileButton() {
  const { user } = useAuth();  
  function getInitials(name) {
    if (!name) return "";

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <Avatar alt="Bouton profil" src={user?.avatar}>
          {getInitials(user?.pseudo)}
        </Avatar>
      </IconButton>
      {user === null ? (
        <AuthentificationMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        />
      ) : (
        <DeconnexionMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        />
      )}
    </>
  );
}
