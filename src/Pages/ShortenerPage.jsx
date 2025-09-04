import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import logger from "../utils/logger";

export default function ShortenerPage() {
  const [longUrl, setLongUrl] = useState("");
  const [expiry, setExpiry] = useState("");
  const [customCode, setCustomCode] = useState("");
  const [shortenedUrls, setShortenedUrls] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls")) || [];
    setShortenedUrls(stored);
    logger.info("Loaded stored URLs", stored);
  }, []);

  const handleSubmit = () => {
    if (!longUrl.startsWith("http")) {
      logger.warn("Invalid URL entered", longUrl);
      alert("Please enter a valid URL (must start with http or https).");
      return;
    }

    const code =
      customCode.trim() !== ""
        ? customCode.trim()
        : Math.random().toString(36).substring(2, 8);

    if (shortenedUrls.some((url) => url.shortCode === code)) {
      logger.warn("Short code already exists", code);
      alert("Short code already exists. Please choose another.");
      return;
    }

    const expiryNum = Number(expiry);
    const expireAt =
      expiry && !isNaN(expiryNum)
        ? Date.now() + expiryNum * 60000
        : Date.now() + 30 * 60000;

    const newEntry = { longUrl, shortCode: code, expireAt };

    const updatedUrls = [...shortenedUrls, newEntry];
    setShortenedUrls(updatedUrls);
    localStorage.setItem("urls", JSON.stringify(updatedUrls));

    logger.info("New URL shortened", newEntry);

    setLongUrl("");
    setExpiry("");
    setCustomCode("");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      <TextField
        label="Enter Long URL"
        fullWidth
        margin="normal"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
      />

      <TextField
        label="Expiry (minutes, optional)"
        type="number"
        fullWidth
        margin="normal"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />

      <TextField
        label="Custom Short Code (optional)"
        fullWidth
        margin="normal"
        value={customCode}
        onChange={(e) => setCustomCode(e.target.value)}
      />

      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSubmit}>
        Shorten URL
      </Button>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Generated URLs:</Typography>
        {shortenedUrls.map((url, index) => (
          <Typography key={index}>
            {url.longUrl} → http://localhost:5173/{url.shortCode}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
