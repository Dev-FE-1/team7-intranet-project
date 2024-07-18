// 날짜, 요일 데이터를 반환하는 함수
const weekArray = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];
// 항상 새로운 배열을 생성하지 않아도 되므로, 함수 내에서 선언하기 보다는 함수 외부에서 선언하는 것이 좋다.
// 함수 내부에서 선언하면 함수가 호출될 때마다 새로운 배열이 생성됩니다.
// 보통 상수 파일로 따로 빼서 관리합니다.

export const getDate = () => {
  const date = new Date();
  const week = weekArray[date.getDay()];
  const today = `${date.getFullYear()}년 ${
    date.getMonth() + 1
  }월 ${date.getDate()}일`;

  // 객체 리터럴을 사용하면, 객체의 키와 값이 동일한 이름일 때는 하나로 축약할 수 있습니다.
  return {
    week,
    today,
  };
};

// 시간 데이터를 반환하는 함수
export const getTime = () => {
  const now = new Date();
  const hour = now.getHours().toString().padStart(2, "0"); // 중복되는 코드 함수로 분리
  const minute = now.getMinutes().toString().padStart(2, "0");
  const second = now.getSeconds().toString().padStart(2, "0");

  return { hour: hour, minute: minute, second: second }; // 객체 리터럴 축약
};
