import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "hsl(48, 100%, 49.8%)",
      
    },
    secondary: {
      main: "#202349",
    },
  },
  typography: {
    h3: {
      fontFamily: 'Orbitron',
      fontWeight: 700
    },
    h4: {
      fontFamily: 'Orbitron',
      fontWeight: 700
    },
    h5: {
      fontFamily: 'Exo2',
      fontWeight: 700
    },
    h6: {
      fontFamily: 'Exo2',
      fontWeight: 700,
      fontSize: '1rem'
    },
    
    body1: {
      fontFamily: 'Exo2',
      fontWeight: 400,
      color: 'secondary.contrastText'
    }
  },
});

export default theme;