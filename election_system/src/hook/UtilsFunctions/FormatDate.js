const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Get day and year in English numbers
  const day = date.toLocaleDateString("en-GB", { day: "numeric" });
  const year = date.toLocaleDateString("en-GB", { year: "numeric" });

  // Get month name in Arabic
  const month = date.toLocaleDateString("ar-IQ", { month: "long" });

  return `${day} ${month} ${year}`;
};

export default formatDate;

