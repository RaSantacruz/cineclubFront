import { useEffect, useState } from "react";
import FilmList from "../UI/FilmList";
import { Typography, Grid } from "@mui/material";
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
  return <>{filmsData && <FilmList filmsData={filmsData} />}</>;
}
