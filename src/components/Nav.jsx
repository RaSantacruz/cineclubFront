import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ProfileButton from "./Authentification/ProfileButton";
import NavButton from "./UI/NavButton";
import useAuth from "../hooks/useAuth";


export default function Nav() {
  const {user} = useAuth();
  return (
    <>
    <AppBar
      position="fixed"
      sx={{
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        height: "10vh",
      }}
    >
      <Toolbar
        sx={{ display: "flex", justifyContent: "space-around", width: "70vw" }}
      >
        <NavButton to="/FilmsInCompetition">Films en compétition</NavButton>
        <NavButton to="/previous">Films passés</NavButton>
        <NavButton to="/programmed">Films à venir</NavButton>
        <NavButton to="/about">A propos</NavButton>
        {user && user?.role==="ADMIN" && <NavButton to="/backoffice">Gérer les films</NavButton>}
        <ProfileButton />
      </Toolbar>
      {/* spacer automatique */}
      
    </AppBar>
    {/* spacer */}
    <Toolbar sx={{ height: "10vh" }}/>
    </>
  );
}
