export const getInitials = (value) => {
  const arr = value.split(" ");
  return arr[0][0] + arr[1][0];
};

export const combineYears = (years) => {
  let combinedYears = [];
  for (let i = 0; i < years.length - 1; i++) {
    combinedYears.push(`${years[i]}/${years[i + 1]}`);
  }
  return combinedYears;
};

export const getGrade = (value) => {
  if (value >= 70) {
    return "A";
  } else if (value >= 60 && value < 70) {
    return "B";
  } else if (value >= 50 && value < 60) {
    return "C";
  } else if (value >= 40 && value < 50) {
    return "D";
  } else if (value >= 30 && value < 40) {
    return "E";
  } else {
    return "F";
  }
};
