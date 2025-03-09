import React, { useState, useEffect } from "react";

function MetarData() {
  const [metarData, setMetarData] = useState("Loading METAR data...");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMetarData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://aviationweather.gov/api/data/metar?ids=VHHH&hours=0&format=json"
      );
      const data = await response.json();

      if (data && data.length > 0 && data[0].rawOb) {
        setMetarData(data[0].rawOb);
      } else {
        setMetarData("No METAR data available");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching METAR data:", error);
      setMetarData("Error loading METAR data");
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetarData();

    // Update METAR data every 30 minutes
    const interval = setInterval(fetchMetarData, 1800000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="row">
      <div className="row-title">VHHH METAR</div>
      <div className="data-row">
        {loading ? (
          <span className="loading">Loading METAR data...</span>
        ) : error ? (
          <span>Error loading METAR data</span>
        ) : (
          <pre>{metarData}</pre>
        )}
      </div>
    </div>
  );
}

export default MetarData;
