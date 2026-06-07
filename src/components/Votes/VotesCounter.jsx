import { LocalMovies } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

export default function VotesCounter({ nbVotes }) {
  const iconSize = 28;
  const gap = 4;
  const totalHeight = nbVotes * iconSize + (nbVotes - 1) * gap;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0.5,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, mt: 1, color: "secondary.main" }}
      >
        {nbVotes} {nbVotes > 1 ? "Votes" : "Vote"}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          gap: 1,
        }}
      >
        {/* Axe SVG */}
        {nbVotes > 0 && (
          <svg width="12" height={totalHeight + 16}>
            <defs>
              <marker
                id="arrowUp"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path
                  d="M2 2L8 5L2 8"
                  fill="none"
                  stroke="#9e9e9e"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </marker>
            </defs>
            <line
              x1="6"
              y1={totalHeight + 14}
              x2="6"
              y2="4"
              stroke="#9e9e9e"
              strokeWidth="1.5"
              markerEnd="url(#arrowUp)"
            />
          </svg>
        )}

        {/* Icônes */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            alignItems: "center",
            gap: `${gap}px`,
          }}
        >
          {[...Array(nbVotes)].map((_, i) => (
            <LocalMovies
              key={i}
              sx={{ fontSize: iconSize, color: "secondary.main" }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
