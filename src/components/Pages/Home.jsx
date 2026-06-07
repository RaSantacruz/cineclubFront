import { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import getAllFilms from "../../helpers/getAllFims";
import FilmSmall from "../Films/FilmSmall";
import SubscriptionBox from "../Subscription/SubscriptionBox";
import metropolis from "../../assets/images/metropolis.webp";
export default function Home() {
  const [text, setText] = useState(null);
  const [nextFilm, setNextFilm] = useState(null);
  const url = `${import.meta.env.VITE_API_URL}/site_texts/getByRole/home_intro`;
  async function getText() {
    const response = await fetch(url);
    const data = await response.json();
    setText(data);
  }
  async function getNextFilm() {
    let films = await getAllFilms();
    films = films.filter((film) => film.status === "programmed");
    films = films.filter((film) => {
      const today = new Date();
      const releaseDate = new Date(film.projection_date);
      return releaseDate > today;
    });
    films.sort(
      (a, b) => new Date(a.projection_date) - new Date(b.projection_date),
    );
    setNextFilm(films[0]);
  }
  useEffect(() => {
    getText();
    getNextFilm();
  }, []);

  return (
    <Paper
      elevation={2}
      sx={{
        p: "1rem",
        m: 3,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${metropolis})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        color: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "start",
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          Cineclub de l'IUT MMI -Dijon
        </Typography>
        <Typography
          variant="body1"
          dangerouslySetInnerHTML={{ __html: text?.content }}
        />
      </Box>

      <Box>
        <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
          PROCHAINE SEANCE
        </Typography>
        {nextFilm && <FilmSmall filmData={nextFilm} />}
        {nextFilm && <SubscriptionBox filmId={nextFilm.id} />}
      </Box>
    </Paper>
  );
}
