export const formatBookingDateTimeRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  // Detect user's timezone automatically
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const datePart = startDate.toLocaleDateString("en-GB", {
    timeZone: userTimeZone,
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const startTime = startDate.toLocaleTimeString("en-US", {
    timeZone: userTimeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const endTime = endDate.toLocaleTimeString("en-US", {
    timeZone: userTimeZone,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart}, ${startTime} – ${endTime}`;
};