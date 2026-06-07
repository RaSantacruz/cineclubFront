import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ProfileButton from "./Authentification/ProfileButton";
import NavButton from "./UI/NavButton";
import AdminMenu from "./BackOffice/AdminMenu";
import useAuth from "../hooks/useAuth";
import logocineclub from "../assets/logos-icons/logocineclub.png";
import { Link } from "react-router-dom";
import {Box} from "@mui/material";

export default function Nav() {
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
          }}
        >
          <Link to="/">            
              <img src={logocineclub} alt="logo cineclub" width="100px" />            
          </Link>
          <NavButton to="/FilmsInCompetition">Films en compétition</NavButton>
          <NavButton to="/previous">Films passés</NavButton>
          <NavButton to="/programmed">Films à venir</NavButton>
          <NavButton to="/about">A propos</NavButton>
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
