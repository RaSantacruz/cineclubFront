import { IconButton } from "@mui/material";
import { ThumbUp } from "@mui/icons-material";
import useAuth from "../../hooks/useAuth";

export default function LikeButton({ postId, likes, setLikes }) {
  // console.log(likes);
  const {user} = useAuth();
  
  const toggleLike = async () => {
    
    const url = `${import.meta.env.VITE_API_URL}/likes/protected/toggle/${postId}`;
    await fetch(url, {
      method: "POST",
      credentials: "include",
    });    
  };
  const handleClick = () => {
    console.log(user);
    
    if (user) {
      // toggle au niveau du back-end
      toggleLike();
      // toggle au nveau du front-end
      if (likes.some(l => l.id === user.id)) {
        setLikes(prevLikes => prevLikes.filter(l => l.id !== user.id));
      } else {
        setLikes(prevLikes => [user, ...prevLikes]);
      }
      
    } else {
      alert("Veuillez vous connecter pour liker ce post");
    }
  };
  return (
    
      <ThumbUp color="secondary" onClick={handleClick} />
    
  );
}
