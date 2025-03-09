import React, { useState, useEffect } from "react";

function WeatherWebcam() {
  const [setTimestamp] = useState(Date.now());

  // Update webcam images every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 600000);

    return () => clearInterval(interval);
  }, []);

  const slwUrl = `https://www.hko.gov.hk/wxinfo/aws/hko_mica/slw/latest_HD_SLW.jpg`;
  const tm2Url = `https://www.hko.gov.hk/wxinfo/aws/hko_mica/tm2/latest_HD_TM2.jpg`;

  return (
    <div className="row">
      <div className="row-title">VHHH Weather Webcam</div>
      <div className="image-row">
        <div className="image-container">
          <div className="image-title">Northeast view of the airport</div>
          <a href={slwUrl} target="_blank" rel="noopener noreferrer">
            <img src={slwUrl} alt="Northeast view of the airport" />
          </a>
        </div>
        <div className="image-container">
          <div className="image-title">Southeast view of the airport</div>
          <a href={tm2Url} target="_blank" rel="noopener noreferrer">
            <img src={tm2Url} alt="Southeast view of the airport" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default WeatherWebcam;
