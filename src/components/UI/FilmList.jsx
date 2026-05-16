import {  Grid } from "@mui/material";
import FilmSmall from "../UI/FilmSmall";

export default function FilmList({filmsData}) {
    return (
        <Grid container spacing={2} sx={{width:"100vw" }} >
          {filmsData.map((film, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index} >
              <FilmSmall filmData={film} />
            </Grid>
          ))}
        </Grid>
      );
}