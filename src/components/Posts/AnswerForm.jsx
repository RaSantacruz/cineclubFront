import { TextField, Button, Stack } from "@mui/material";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function AnswerForm({ filmId, getAndRenderData }) {
  const [value, setValue] = useState("");
  const url = import.meta.env.VITE_API_URL + "/posts/protected/create";
  const { user } = useAuth();

  async function postAnswer() {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        content: value,
        film_id: filmId,
      }),
    });
    setValue("");
    getAndRenderData();
  }

  function handlePost() {
    if (user) {
      postAnswer();
    } else {
      alert("Veuillez vous connecter pour poster un commentaire");
    }
  }

  return (
    <Stack spacing={1} sx={{ width: "80%", minHeight:'10rem'}}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Écrire votre commentaire..."
        variant="filled"
        size="medium"
        multiline
        minRows={2}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // évite le saut de ligne
            handlePost();
          }
        }}
      />

      <Button
        variant="contained"
        size="small"
        type="button"
        onClick={handlePost}        
        disabled={!value.trim()}
      >
        Envoyer
      </Button>
    </Stack>
  );
}
