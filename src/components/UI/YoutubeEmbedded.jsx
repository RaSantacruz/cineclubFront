

export default function YouTubeEmbed({ url }) {
  

  if (!url) return null;

  const videoId = new URL(url).searchParams.get("v");

  if (!videoId) return <p>URL invalide</p>;

  return (
    <div style={{ position: "relative", width: "50%", height: "100%" }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        allow="autoplay"
        allowFullScreen
        style={{ width: "100%", height: "100%", border: 0 }}
      />     
    </div>
  );
}