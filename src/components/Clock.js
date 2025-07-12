import React, { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  // Format function: Sat, 12 Jul 2025 15:47:00 UTC
  function formatDate(date, tz = "UTC") {
    const options = {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    };
    // Get formatted parts
    const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(date);
    const map = {};
    parts.forEach((p) => (map[p.type] = p.value));

    return `${map.weekday}, ${map.day} ${map.month} ${map.year} ${map.hour}:${map.minute}:${map.second}`;
  }

  return (
    <div
      className="row"
      style={{
        display: "flex",
        justifyContent: "space-between",
        textAlign: "center",
      }}
    >
      <div style={{ flex: 1, paddingRight: "1rem" }}>
        <p>Current UTC Time: {formatDate(time, "UTC")}</p>
      </div>
      <div style={{ flex: 1, paddingLeft: "1rem" }}>
        <p>Current HKT Time: {formatDate(time, "Asia/Hong_Kong")}</p>
      </div>
    </div>
  );
}

export default Clock;
