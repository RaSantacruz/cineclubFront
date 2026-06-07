import { useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Edit as EditIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import YouTubeEmbed from "../UI/YouTubeEmbedded";
import LogosBox from "../UI/LogosBox";
import SubscriptionBox from "../Subscription/SubscriptionBox";
import PostsList from "../Posts/PostsList";
import RatingsBox from "../Ratings/RatingsBox";
import getFilm from "../../helpers/getFilm";
import useAuth from "../../hooks/useAuth";

export default function OneFilm() {
  const { filmId } = useParams();
  const api_url = import.meta.env.VITE_API_URL;
  const [filmData, setFilmData] = useState(null);
  const { user } = useAuth();
  // gestion de la date de projection
  let projectionDate;
  if (filmData?.status === "programmed") {
    projectionDate = new Date(filmData.projection_date).toLocaleDateString(
      "fr-FR",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      },
    );
  }

  useEffect(() => {
    async function getAndrefreshFilms() {
      const data = await getFilm(filmId);      
      setFilmData(data);      
    }
    getAndrefreshFilms();
  }, [filmId]);

  useEffect(() => {console.log(projectionDate)}, [filmData]);

  return (
    <>
      {/* Titre  et synopsis*/}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          p: 3,
          color: "primary.contrastText",
          height: "15vh",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h4">{filmData?.name}</Typography>
        <Typography variant="body1" sx={{ ml: 2,  width: "50vw", height: "10vh", color: "secondary.dark"}}>
          {filmData?.synopsis}
        </Typography>
      </Box>

      {/*  Bloc qui contient:  Video, liens externes, votes, inscription */}
      <Box
        sx={{
          position: "relative",
          height: "76vh",
          width: "100vw",
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

        {/* Conteneur pour l'affichage vertical de la date de projection, de l'inscription et des votes */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1rem",
            ml: 3,
          }}
        >
          {user && user?.role === "ADMIN" && (
            <Typography sx={{ color: "primary.light", p: 2 }} variant="Body1">
              <IconButton>
                <Link to={`/admin/editOneFilm/${filmId}`}>
                  <EditIcon sx={{ color: "primary.dark" }} />
                </Link>
              </IconButton>
              Editer
            </Typography>
          )}
          {filmData?.status === "programmed" && (
            <Typography sx={{ color: "primary.light", p: 2 }} variant="h6">
              {projectionDate} 
            </Typography>
          )}

          <SubscriptionBox filmId={filmId} />
          <RatingsBox
            filmId={filmId}
            nbRatings={filmData?.nb_ratings}
            averageScore={filmData?.average_score}
            getFilm={getFilm}
          />
        </Box>

        <Box />
      </Box>

      {/* Commentaires */}
      <Box sx={{ mt: "10rem" }}>
        <Typography
          variant="h2"
          sx={{ mb: 2, textAlign: "center", fontFamily: "UndevelopedBook", color:"secondary.main" }}
        >
          Commentaires
        </Typography>
        <PostsList filmId={filmId} />
      </Box>
    </>
  );
}
