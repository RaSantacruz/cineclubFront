import { Typography, Card, CardMedia } from "@mui/material";

export default function FilmSmall({ filmData }) {
  const api_url = import.meta.env.VITE_API_URL;
  let projectionDate;
  if (filmData.status === "programmed") {
    projectionDate = new Date(
      filmData.projection_date,
    ).toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1rem",
        width: "25rem",
        height: "40rem",
      }}
    >
      {filmData.status === "programmed" && <Typography variant="h6">Le {projectionDate}</Typography>}
      <Typography variant="h4">{filmData.name}</Typography>

      <CardMedia
        component="img"
        height="500vh"
        image={api_url + filmData.url_image}
        alt="Poster du film"
        sx={{ objectFit: "contain" }}
      />
      <Typography variant="p">par</Typography>
      <Typography variant="h4">{filmData.author}</Typography>
    </Card>
  );
}
