import { TextField, Button, Stack } from "@mui/material";
import { useState } from "react";



export default function ReplyForm({ filmId, postId, getAndRenderData, setNested}) {
  const [value, setValue] = useState("");
  const url = import.meta.env.VITE_API_URL + "/posts/protected/create";
  
  
  async function postReply() {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        content: value,
        film_id: filmId,
        answersTo: postId,
      }),
    });
    setValue('');
    getAndRenderData();
    setNested(false);
  }

  

  return (
    <Stack spacing={1}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Écrire une réponse..."
        variant="outlined"
        size="small"
        fullWidth
        multiline
        minRows={2}
      />

      <Button
        variant="contained"
        size="small"
        type="button"
        onClick={postReply}
        disabled={!value.trim()}
      >
        Envoyer
      </Button>
    </Stack>
  );
}
