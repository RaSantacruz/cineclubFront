import { Fragment, useState, useEffect } from "react";
import {
  List,
  ListItem,  
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";


export default function SubscribersList({ subscribers, isHovered, adminMode }) {    

  if (subscribers?.length === 0) {
    return (
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "secondary.dark", opacity: isHovered ? 1 : 0 }}>
        <ListItem>
          <ListItemText primary="Aucun abonne" />
        </ListItem>
      </List>
    );
  }
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "secondary.dark",
        color: "secondary.contrastText",
        opacity: isHovered ? 1 : 0,
        position: "absolute",
        top: "3rem",
        zIndex: 1,
        pointerEvents: "none",
        transition: "opacity 0.5s ease-in-out",
      }}
    >
      <Typography variant="h6">Déjà inscrits:</Typography>
      <List>
        {subscribers.map((subscriber, index) => (
          <Fragment key={subscriber.id}>
            <ListItem >
              <Typography sx={{ fontSize: "0.6rem" }}> 
                           
                              {/* affichage du mail pour l'admin*/}
                {adminMode ? subscriber.email : subscriber.pseudo}
              </Typography>
            </ListItem>
            {index < subscribers.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </Box>
  );
}
