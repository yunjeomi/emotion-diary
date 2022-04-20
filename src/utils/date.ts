export const getToday = (originDate?: Date) => {
  let newDate = new Date();

  if (originDate) {
    newDate = originDate;
  }

  const thisYear = newDate.getFullYear();
  const thisMonth = newDate.getMonth() + 1;
  const thisDay = newDate.getDate();

  let month = thisMonth.toString();
  let day = thisDay.toString();

  if (thisMonth < 10) {
    month = `0${thisMonth}`;
  }

  if (thisDay < 10) {
    day = `0${thisDay}`;
  }

  const today = `${thisYear}-${month}-${day}`;
  return today;
};

export const convertDateToMS = (date: string) => {
  const dateArr = date.split("-");
  const year = parseInt(dateArr[0]);
  const month = parseInt(dateArr[1]) - 1;
  const day = parseInt(dateArr[2]);
  const newDate = new Date(year, month, day).getTime();

  return newDate;
};