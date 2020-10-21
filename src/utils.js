export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start);
};

export const cardLimit = 21;
