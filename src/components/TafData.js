import React, { useState, useEffect } from "react";

function TafData() {
  const [tafData, setTafData] = useState("Loading TAF data...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const formatTafData = (rawTaf) => {
    // Replace the specific keywords with the same keywords preceded by a newline
    return rawTaf
      .replace(/ BECMG /g, "\nBECMG ")
      .replace(/ TEMPO /g, "\nTEMPO ")
      .replace(/ INTER /g, "\nINTER ");
  };

  const fetchTafData = async () => {
    try {
      setLoading(true);
      const proxyUrl = "https://api.allorigins.win/get?url=";
      const targetUrl = encodeURIComponent(
        "https://aviationweather.gov/api/data/taf?ids=VHHH&hours=0&format=json"
      );
      const response = await fetch(proxyUrl + targetUrl);
      const result = await response.json();
      const data = JSON.parse(result.contents);

      if (data && data.length > 0 && data[0].rawTAF) {
        setTafData(formatTafData(data[0].rawTAF));
      } else {
        setTafData("No TAF data available");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching TAF data:", error);
      setTafData("Error loading TAF data");
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTafData();

    // Update TAF data every 30 minutes
    const interval = setInterval(fetchTafData, 1800000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="row">
      <div className="row-title">VHHH TAF</div>
      <div className="data-row">
        {loading ? (
          <span className="loading">Loading TAF data...</span>
        ) : error ? (
          <span>Error loading TAF data</span>
        ) : (
          <pre>{tafData}</pre>
        )}
      </div>
    </div>
  );
}

export default TafData;
