import React, { useState, useEffect } from 'react';

function WeatherRadar() {
  const [timestamp, setTimestamp] = useState(Date.now());

  // Update radar images every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now());
    }, 600000);
    
    return () => clearInterval(interval);
  }, []);

  const radar256Url = `http://pda.weather.gov.hk/radar/rad_256_320/rad256_6.jpg`;
  const radar128Url = `http://pda.weather.gov.hk/radar/rad_128_320/rad128_6.jpg`;
  const radar64Url = `http://pda.weather.gov.hk/radar/rad_064_320/rad064_6.jpg`;

  return (
    <div className="row">
      <div className="row-title">VHHH Weather Radar</div>
      <div className="image-row">
        <div className="image-container">
          <div className="image-title">256 km radar</div>
          <a href={radar256Url} target="_blank" rel="noopener noreferrer">
            <img src={radar256Url} alt="256 km radar" />
          </a>
        </div>
        <div className="image-container">
          <div className="image-title">128 km radar</div>
          <a href={radar128Url} target="_blank" rel="noopener noreferrer">
            <img src={radar128Url} alt="128 km radar" />
          </a>
        </div>
        <div className="image-container">
          <div className="image-title">64 km radar</div>
          <a href={radar64Url} target="_blank" rel="noopener noreferrer">
            <img src={radar64Url} alt="64 km radar" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default WeatherRadar;
