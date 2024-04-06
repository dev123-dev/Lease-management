export const indianFormatDate = (data) => {
  try {
    return data.split("-").reverse().join("-");
  } catch (er) {
    return "err";
  }
};
