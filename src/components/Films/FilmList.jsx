import { Grid, Box } from "@mui/material";
import FilmSmall from "./FilmSmall";

export default function FilmList({ filmsData }) {
  return (
    
      <Grid
        container        
        sx={{ minHeight: "90vh", backgroundColor: "black", m:0, p:0 }}
      >
        {filmsData.map((film) => (
          <Grid
            container
            spacing={2}
            size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
            lg={3}
            key={film.id}
          >
            <FilmSmall filmData={film} />
          </Grid>
        ))}
      </Grid>
    
  );
}
