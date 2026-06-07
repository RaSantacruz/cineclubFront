import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import getAllFilms from "../../helpers/getAllFims";
import FilmVignette from "./FilmVignette";
import { Box, Grid } from "@mui/material";

export default function EditFilms() {
  const { user } = useAuth();
  const [filmsData, setFilmsData] = useState([]);
  
  useEffect(() => {
    async function updateData() {
      const data = await getAllFilms();      
      setFilmsData(data);
    }
    updateData();
  }, []);
  // if(!user || user?.role !== "ADMIN") return <p>Vous devez vous connecter en tant qu'admin pour acceder à cette page</p>;
  return (
    <>
      <Box>
        <Grid
          container
          spacing={2}
          sx={{ minHeight: "90vh", backgroundColor: "black", color: "white" }}
        >
          {filmsData.map((film) => (
            <Grid
              container
              spacing={2}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={film.id}
            >
              <FilmVignette filmData={film} setFilmsData={setFilmsData}/>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
