export const shuffle = (arr) => {
  return [...arr].sort(() => 0.5 - Math.random());
};

export const buildUrl = (baseUrl, params) => {
  const url = new URL(baseUrl); // Создаем объект URL
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value); // Добавляем параметры в URL
    }
  });
  return url.toString(); // Возвращаем строку с полным URL
};

export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);
