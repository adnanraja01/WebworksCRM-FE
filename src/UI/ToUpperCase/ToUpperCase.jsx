export const ToUpperCase = (str) => {
  const stringVal = `${str.str}`;
  const string = `${stringVal}`.toLowerCase().split(" ");
  for (let i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].substring(1);
  }
  return string.join(" ");
};

export const upperCaseFunc = (str) => {
  const string = `${str}`.toLowerCase().split(" ");
  for (let i = 0; i < string.length; i++) {
    string[i] = string[i].charAt(0).toUpperCase() + string[i].substring(1);
  }
  return string.join(" ");
};
