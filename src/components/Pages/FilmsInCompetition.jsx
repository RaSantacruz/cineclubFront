import { useEffect, useState } from "react";
import VoteCard from "../Votes/VoteCard";
import { Typography, Box } from "@mui/material";
import { data } from "react-router-dom";
import VotesBox from "../Votes/VotesBox";
export default function ProgrammedFilms() {
  const [filmsData, setFilmsData] = useState(null);
  const [vote, setVote] = useState(null);
  const [text, setText] = useState(null);
  

  useEffect(() => {
    async function getFilms() {
      const url = `${import.meta.env.VITE_API_URL}/films/getAll`;
      const response = await fetch(url);
      let data = await response.json();      
      data = data.filter((film) => film.status === "suggested");
      setFilmsData(data);
    }
    async function getText() {
      const url = `${import.meta.env.VITE_API_URL}/site_texts/getByRole/competition_intro`;
      const response = await fetch(url);
      const data = await response.json();      
      setText(data);
    }
    
    getFilms();
    getText();
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
            A vous de jouer!
          </Typography>
          <Typography variant="p">
            {text && text.content}
          </Typography>
        </Box>

        <VotesBox filmsData={filmsData} />

        
      </>
    );
  }
}
