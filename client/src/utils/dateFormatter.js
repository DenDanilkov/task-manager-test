export const dateFormater = (date) => {
  const currentDate = new Date(date);
  const month = currentDate.getMonth();
  const day = currentDate.getDate();

  return `${day < 10 ? '0' + day : day}.${
    month + 1 < 10 ? '0' + (month + 1) : month + 1
  }.${currentDate.getFullYear()} `;
};

export const dateWithTime = (date) => {
  const currentDate = new Date(date);
  const time = currentDate.toTimeString().split(' ')[0];
  const formatedDate = dateFormater(date);

  return `${time} ${formatedDate}`;
};
