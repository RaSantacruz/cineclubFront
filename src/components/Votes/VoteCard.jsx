import { useState, useEffect } from "react";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import VotesCounter from "./VotesCounter";
import useAuth from "../../hooks/useAuth";

export default function VoteCard({
  filmData,
  index,
  chosenFilmId,
  setChosenFilmId,
}) {
  // console.log("film choisi:", chosenFilmId, "film id:", filmData.id);
  const { user } = useAuth();
  const [isSelected, setIsSelected] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [nbVotes, setNbVotes] = useState(null);
  // version raccourcie du synopis
  let synopsisShort;
  if (filmData?.synopsis && filmData?.synopsis.length > 200) {
    synopsisShort =
      filmData.synopsis.substring(0, 80).split(" ").slice(0, -1).join(" ") +
      "...";
  } else {
    synopsisShort = filmData?.synopsis;
  }
  useEffect(() => {
    if (chosenFilmId === filmData.id) {
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  }, [chosenFilmId]);
  async function getNbVotes() {
    const url = `${import.meta.env.VITE_API_URL}/votes/count/${filmData.id}`;
    const response = await fetch(url);
    const data = await response.json();    
    setNbVotes(data.count);
  }
  useEffect(() => {
    getNbVotes();
  }, [chosenFilmId]);
  async function addVote() {
    if (user) {
      const url = `${import.meta.env.VITE_API_URL}/votes/protected/addVote`;
      await fetch(url, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ filmId: filmData.id }),
        headers: { "Content-Type": "application/json" },
      });
      setChosenFilmId(filmData.id);
      getNbVotes();
    } else {
      alert("Veuillez vous connecter pour voter");
    }
  }
  const hoveredStyle = {
    backgroundColor: (theme) => theme.palette.secondary.light,
  };
  const isSelectedStyle = {
    backgroundColor: (theme) => theme.palette.primary.main,
    border: "2px solid black",
  };
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1rem",
        width: "25rem",
        height: "30rem",
        cursor: "pointer",
        p: 2,
        position: "relative",
        transition: "background-color 0.3s ease-in-out",
        ...(isHovered && !isSelected && hoveredStyle),
        ...(isSelected && isSelectedStyle),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={addVote}
    >
      {isSelected && (
        <Box sx={{ position: "absolute", top: "1rem", right: "1rem" }}>✅</Box>
      )}
      <CardMedia
        component="img"
        height="140"
        image={import.meta.env.VITE_API_URL + filmData.url_image}
        sx={{ objectFit: "contain", height: "15rem" }}
        alt={filmData.name}
      ></CardMedia>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {filmData.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {synopsisShort }
        </Typography>
        <Typography
          sx={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            fontSize: "10rem",
            color: "secondary.contrastText",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {index + 1}
        </Typography>
        <Typography
          sx={{
            position: "absolute",
            top: "5rem",
            right: "1rem",
            fontSize: "1rem",
            color: " black",            
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          <VotesCounter nbVotes={nbVotes} />
        </Typography>
      </CardContent>
      <Link to={`/film/${filmData.id}`}>Plus d'infos</Link>
    </Card>
  );
}
