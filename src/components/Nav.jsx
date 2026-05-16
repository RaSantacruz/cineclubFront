import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import NavButton from "./UI/NavButton";
import { Link as RouterLink } from "react-router-dom";

export default function Nav() {
    return (
        <AppBar position="static" sx={{display:'flex', alignItems:'center', marginBottom:'5rem'}}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-around', width: '70vw'}}>
                <NavButton to="/FilmsInCompetition" >Films en compétition</NavButton>
                <NavButton to="/previous" >Films passés</NavButton>
                <NavButton to="/programmed" >Films à venir</NavButton>                
                <NavButton to="/about" >A propos</NavButton>
                <NavButton to="/backoffice" >Gérer les films</NavButton>
            </Toolbar>
        </AppBar>
    )
}