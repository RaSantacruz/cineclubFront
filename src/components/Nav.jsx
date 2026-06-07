import {useState} from 'react';
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ProfileButton from "./Authentification/ProfileButton";
import NavButton from "./UI/NavButton";
import AdminMenu from "./BackOffice/AdminMenu";
import useAuth from "../hooks/useAuth";
import logocineclub from "../assets/logos-icons/logocineclub.png";
import { Link } from "react-router-dom";
import { Box, Menu, MenuItem, IconButton } from "@mui/material";
import {LocalMovies} from '@mui/icons-material';

export default function Nav() {
  // ancre pour le bouton des films ( version mobile)
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useAuth();
  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: "1rem",
          height: "10vh",
          bgcolor: "white",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "90vw",
            gap: "1.5rem",
          }}
        >
          <Link to="/">
            <img src={logocineclub} alt="logo cineclub" height="60vh" />
          </Link>
          {/* Bloc des boutons vers les films, écrans de grande taille */}
          <Box sx={{display:{xs:"none",md:"flex"},gap:"5rem"}}>
            <NavButton to="/FilmsInCompetition">
              Voter pour le prochain film
            </NavButton>
            <NavButton to="/previous">Films passés</NavButton>
            <NavButton to="/programmed">Films à venir</NavButton>
            <NavButton to="/about">A propos</NavButton>
          </Box>
          {/* Menu des films pour écran de petite taille */}
          <Box sx={{display:{xs:"flex",md:"none"}}}>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} >
              <LocalMovies sx={{color:"primary.main", fontSize:"5rem"}}/>
            </IconButton>

            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
              <MenuItem>
                <NavButton to="/FilmsInCompetition">
                  Voter pour le prochain film
                </NavButton>
              </MenuItem>
              <MenuItem>
                <NavButton to="/previous">Films passés</NavButton>
              </MenuItem>
              <MenuItem>
                <NavButton to="/programmed">Films à venir</NavButton>
              </MenuItem>
              <MenuItem>
                <NavButton to="/about">A propos</NavButton>
              </MenuItem>
            </Menu>
          </Box>  

          
          {user && user?.role === "ADMIN" && <AdminMenu />}
          <ProfileButton />
        </Toolbar>
        {/* spacer automatique */}
      </AppBar>
      {/* spacer */}
      <Toolbar sx={{ height: "10vh" }} />
    </>
  );
}
