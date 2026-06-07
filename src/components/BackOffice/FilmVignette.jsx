import {Card, CardMedia, CardContent, Typography, CardActions, Button} from '@mui/material';
import EditToolBar from "./EditToolBar";
import EditOneFilm from "./EditOneFilm";
import {Link} from "react-router-dom";

export default function FilmVignette({ filmData, setFilmsData }) {
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
  return (
    <Link to ={`/film/${filmData.id}`}>
    <Card
    sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "1rem",
        width: "25rem",
        height: "30rem",       
        p:2
      }}>
      <EditToolBar filmId={filmData.id} setFilmsData={setFilmsData}/>
      {filmData.status === "programmed" ? (
        <Typography variant="h6" color="secondary">Le {projectionDate}</Typography>
      ):<Typography variant="h6" color="secondary">Film en compétition</Typography>}
      <Typography variant="h6">{filmData.name}</Typography>

      <CardMedia
        component="img"
        image={api_url + filmData.url_image}
        alt="Poster du film"
        sx={{ width: "100%", height: "20rem", objectFit: "contain" }}
      />
      
    </Card>
    </Link>
  );
}
