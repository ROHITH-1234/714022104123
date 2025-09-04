import { useEffect } from "react";
import { useParams } from "react-router-dom";
import logger from "../utils/logger";

export default function RedirectPage() {
  const { shortCode } = useParams();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("urls")) || [];
    const entry = stored.find((url) => url.shortCode === shortCode);

    if (!entry) {
      logger.error("Short code not found", shortCode);
      alert("Invalid or expired short code.");
      return;
    }

    if (Date.now() > entry.expireAt) {
      logger.warn("URL expired", entry);
      alert("This link has expired.");
      return;
    }

    logger.info("Redirecting to", entry.longUrl);
    window.location.href = entry.longUrl;
  }, [shortCode]);

  return <p>Redirecting...</p>;
}
