import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "hsl(48, 100%, 49.8%)",
      
    },
    secondary: {
      main: "hsl(202, 50%, 50%)",
    },
  },
  typography: {
    h4: {
      fontFamily: 'Cinzel',
      fontWeight: 700
    },
    h5: {
      fontFamily: 'Cinzel',
      fontWeight: 700
    },
    h6: {
      fontFamily: 'Cinzel',
      fontWeight: 700,
      fontSize: '1rem'
    },
    
    body1: {
      fontFamily: 'Roboto',
      fontWeight: 400,
      color: 'secondary.contrastText'
    }
  },
});

export default theme;