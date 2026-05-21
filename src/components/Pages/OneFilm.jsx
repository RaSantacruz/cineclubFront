import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import YouTubeEmbed from "../UI/YouTubeEmbedded";
import LogosBox from "../UI/LogosBox";
import PostsList from "../Posts/PostsList";
export default function OneFilm() {
  const { id } = useParams();
  const api_url = import.meta.env.VITE_API_URL;
  const [filmData, setFilmData] = useState(null);

  useEffect(() => {
    async function getFilm(id) {
      const url = `${api_url}/films/get/${id}`;
      const response = await fetch(url);
      let data = await response.json();
      setFilmData(data);
    }
    getFilm(id);
  }, [id]);

  return (
    <>
      {/* Dégradé noir de bas de page avec titre et synopsis*/}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 3,
          color: "primary.contrastText",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 20%, transparent 40%)",
          height: "15vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "start",
        }}
      >
        <Typography variant="h2">{filmData?.name}</Typography>
        <Typography variant="body1" sx={{ ml: 2, width: "50vw" }}>
          {filmData?.synopsis}
        </Typography>
      </Box>
      {/*  Video avec liens externes */}
      <Box
        sx={{
          position: "relative",
          height: "76vh",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LogosBox
          sx={{ color: "white" }}
          url_allocine={filmData?.url_allocine}
          url_imdb={filmData?.url_imdb}
          url_youtube={filmData?.url_youtube}
        />
        <YouTubeEmbed url={filmData?.url_youtube} />

        <Box />
      </Box>
      {/* Commentaires */}
      <Box sx={{ mt: "10rem" }}>
        <Typography variant="h2" sx={{ mb: 2, textAlign: "center", fontFamily:'UndevelopedBook'}}>Commentaires</Typography>
        <PostsList filmId={id} />
      </Box>
    </>
  );
}
