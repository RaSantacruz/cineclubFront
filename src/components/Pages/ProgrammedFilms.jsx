import { useEffect, useState } from "react";
import FilmList from "../Films/FilmList";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";

export default function ProgrammedFilms() {
  const [filmsData, setFilmsData] = useState(null);

  useEffect(() => {
    async function getFilms() {
      const url = `${import.meta.env.VITE_API_URL}/films/getAll`;
      const response = await fetch(url);
      let data = await response.json();
      data = data.filter((film) => film.status === "programmed");
      data = data.filter((film) => {
        const today = new Date();
        const releaseDate = new Date(film.projection_date);
        return releaseDate > today;
      });
      await new Promise(resolve => setTimeout(resolve, 3000));
      setFilmsData(data);
    }
    getFilms();
  }, []);
  // if (!filmsData)
  //   return (
  //     <Box
  //       sx={{
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         mt: 4,
  //       }}
  //     >
  //       <CircularProgress />
  //       <Typography sx={{ mt: 2 }}>Chargement...</Typography>
  //     </Box>
  //   );
  return <>{filmsData && <FilmList filmsData={filmsData} />}</>;
}
