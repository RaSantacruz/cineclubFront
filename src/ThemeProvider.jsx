import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(254,204,0)",
    },
    secondary: {
      main: "#f00",
    },
  },
  typography: {
    h4: {
      fontFamily: 'Cinzel',
      fontWeight: 700
    },
    h6: {
      fontFamily: 'Cinzel',
      fontWeight: 700
    },
    p: {
      fontFamily: 'Roboto',
      fontWeight: 400
    }
  },
});

export default theme;