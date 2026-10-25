"use client";

import { useEffect, useState } from "react";

const fmt = () =>
  new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
    .format(new Date())
    .toLowerCase();

// Live time in Cairo. Rendered empty on the server and filled in after mount,
// so the static HTML never disagrees with the visitor's clock.
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="clock" aria-label={time ? `Local time in Cairo: ${time}` : "Local time in Cairo"}>
      Cairo {time ?? "--:--:--"}
    </span>
  );
}
