import { useEffect, useState, useCallback } from "react";
import useAuth from "../../hooks/useAuth";
import SubscriptionButton from "./SubscriptionButton.jsx";
import SubscribersList from "./SubscribersList.jsx";
import { Box, Typography } from "@mui/material";

export default function SubscriptionBox({ filmId }) {
  const { user } = useAuth();
  const [adminMode, setAdminMode] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [subscribers, setSubscribers] = useState([]);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const url = `${import.meta.env.VITE_API_URL}/registrations/getRegistrationsByFilmId/${filmId}`;

  // détection du mode admin
  useEffect(() => {
    if (user?.role === "ADMIN") {
      setAdminMode(true);
    } else {
      setAdminMode(false);
    }
    
  }, [user]);
  
  const refReshList = async () => {    
    const response = await fetch(url);
    const data = await response.json();
    setSubscribers(data);
    if (user) {
      const subscribersPseudos = data?.map((s) => s.pseudo);      
      setIsSubscribed(subscribersPseudos.includes(user?.pseudo.toLowerCase()));
    }
    // modifier l'affichage du bouton à la déconnexion
    if (!user) {
      setIsSubscribed(false);
    }
  };

  // chargement au montage et à la connexion
  useEffect(() => {
    refReshList();
  }, [user]);
  return (
    <Box      
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
        backgroundColor: "primary.main.dark",
        opacity: 0.8,
        transition: "opacity 0.3s ease-in-out",
        "&:hover": {
          opacity: 1,
        },
        position: "relative",
        ml: "2rem",
        
      }}
    >
        {isSubscribed && (
          <Typography variant="Body1">Vous êtes inscrit à cette séance</Typography>
        )}
      <SubscriptionButton
        filmId={filmId}
        isSubscribed={isSubscribed}
        setIsSubscribed={setIsSubscribed}
        refreshList={refReshList}
        setIsHovered={setIsHovered}
      />
      {subscribers && (
        <SubscribersList subscribers={subscribers} isHovered={isHovered} adminMode={adminMode}/>
      )}
    </Box>
  );
}
