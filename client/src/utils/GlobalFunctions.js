export const indianFormatDate = (data) => {
  try {
    return data.split("-").reverse().join("-");
  } catch (er) {
    return "err";
  }
};

export const indianNumberFormat = (data) => {
  try {
    return data.toLocaleString("en-IN");
  } catch (er) {
    return "err";
  }
};
