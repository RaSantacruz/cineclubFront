import { useState, useEffect } from "react";
import Post from "./Post";
import { Box } from "@mui/material";
export default function PostsList({ filmId }) {
  const [posts, setPosts] = useState([]);

  const url =
    import.meta.env.VITE_API_URL + "/posts/getPostsTreeByFilmId/" + filmId;
  async function getAndRenderData() {
    const response = await fetch(url);
    const data = await response.json();
    setPosts(data);
  }
  useEffect(() => {
    getAndRenderData();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
      }}
    >
      {posts?.map((post, index) => (
        <Post
          content={post.content}
          childrenPosts={post.children}
          level={1}
          author={post.author}
          date={post.created_at}
          filmId={post.film_id}
          postId={post.id}
          getAndRenderData={getAndRenderData}
          key={index}
        />
      ))}
    </Box>
  );
}
