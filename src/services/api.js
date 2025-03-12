const formatPhoneNumber = (number) => {
  if (!number || number.length < 11) return null;
  const countryCode = number.slice(0, 1);
  const areaCode = number.slice(1, 4);
  const firstPart = number.slice(4, 7);
  const secondPart = number.slice(7);
  return `+${countryCode}(${areaCode})-${firstPart}-${secondPart}`;
};

const formatDuration = (totalSeconds) => {
  if (totalSeconds < 5) return null;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`;
};

const getRandomScore = () => {
  const randomInt = Math.floor(Math.random() * 4);
  switch (randomInt) {
    case 0:
      return ['Плохо', 'stateBad'];
    case 1:
      return ['Хорошо', 'stateGood'];
    case 2:
      return ['Отлично', 'stateExcellent'];
    case 3:
      return ['', null];
    default:
      throw new Error(
        `${randomInt} The argument is outside the specified range`
      );
  }
};

const getCallDetails = async (in_out = null, date_start, date_end) => {
  const baseUrl = 'https://api.skilla.ru/mango/getList';
  const params = new URLSearchParams({
    date_start,
    date_end,
    ...(in_out !== null && { in_out }), // 1 - входящий звонок, 0 - исходящий звонок, пусто - все звонки
  });

  try {
    const response = await fetch(`${baseUrl}?${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer testtoken',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.statusText}`);
    }

    const { results } = await response.json();

    const callDetails = await results.map((call) => ({
      id: call.id,
      callType: call.in_out === 1 ? 'incoming' : 'outgoing',
      callTime: call.date,
      avatarUrl: call.person_avatar,
      callersName: call.partner_data.name,
      callNumber: formatPhoneNumber(call.partner_data.phone),
      source: call.source || call.line_name || '',
      duration: formatDuration(call.time),
      score: getRandomScore(),
      recordId: call.record,
      partnerId: call.partnership_id,
    }));

    return callDetails;
  } catch (error) {
    console.error('Error when receiving call data:', error);
    return [];
  }
};

export default getCallDetails;
