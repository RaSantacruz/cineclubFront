import { useEffect, useState, useRef } from "react";
import { Box, Typography, Popover } from "@mui/material";
import LikeButton from "../Likes/LikeButton";
import LikesList from "../Likes/LikesList";

export default function LikeBox({ postId}) {
  const boxRef = useRef(null);
  const [likes, setLikes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const nbLikes = likes.length;
  // ancrage du popover
  const [anchorEl, setAnchorEl] = useState(null);

  async function getLikes() {
    const url = `${import.meta.env.VITE_API_URL}/likes/getlikesByPostId/${postId}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setLikes(data);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loaded) {
        getLikes();
        setLoaded(true);
        observer.disconnect();
      }
    },[postId]);

    observer.observe(boxRef.current);

    return () => observer.disconnect();
  });
  return (
    <Box
      sx={{
        width: "10%",
        alignSelf: "flex-end",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid lightgray",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
      onMouseLeave={() => setAnchorEl(null)}
      ref={boxRef}
    >
      <LikeButton postId={postId} likes={likes} setLikes={setLikes}/>
      {nbLikes > 0 && (
        <>
          <Typography>{nbLikes}</Typography>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            slotProps={{
              paper: {
                sx: { width: "6rem" },
              },
            }}
            sx={{ pointerEvents: "none" }}
          >
            <LikesList likes={likes} />
          </Popover>
        </>
      )}
    </Box>
  );
}
