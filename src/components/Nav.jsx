import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function Nav() {
    return (
        <AppBar position="static" sx={{display:'flex', alignItems:'center', marginBottom:'5rem'}}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-around', width: '70vw'}}>
                <Button component={RouterLink} to="/FilmsInCompetition" color="secondary.light">Films en compétition</Button>
                <Button component={RouterLink} to="/previous" color="secondary.light">Films passés</Button>
                <Button component={RouterLink} to="/programmed" color="secondary.light">Films à venir</Button>                
                <Button component={RouterLink} to="/about" color="secondary.light">A propos</Button>
                <Button component={RouterLink} to="/backoffice" color="secondary.light">Gérer les films</Button>
            </Toolbar>
        </AppBar>
    )
}