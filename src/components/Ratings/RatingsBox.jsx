import { Rating, Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function RatingsBox({
  nbRatings,
  filmId,
  averageScore,
  getFilm,
}) {
  // un initialRate est utilisé pour éviter de déclencher le mauvais useEffect au montage
  const [initialRate, setInitialRate] = useState(0);
  // rate sert à stocker les nouveaux votes uniquement suite à un clic sur le composant
  const [rate, setRate] = useState(0);
  const [refreshedNbRatings, setRefreshedNbRatings] = useState(nbRatings);
  const [refreshedAverageScore, setRefreshedAverageScore] =
    useState(averageScore);
  const url = import.meta.env.VITE_API_URL + "/scores/protected/create";
  const { user } = useAuth();
  // obtenir la note déjà existante de l'utilisateur
  // vaut null si l'utilisteur n'a jamais noté auparavant
  async function getScore() {
    const url = `${import.meta.env.VITE_API_URL}/scores/protected/getUserScoreForFilm`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ filmId: filmId }),
    });
    let data = await response.json();
    console.log(data);
    return data.score;
  }
  // au montage, obtenir la note de l'utilisaateur si on est connecté
  // actualiser en cas de déconnexion également
  useEffect(() => {
    async function getScoreAndRefresh() {
      const score = await getScore();
      if (score !== null) setInitialRate(score);
    }
    if (user) {
      getScoreAndRefresh();
    } else {
      // réinitialisation de la note affichée en cas de déconnexion
      setInitialRate(0);
      setRate(0);
    }
  }, [user]);
  async function postRating() {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ filmId: filmId, score: rate }),
    });
  }
  useEffect(() => {
    // éviter de déclencher l'effet au montage en absence de nouveau vote ou en cas de remise à 0
    if (rate === 0) return;
    // envoi de la nouvelle note, mise à jour de données: nombre de votes et note moyenne
    const submitAndRefresh = async () => {
      try {
        await postRating();
        // actualiser les data du film
        const data = await getFilm(filmId);
        // rafraîchir le nombre de votes
        setRefreshedNbRatings(data.nb_ratings);
        // rafraîchir la note moyenne
        setRefreshedAverageScore(data.average_score);
      } catch (err) {
        setRate(0); // on réinitialise la note affichée       
        alert("Une erreur est survenue, votre note n'a pas été enregistrée.");
      }
    };
    submitAndRefresh();
  }, [rate]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        color: "white",
        flexDirection: "column",
        height: "30vh",
        ml: "2rem",
        justifyContent: "space-around",
      }}
    >
      <Typography>Votre note:</Typography>
      <Rating
        sx={{
          "& .MuiRating-iconEmpty": {
            color: "white",
          },
        }}
        value={rate || initialRate}
        size="large"
        precision={1}
        onChange={(event, newRate) => {
          setRate(newRate);
        }}
      />
      <Typography>
        Note moyenne: {refreshedAverageScore ?? averageScore}/5
      </Typography>
      <Typography>
        Nombre de notes: {refreshedNbRatings ?? nbRatings}
      </Typography>
    </Box>
  );
}
