"use client";

import { useEffect } from "react";

// This component will automatically refresh stock data every hour
export function StockAutoRefresh() {
  useEffect(() => {
    // Function to refresh stocks
    const refreshStocks = async () => {
      try {
        const response = await fetch("/api/refresh-stocks", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          console.error("Failed to refresh stocks:", await response.text());
        } else {
          console.log("Stocks refreshed successfully");
        }
      } catch (error) {
        console.error("Error refreshing stocks:", error);
      }
    };

    // Refresh immediately on component mount
    refreshStocks();

    // Set up interval to refresh every hour (3600000 ms)
    const intervalId = setInterval(refreshStocks, 3600000);

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // This component doesn't render anything
  return null;
}
