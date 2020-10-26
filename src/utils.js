export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start);
};

export const cardLimit = 15;

export const inputFilter = (arr, event, setFilter) => {
  let result = [];
  arr.forEach((value) => {
    if (value.toLowerCase().indexOf(event.target.value.toLowerCase()) === 0) {
      result.push(value);
    }
    return value;
  });
  setFilter(result);
  return result;
};
