export default function createHourOptions(selectedDate) {
  const option = [];
  const now = new Date();
  const currentHour = now.getHours();
  const currentDate = now.toISOString().split('T')[0]; // 오늘 날짜 (yyyy-mm-dd 형식)
  selectedDate = selectedDate || currentDate;
  console.log(selectedDate);
  if (selectedDate > currentDate) {
    // 선택된 날짜가 오늘 이후의 날짜일 경우
    for (let hour = 9; hour <= 18; hour++) {
      option.push(`${hour < 10 ? '0' + hour : hour}:00`);
    }
  } else if (selectedDate === currentDate) {
    // 선택된 날짜가 오늘인 경우
    for (let hour = Math.max(9, currentHour); hour <= 18; hour++) {
      if (
        hour > currentHour ||
        (hour === currentHour && now.getMinutes() < 15)
      ) {
        option.push(`${hour < 10 ? '0' + hour : hour}:00`);
      }
    }
  }

  return option;
}
