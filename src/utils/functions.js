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

export const getGrades = (idx) => {
  switch (idx) {
    case 0:
      return "A";
    case 1:
      return "B";
    case 2:
      return "C";
    case 3:
      return "D";
    case 4:
      return "E";
    default:
      return "F";
  }
};

export const countStudents = (results) => {
  return [
    results.filter((result) => result.grade === "A").length,
    results.filter((result) => result.grade === "B").length,
    results.filter((result) => result.grade === "C").length,
    results.filter((result) => result.grade === "D").length,
    results.filter((result) => result.grade === "E").length,
    results.filter((result) => result.grade === "F").length,
  ];
};
