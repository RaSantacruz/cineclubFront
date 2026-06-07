import { useState} from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Link,
} from "@mui/material";
import ReplyForm from "./ReplyForm";
import LikeBox from "../Likes/LikeBox";
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
  // nombre de réponses au post
  let  NbReponsesText;
  switch (childrenPosts.length) {
    case 0:
      NbReponsesText = "Pas de réponse";
      break;
    case 1:
      NbReponsesText = "1 réponse";
      break;
    default:
      NbReponsesText = `${childrenPosts.length} Réponses `;
  }
  // contenu raccourci du post
  let contentShort;  
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
          width: level === 1 ? "50rem" : "30rem",
          backgroundColor: "#fff",
          ml: `${level * 10}rem`,
        }}
      >
        <CardContent
          sx={{ display: "flex", flexDirection: "column", minHeight: "10rem" }}
        >
          {/* Date et auteur */}

          <Typography variant="caption" color="text.secondary">
            Posté par {author} le {formatedDate}
          </Typography>

          {/* Contenu */}

          <Typography variant="body1">
            {nested ? contentShort : content}
          </Typography>

          {/* Bouton répondre */}

          {level < 3 && (
            <Button
              color="secondary"
              variant="outlined"
              sx={{
                alignSelf: "flex-start",                
                fontSize: "0.7rem",
                mt: "0.5rem",
                fontFamily: "Orbitron",
              }}
              onClick={handleAnswerClick}
            >
              Répondre
            </Button>
          )}

          {/* Bouton like */}

          <LikeBox
            sx={{ alignSelf: "flex-end", mr: "3rem", position:"relative", height:"20rem", backgroundColor: "red" }}
            postId={postId}
          />

          {/* Formulaire de réponse */}

          {answering && (
            <ReplyForm
              filmId={filmId}
              postId={postId}
              getAndRenderData={getAndRenderData}
              setNested={setNested}
            />
          )}

          {/* Bouton voir plus ou voir moins */}
          <Link
            component="button"
            variant="body2"
            onClick={() => setNested(!nested)}
            underline="hover"
          >
            {nested ? (
              <Typography variant="body2" color="secondary">
                voir plus {level < 3 && `(${NbReponsesText})`}
              </Typography>
            ) : (
              <Typography variant="body2" color="secondary">
                voir moins
              </Typography>
            )}
          </Link>
        </CardContent>
      </Card>

      {/* Affichage des réponses */}
      {!nested && childrenPosts?.length > 0 && (
        <Typography variant="h6" sx={{ ml: `${(level+1) * 10}rem` }}>REPONSES</Typography>
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
