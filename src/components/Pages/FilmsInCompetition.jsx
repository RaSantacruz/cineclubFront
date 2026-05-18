import { useEffect, useState } from "react";
import FilmList from "../Films/FilmList";
import { Typography, Box } from "@mui/material";
import { data } from "react-router-dom";
export default function ProgrammedFilms() {
  const [filmsData, setFilmsData] = useState(null);

  useEffect(() => {
    async function getFilms() {
      const url = `${import.meta.env.VITE_API_URL}/films/getAll`;
      const response = await fetch(url);
      let data = await response.json();
      console.log(data);
      data = data.filter((film) => film.status === "suggested");
      setFilmsData(data);
    }
    getFilms();
  }, []);
  if (data.length === 0) {
    return (
      <Typography variant="h5">
        Aucun film en compétition pour le moment
      </Typography>
    );
  } else {
    return (
      <>
        <Box
          variant="section"
          sx={{
            p: 2,
            border: "1px dashed grey",
            bgcolor: "secondary.dark",
            color: "secondary.contrastText",
          }}
        >
          <Typography variant="h5">
            Votez pour les films en compétition ci-dessous
          </Typography>
          <Typography variant="p">
            Vous donnerez une note de 1 à 5 pour chaque film. Le film retenu
            sera celui qui a la meilleure note moyenne.
          </Typography>
        </Box>

        {filmsData && <FilmList filmsData={filmsData} />}
      </>
    );
  }
}
