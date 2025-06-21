const formatTime = (timeString) => {
  if (!timeString) return "";

  const date = new Date(`1970-01-01T${timeString}:00`);

  if (isNaN(date.getTime())) {
    return "Invalid Time";
  }

  return date
    .toLocaleTimeString("ar-EG", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(/[صم]\.?$/, "")
    .trim();
};

export default formatTime;