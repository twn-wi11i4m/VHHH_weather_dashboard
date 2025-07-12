import React, { useState, useEffect } from "react";

function AtisData() {
  const [arrivalAtis, setArrivalAtis] = useState("Loading arrival ATIS...");
  const [departureAtis, setDepartureAtis] = useState(
    "Loading departure ATIS..."
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /**
   * Fetches ATIS information from Hong Kong CAD using a CORS proxy
   * @returns {Promise<Object>} Object containing arrival and departure information
   */
  const getHongKongATISWithProxy = async (
    proxyUrl = "https://api.allorigins.win/get?url="
  ) => {
    const targetUrl = "https://atis.cad.gov.hk/ATIS/ATISweb/atis.php";
    const url = proxyUrl + encodeURIComponent(targetUrl);

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      const html = result.contents;

      // Parse the HTML to extract ATIS information
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      // Extract arrival information by div class
      const arrivalDiv = doc.querySelector(".data_name_arr");
      let arrivalInfo = null;
      if (arrivalDiv) {
        // Replace <br> tags with newlines and trim
        arrivalInfo = arrivalDiv.innerHTML
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/&nbsp;/g, " ")
          .trim();
      }

      // Extract departure information by div class
      const departureDiv = doc.querySelector(".data_name_dep");
      let departureInfo = null;
      if (departureDiv) {
        departureInfo = departureDiv.innerHTML
          .replace(/<br\s*\/?>/gi, "\n")
          .replace(/&nbsp;/g, " ")
          .trim();
      }

      return {
        success: true,
        timestamp: new Date().toISOString(),
        arrival: arrivalInfo,
        departure: departureInfo,
      };
    } catch (error) {
      console.error("Error fetching ATIS information:", error);
      return {
        success: false,
        error: error.message,
        timestamp: new Date().toISOString(),
        arrival: null,
        departure: null,
      };
    }
  };

  const fetchAtisData = async () => {
    try {
      setLoading(true);
      const data = await getHongKongATISWithProxy();

      if (data.success) {
        setArrivalAtis(data.arrival || "No arrival ATIS available");
        setDepartureAtis(data.departure || "No departure ATIS available");
        setError(false);
      } else {
        setArrivalAtis("Error loading ATIS data");
        setDepartureAtis("Error loading ATIS data");
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching ATIS data:", error);
      setArrivalAtis("Error loading ATIS data");
      setDepartureAtis("Error loading ATIS data");
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAtisData();

    // Update ATIS data every 30 minutes
    const interval = setInterval(fetchAtisData, 1800000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="row">
      <div className="row-title">VHHH ATIS</div>
      <div className="atis-row">
        <div className="flex-column">
          <div className="atis-title">Arrival ATIS</div>
          <div className="atis-container" id="atis-arrival">
            {loading ? (
              <span className="loading">Loading arrival ATIS...</span>
            ) : error ? (
              <span>Error loading ATIS data</span>
            ) : (
              <pre>{arrivalAtis}</pre>
            )}
          </div>
        </div>
        <div className="flex-column">
          <div className="atis-title">Departure ATIS</div>
          <div className="atis-container" id="atis-departure">
            {loading ? (
              <span className="loading">Loading departure ATIS...</span>
            ) : error ? (
              <span>Error loading ATIS data</span>
            ) : (
              <pre>{departureAtis}</pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AtisData;
