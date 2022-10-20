export const toMMSS = (secs: number): string => {
  const hours = Math.floor(secs / 3600);
  const minutes = Math.floor(secs / 60) % 60;
  const seconds = secs % 60;

  const time = [hours, minutes, seconds]
    .map((v) => (v < 10 ? "0" + v : v))
    .join(":");

  if (time.substring(0, 2) === "00")
    return [minutes, seconds].map((v) => (v < 10 ? "0" + v : v)).join(":");
  else
    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .join(":");
};
