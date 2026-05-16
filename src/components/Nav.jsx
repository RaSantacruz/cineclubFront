import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavButton from "./UI/NavButton";


export default function Nav() {
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
        <NavButton to="/backoffice">Gérer les films</NavButton>
      </Toolbar>
      {/* spacer automatique */}
      
    </AppBar>
    {/* spacer */}
    <Toolbar sx={{ height: "10vh" }}/>
    </>
  );
}
