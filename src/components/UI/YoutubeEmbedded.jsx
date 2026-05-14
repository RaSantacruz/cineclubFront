export default function YouTubeEmbed({ url }) {
    const videoId = new URL(url).searchParams.get("v");
  
    if (!videoId) return <p>Lien YouTube invalide</p>;
  
    return (
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  