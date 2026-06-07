import { Toolbar, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";

export default function EditToolBar({filmId, setFilmsData}) {
  const url = `${import.meta.env.VITE_API_URL}/films/protected/delete/${filmId}`;
  console.log("URL delete:", url);
  async function deleteFilm() {
    
    const response = await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
    setFilmsData((prevFilms) => prevFilms.filter((film) => film.id !== filmId));
  }
  return (
    <Toolbar
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        bgcolor: "white",
        width: "100%",
      }}
    >
      <IconButton>
        <Link
          to={`/admin/editOneFilm/${filmId}`}
          style={{ color: "inherit" }}
        >
          <EditIcon />
        </Link>
      </IconButton>
      <IconButton>
        <DeleteIcon onClick={deleteFilm}/>
      </IconButton>
    </Toolbar>
  );
}
