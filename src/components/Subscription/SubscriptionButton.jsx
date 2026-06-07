import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import useAuth from "../../hooks/useAuth";

export default function SubscriptionButton({
  filmId,
  setIsHovered,
  isSubscribed,
  setIsSubscribed,
  refreshList,
}) {
  // console.log(isSubscribed);
  const urlCreate = `${import.meta.env.VITE_API_URL}/registrations/protected/create/${filmId}`;
  const urlDelete = `${import.meta.env.VITE_API_URL}/registrations/protected/delete/${filmId}`;
  const { user } = useAuth();

  async function sendSubscription() {
    const response = await fetch(urlCreate, {
      method: "POST",
      credentials: "include", 
    });
    console.log(response.status);
  }

  async function deleteSubscription() {
    const response = await fetch(urlDelete, {
      method: "POST",
      credentials: "include", 
    });
    console.log(response.status);
  }

  async function handleClick() {
    if (user) {
      if (!isSubscribed) {
        await sendSubscription();
      } else {
        await deleteSubscription();
      }
      refreshList();
    } else {
      alert("Veuillez vous connecter pour vous inscrire");
    }
  }

  return (
    <>
      <Button
        variant="contained"
        sx={{
          bgcolor: isSubscribed ? "secondary.main" : "primary.main.light",
          color: isSubscribed ?"secondary.contrastText":"primary.contrastText",
          fontFamily: "Cinzel",
          fontWeight: 700,
        }}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isSubscribed ? "Se désinscrire" : "S'inscrire"}
      </Button>
    </>
  );
}
