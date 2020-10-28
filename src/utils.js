//Подсчет количества страниц для пагинации
export const range = (start, end) => {
  return [...Array(end).keys()].map((el) => el + start);
};

//лимит cards на странице
export const cardLimit = 6;

//Фильтр для инпутов
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

//Валидация
export const validateEmail = (email) => {
  const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
export const validatePassword = (password) => {
  const re = /^[0-9a-zA-Z]{4,}$/;
  return re.test(String(password));
};
