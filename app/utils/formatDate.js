const formatDateToMonthDayYear = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDateToDayMonthYear = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

module.exports = {
  formatDateToMonthDayYear,
  formatDateToDayMonthYear,
};
