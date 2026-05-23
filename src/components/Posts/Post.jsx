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
import useAuth from "../../hooks/useAuth";

export default function Post({
  content,
  childrenPosts,
  author,
  date,
  level,
  filmId,
  postId,
  getAndRenderData,
}) {
  // récupération de l'utilisateur
  const { user } = useAuth();
  // gestion du caractère développé ou non
  const [nested, setNested] = useState(true);
  // gestion de la réponse au post
  const [answering, setAnswering] = useState(false);
  let contentShort;
  // contenu raccourci du post
  if (content.substring(0, 80).split(" ").length > 1) {
    contentShort =
      content.substring(0, 80).split(" ").slice(0, -1).join(" ") + "...";
  } else {
    contentShort = content;
  }

  // date de création du post formatée
  const formatedDate = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const handleAnswerClick = () => {
    if (user === null) {
      alert("Veuillez vous connecter pour envoyer une réponse");
    } else {
      setAnswering(!answering);
    }
  };
  return (
    <>
      <Card
        variant="elevation"
        sx={{
          mb: 2,
          width: level === 1 ? "80rem" : "60rem",
          backgroundColor: "#f5f5f5",
          ml: `${level * 10}rem`,
        }}
      >
        <CardContent sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption" color="text.secondary">
            Posté par {author} le {formatedDate}
          </Typography>

          <Typography variant="body1">
            {nested ? contentShort : content}
          </Typography>

          {level < 3 &&
            (
              <Button
                color="secondary"
                variant="outlined"
                sx={{ alignSelf: "flex-end", mt: 1, fontSize: "0.7rem" }}
                onClick={handleAnswerClick}
              >
                Répondre
              </Button>
            )}

          {answering && (
            <ReplyForm
              filmId={filmId}
              postId={postId}
              getAndRenderData={getAndRenderData}
              setNested={setNested}
            />
          )}
          <Link
            component="button"
            variant="body2"
            onClick={() => setNested(!nested)}
            underline="hover"
          >
            {nested ? (
              <Typography variant="body2" color="secondary">
                voir plus
              </Typography>
            ) : (
              <Typography variant="body2" color="secondary">
                voir moins
              </Typography>
            )}
          </Link>
        </CardContent>
      </Card>
      {!nested && childrenPosts?.length > 0 && (
        <Typography variant="h6">REPONSES</Typography>
      )}

      {!nested &&
        childrenPosts?.map((post, index) => (
          <Post
            content={post.content}
            childrenPosts={post.children}
            author={post.author}
            date={post.created_at}
            level={level + 1}
            key={index}
            postId={post.id}
            filmId={filmId}
            getAndRenderData={getAndRenderData}
          />
        ))}
    </>
  );
}
