import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

const NavButton = ({ children, to }) => {
  return (
    <Button
      variant="contained"      
      component={RouterLink}
      to={to}
      sx={{
        fontFamily: "Cinzel",
        fontWeight: 700,
        fontSize: "1rem",
        bgcolor: "primary.light",
      }}
    >
      {children}
    </Button>
  );
};

export default NavButton;
