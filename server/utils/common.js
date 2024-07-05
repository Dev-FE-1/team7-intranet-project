import fs from 'fs';

// 특정 객체 배열에서 원하는 key에 해당하는 value가 일치하는 데이터만 찾아서 반환하는 함수
// 매개변수로 arr(배열), key(대상 key 값), value(대상 value 값) 입력
export function findKeyValue(arr, key, value) {
  return arr.filter((obj) => obj[key] === value);
}

// 특정 경로에 위치한 Json 파일에 접근해 모든 데이터를 불러오는 함수
// path 작성 예시 : './server/data/user.json'
export function getJsonData(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, jsonData) => {
      if (err) {
        reject(err);
      }
      try {
        resolve(JSON.parse(jsonData).data);
      } catch (err) {
        rejects(err);
      }
    });
  });
}
