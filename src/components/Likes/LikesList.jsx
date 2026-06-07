import { useState, useEffect, Fragment } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Typography,
  Popover,
} from "@mui/material";

export default function LikesList({ likes }) {
  
  return (
    <Box
      sx={{        
        
        bgcolor: "secondary.dark",
        color: "secondary.contrastText",
        width: "10rem",        
        mt:1,        
      }}
    >
      <List>
        {likes.map((user, index) => (
          <Fragment key={user.id}>
            <ListItem>
              <Typography sx={{ fontSize: "0.6rem" }}>{user.pseudo}</Typography>
            </ListItem>
            {index < likes.length - 1 && <Divider />}
          </Fragment>
        ))}
      </List>
    </Box>
  );
}
