const getPeriod = (period = '3 дня') => {
  const today = new Date();
  let startDate;

  const calculateStartDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date;
  };

  switch (period) {
    case '3 дня':
      startDate = calculateStartDate(3);
      break;
    case 'Неделя':
      startDate = calculateStartDate(7);
      break;
    case 'Месяц':
      startDate = new Date(today.setMonth(today.getMonth() - 1));
      break;
    case 'Год':
      startDate = new Date(today.setFullYear(today.getFullYear() - 1));
      break;
    default:
      return [null, null];
  }

  const formatDate = (date) => date.toISOString().split('T')[0];

  return [formatDate(startDate), formatDate(today)];
};

export default getPeriod;
