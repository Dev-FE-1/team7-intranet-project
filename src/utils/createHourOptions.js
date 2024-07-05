export default function createHourOptions() {
  // 현재 시간 구하기
  const now = new Date();
  const currentHour = now.getHours();
  // 옵션 추가
  const option = [];
  for (let hour = Math.max(9, currentHour); hour <= 18; hour++) {
    option.push(`${hour}:00`);
  }

  return option;
}
