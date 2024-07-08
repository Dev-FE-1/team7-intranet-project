export default function createHourOptions(selectedDate) {
  const now = new Date();
  const currentHour = now.getHours();

  if (!selectedDate) {
    const option = [];
    for (let hour = Math.max(9, currentHour); hour <= 18; hour++) {
      option.push(`${hour}:00`);
    }
    return option;
  } else {
    //오늘 날짜
    const option = [];
    for (let hour = 9; hour <= 18; hour++) {
      option.push(`${hour < 10 ? '0' + hour : hour}:00`);
    }
    return option;
  }
}
