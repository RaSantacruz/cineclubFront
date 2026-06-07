import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import useAuth from "../../hooks/useAuth";
import getFilm from "../../helpers/getFilm";

export default function EditOneFilm() {
  const { user } = useAuth();
  const { filmId } = useParams();
  const [filmData, setFilmData] = useState(null);
  const [form, setForm] = useState(null);
  useEffect(() => {
    async function getData() {
      const data = await getFilm(filmId);
      console.log(data);
      setFilmData(data);
      setForm({
        name: data?.name || "",
        status: data?.status || "",
        projection_date: data?.projection_date
          ? data.projection_date.slice(0, 10)
          : "",
        projection_time: data?.projection_date
          ? data.projection_date.slice(11, 16)
          : "",
        cinema: data?.cinema || "",
        synopsis: data?.synopsis || "",
        author: data?.author || "",
        film_genre: data?.film_genre || "",
        url_allocine: data?.url_allocine || "",
        url_imdb: data?.url_imdb || "",
        url_youtube: data?.url_youtube || "",
      });
    }
    getData();
  }, []);

  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.name.trim()) tempErrors.name = "Le nom du film est requis.";
    if (!form.status) tempErrors.status = "Le statut est requis.";
    if (form.status === "programmed") {
      if (!form.projection_date)
        tempErrors.projection_date = "La date de projection est requise.";
      if (!form.cinema.trim())
        tempErrors.cinema = "Le nom du cinéma est requis.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMsg("");
    setFetchError("");
    if (!validate()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("status", form.status);

    if (image) formData.append("image", image); // seulement si nouvelle image

    if (form.status === "programmed") {
      formData.append(
        "projection_date",
        `${form.projection_date}T${form.projection_time}:00.000Z`,
      );
      formData.append("cinema", form.cinema);
    }
    if (form.synopsis) formData.append("synopsis", form.synopsis);
    if (form.author) formData.append("author", form.author);
    if (form.film_genre) formData.append("film_genre", form.film_genre);
    if (form.url_allocine) formData.append("url_allocine", form.url_allocine);
    if (form.url_imdb) formData.append("url_imdb", form.url_imdb);
    if (form.url_youtube) formData.append("url_youtube", form.url_youtube);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/films/protected/update/${filmData?.id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formData,
        },
      );
      const data = await res.json();

      if (res.ok) {
        setSuccessMsg(data.message || "Film modifié avec succès !");
        setErrors({});
      } else {
        setFetchError(data?.message || `Erreur: ${res.status}`);
      }
    } catch (err) {
      setFetchError("Erreur du serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // if (!user || user?.role !== "ADMIN") return <p>Vous devez vous connecter en tant qu'admin pour accéder à cette page</p>;
  if (!form) return <p>Chargement...</p>;
  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Modifier un film
        </Typography>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            label="Nom du film"
            name="name"
            required
            fullWidth
            margin="normal"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />

          <FormControl
            required
            fullWidth
            margin="normal"
            error={!!errors.status}
          >
            <InputLabel id="status-label">Statut</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              label="Statut"
              value={form?.status}
              onChange={handleChange}
            >
              <MenuItem value="programmed">Programmé</MenuItem>
              <MenuItem value="suggested">Proposé</MenuItem>
            </Select>
            {errors.status && (
              <Typography color="error">{errors.status}</Typography>
            )}
          </FormControl>

          {form.status === "programmed" && (
            <>
              <TextField
                label="Date de projection"
                name="projection_date"
                type="date"
                required
                fullWidth
                margin="normal"
                value={form.projection_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors.projection_date}
                helperText={errors.projection_date}
              />
              <TextField
                label="Heure de projection"
                name="projection_time"
                type="time"
                fullWidth
                margin="normal"
                value={form.projection_time}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="Cinéma"
                name="cinema"
                required
                fullWidth
                margin="normal"
                value={form.cinema}
                onChange={handleChange}
                error={!!errors.cinema}
                helperText={errors.cinema}
              />
            </>
          )}

          {/* Image actuelle */}
          {filmData?.image_url && !image && (
            <Box mt={2} mb={1}>
              <Typography variant="caption">Image actuelle :</Typography>
              <Box
                component="img"
                src={filmData?.image_url}
                alt={form.name}
                sx={{
                  display: "block",
                  maxHeight: 120,
                  mt: 1,
                  borderRadius: 1,
                }}
              />
            </Box>
          )}

          <Box mt={2}>
            <Button
              variant="contained"
              component="label"
              color={image ? "success" : "primary"}
            >
              {image ? "Nouvelle image sélectionnée" : "Changer l'image"}
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleImageChange}
              />
            </Button>
            {image && (
              <Typography variant="caption" sx={{ ml: 2 }}>
                {image.name}
              </Typography>
            )}
          </Box>

          <TextField
            label="Synopsis"
            name="synopsis"
            fullWidth
            margin="normal"
            value={form.synopsis}
            onChange={handleChange}
            multiline
            rows={3}
          />
          <TextField
            label="Auteur"
            name="author"
            fullWidth
            margin="normal"
            value={form.author}
            onChange={handleChange}
          />
          <TextField
            label="Genre"
            name="film_genre"
            fullWidth
            margin="normal"
            value={form.film_genre}
            onChange={handleChange}
          />
          <TextField
            label="URL Allociné"
            name="url_allocine"
            fullWidth
            margin="normal"
            value={form.url_allocine}
            onChange={handleChange}
          />
          <TextField
            label="URL IMDb"
            name="url_imdb"
            fullWidth
            margin="normal"
            value={form.url_imdb}
            onChange={handleChange}
          />
          <TextField
            label="URL Youtube"
            name="url_youtube"
            fullWidth
            margin="normal"
            value={form.url_youtube}
            onChange={handleChange}
          />

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              fullWidth
            >
              {loading ? "Envoi..." : "Modifier"}
            </Button>
          </Box>

          {successMsg && (
            <Typography color="success.main" sx={{ mt: 2 }}>
              {successMsg}
            </Typography>
          )}
          {fetchError && (
            <Typography color="error" sx={{ mt: 2 }}>
              {fetchError}
            </Typography>
          )}
        </form>
      </Paper>
    </Box>
  );
}
