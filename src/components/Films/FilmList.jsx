import { Grid, Box } from "@mui/material";
import FilmSmall from "./FilmSmall";

export default function FilmList({ filmsData }) {
  return (
    <Box>
      <Grid
        container
        spacing={2}
        sx={{ minHeight:"90vh",  backgroundColor: "black" }}
      >
        {filmsData.map((film, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <FilmSmall filmData={film} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
