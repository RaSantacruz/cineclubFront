import { Typography, Card, CardMedia, Box} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function FilmSmall({ filmData }) {
  const api_url = import.meta.env.VITE_API_URL;
  // gestion de la date de projection
  let projectionDate;
  if (filmData.status === "programmed") {
    projectionDate = new Date(filmData.projection_date).toLocaleDateString(
      "fr-FR",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      },
    );
  }

  // version raccourcie du synopis
  const synopsisShort =
    filmData.synopsis.substring(0, 80).split(" ").slice(0, -1).join(" ") +
    "...";

  // gestion de la redirection
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/film/${filmData.id}`);
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
        p:2
      }}
      onClick={handleClick}
    >
      {filmData.status === "programmed" && (
        <Typography variant="h6" color="secondary">Le {projectionDate}</Typography>
      )}
      <Typography variant="h4">{filmData.name}</Typography>

      <CardMedia
        component="img"
        image={api_url + filmData.url_image}
        alt="Poster du film"
        sx={{ width: "100%", height: "20rem", objectFit: "contain" }}
      />
      <Box sx={{ display: "flex", gap: 1, alignItems: "baseline" }}>
        <Typography variant="body1">par</Typography>
        <Typography variant="h6">{filmData.author}</Typography>
      </Box>
      <Typography variant="body1">
        <strong>Synopsis:</strong>
        {synopsisShort}
      </Typography>
    </Card>
  );
}
