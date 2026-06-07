import { useEffect, useState } from "react";
import { Box, Grid } from "@mui/material";
import VoteCard from "./VoteCard";
import useAuth from "../../hooks/useAuth";

export default function VotesBox({ filmsData }) {
  const { user } = useAuth();
  const [chosenFilmId, setChosenFilmId] = useState(null);
  async function getVote() {
    const url = `${import.meta.env.VITE_API_URL}/votes/protected/get`;
    const response = await fetch(url, { credentials: "include" });
    const data = await response.json();    ;
    setChosenFilmId(data.filmId);
  }
  useEffect(() => {    
    if (user) {
      getVote();
    } else {
      setChosenFilmId(null);
    }
  }, [user, chosenFilmId]);
  return (
    <Grid
        container        
        sx={{ minHeight: "90vh",  m:0, p:0 }}
      >
      {filmsData?.map((film, index) => (
        <VoteCard
          filmData={film}
          key={film.id}
          index={index}
          chosenFilmId={chosenFilmId}
          setChosenFilmId={setChosenFilmId}
        />
      ))}
    </Grid>
  );
}
