import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Link,
} from "@mui/material";
import ReplyForm from "./ReplyForm";
export default function Post({
  content,
  childrenPosts,
  author,
  date,
  level,
  filmId,
  postId
}) {
  // gestion du caractère développé ou non
  const [nested, setNested] = useState(true);
  // gestion de la réponse au post
  const [answering, setAnswering] = useState(false);
  // contenu raccourci du post
  const contentShort =
    content.substring(0, 80).split(" ").slice(0, -1).join(" ") + "...";
  // date de création du post formatée
  const formatedDate = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <Card
        variant="elevation"
        sx={{
          mb: 2,
          width: "80vw",
          backgroundColor: "#f5f5f5",
          ml: `${level * 5}rem`,
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption" color="text.secondary">
            Posté par {author} le {formatedDate}
          </Typography>

          <Typography variant="body1">
            {nested ? contentShort : content}
          </Typography>

          {level < 3 && (
            <Button
              color="secondary"
              variant="outlined"
              sx={{ alignSelf: "flex-end", mt: 1, fontSize: "0.7rem" }}
              onClick={() => setAnswering(!answering)}
            >
              Répondre
            </Button>
          )}

          {answering && <ReplyForm filmId={filmId} postId={postId}/>}
          <Link
            component="button"
            variant="body2"
            onClick={() => setNested(!nested)}
            underline="hover"
          >
            {nested ? <Typography variant="body2" color="secondary">voir plus</Typography> : <Typography variant="body2" color="secondary">voir moins</Typography>}
          </Link>
        </CardContent>
      </Card>
      {!nested && childrenPosts?.length > 0 && <Typography variant="h6" >REPONSES</Typography>}
      
      {!nested &&   
      
        childrenPosts?.map((post, index) => (
          <Post
            content={post.content}
            childrenPosts={post.children}
            author={post.author}
            date={post.created_at}
            level={level + 1}
            key={index}
          />
        ))}
      
    </>
  );
}
