import { useState } from "react";
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

// === Correction structure composant AddFilm pour MUI DatePicker ===

/*
La gestion du champ date de programmation (projection_date) doit utiliser le composant <DatePicker />
On adapte donc : 
- On ajoute dans le state 'form' que projection_date contient potentiellement un objet Date, pas juste string
- Dans le formulaire, pour le champ "projection_date", on utilise <LocalizationProvider> et <DatePicker>, 
  et on assure la compatibilité value/onChange avec le state
*/

export default function AddFilm() {
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    status: "",
    projection_date: "",
    cinema: "",
    synopsis: "",
    author: "",
    film_genre: "",
    url_allocine: "",
    url_imdb: "",
    url_youtube: "",
  });
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [loading, setLoading] = useState(false);

  const requiredFields = ["name", "status"];

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
    if (!image) tempErrors.image = "L'image est requise.";

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
    formData.append("image", image);

    if (form.status === "programmed") {
      formData.append("projection_date", form.projection_date);
      formData.append("cinema", form.cinema);
    }
    if (form.synopsis) formData.append("synopsis", form.synopsis);
    if (form.author) formData.append("author", form.author);
    if (form.film_genre) formData.append("film_genre", form.film_genre);
    if (form.url_allocine) formData.append("url_allocine", form.url_allocine);
    if (form.url_imdb) formData.append("url_imdb", form.url_imdb);
    if (form.url_youtube) formData.append("url_youtube", form.url_youtube);

    try {
      const url = `${import.meta.env.VITE_API_URL}/films/protected/create`;
      const res = await fetch(url, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();

      if (res.status === 201) {
        setSuccessMsg(data.message || "Film ajouté avec succès !");
        setForm({
          name: "",
          status: "",
          projection_date: "",
          cinema: "",
          synopsis: "",
          author: "",
          film_genre: "",
          url_allocine: "",
          url_imdb: "",
          url_youtube: "",
        });
        setImage(null);
        setErrors({});
      } else {
        setFetchError(data?.message || `Erreur: ${res.status}`);
      }
    } catch (err) {
      console.error(err);
      setFetchError("Erreur du serveur. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  // if(!user || user?.role !== "ADMIN") return <p>Vous devez vous connecter en tant qu'admin pour acceder à cette page</p>;

  return (
    <Box sx={{ p: 3, maxWidth: 1000, mx: "auto", mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Ajouter un film
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
              value={form.status}
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

          <Box mt={2}>
            <Button
              variant="contained"
              component="label"
              color={image ? "success" : "primary"}
            >
              {image ? "Image sélectionnée" : "Ajouter une image *"}
              <input
                type="file"
                accept="image/*"
                hidden
                required
                onChange={handleImageChange}
              />
            </Button>
            {errors.image && (
              <Typography color="error">{errors.image}</Typography>
            )}
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
              {loading ? "Envoi..." : "Ajouter"}
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
