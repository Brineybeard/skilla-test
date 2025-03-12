export const getCallRecord = async (recordId, partnerId) => {
  const baseUrl = 'https://api.skilla.ru/mango/getRecord';
  const params = new URLSearchParams({
    record: recordId,
    partnership_id: partnerId,
  });

  try {
    const response = await fetch(`${baseUrl}?${params}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer testtoken',
        'Content-type': 'audio/mpeg, audio/x-mpeg, audio/x-mpeg-3, audio/mpeg3',
        'Content-Transfer-Encoding': 'binary',
        'Content-Disposition': 'filename="record.mp3"',
      },
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.statusText}`);
    }
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  } catch (error) {
    console.error('Error when receiving call data:', error);
    return [];
  }
};

export default getCallRecord;
