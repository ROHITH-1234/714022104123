import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import logger from "../utils/logger";

export default function StatsPage() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls")) || [];
    setUrls(stored);
    logger.info("StatsPage loaded URLs", stored);
  }, []);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Stats
      </Typography>

      {urls.length === 0 ? (
        <Typography>No URLs have been shortened yet.</Typography>
      ) : (
        urls.map((url, index) => (
          <Typography key={index}>
            {url.shortCode} → {url.longUrl} (expires:{" "}
            {new Date(url.expireAt).toLocaleString()})
          </Typography>
        ))
      )}
    </Box>
  );
}
