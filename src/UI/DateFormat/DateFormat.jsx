export const DateFormat = (dateString) => {
  const newDate = new Date(dateString.isoString);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const dateOutput = `${day}-${month}-${year}`;
  return dateOutput;
};
