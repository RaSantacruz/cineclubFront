import { Box } from "@mui/material";
import allocineLogo from "../../assets/logos-icons/allocine_logo_ico.svg";
import imdbLogo from "../../assets/logos-icons/imdb-logo.svg";
import youtubeLogo from "../../assets/logos-icons/YouTube_Symbol_0.svg";

export default function LogosBox({ url_allocine, url_imdb, url_youtube }) {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "10vh",
        top: "10vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        height: "80%",
        opacity: 0.2,
        transition: "opacity 0.3s ease-in-out",
        "&:hover": {
          opacity: 1,
        },
      }}
    >
      <Box
        component="a"
        href={url_allocine}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          textDecoration: "none",
        }}
      >
        <Box component="img" src={allocineLogo} sx={{ height: "3rem" }} />
      </Box>

      <Box
        component="a"
        href={url_imdb}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          textDecoration: "none",
        }}
      >
        <Box
          component="img"
          src={imdbLogo}
          alt="imdb"
          sx={{ height: "2rem" }}
        />
      </Box>

      <Box
        component="a"
        href={url_youtube}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          textDecoration: "none",
        }}
      >
        <Box
          component="img"
          src={youtubeLogo}
          alt="imdb"
          sx={{ height: "2rem" }}
        />
      </Box>
    </Box>
  );
}
