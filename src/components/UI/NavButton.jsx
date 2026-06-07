import Button from "@mui/material/Button";
import { Link  } from "react-router-dom";

const NavButton = ({ children, to }) => {
  return (
    <Button
      variant="contained"      
      component={Link}
      to={to}
      sx={{
        fontFamily: "Orbitron",        
        fontSize: "0.8rem",
        bgcolor: "primary.light",
      }}
    >
      {children}
    </Button>
  );
};

export default NavButton;
