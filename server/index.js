import express from 'express';
import morgan from 'morgan';
import fs from 'fs';

const port = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.json());

// server에 저장된 정적 파일(임직원 프로필 이미지, 공지사항 이미지) 접근 가능
app.use('/server/images', express.static('path/to/profile/images'));

// API 예시 코드(참고 자료)
// app.get('/api/users.json', (req, res) => {
//   fs.readFile('./server/data/users.json', 'utf8', (err, data) => {
//     if (err) {
//       console.error('Error reading JSON file:', err);
//       return res.status(500).send({
//         status: 'Internal Server Error',
//         message: err,
//         data: null,
//       });
//     }
//     try {
//       const jsonData = JSON.parse(data);
//       res.json(jsonData);
//     } catch (parseErr) {
//       console.error('Error parsing JSON file:', parseErr);
//       return res.status(500).send({
//         status: 'Internal Server Error',
//         message: parseErr,
//         data: null,
//       });
//     }
//   });
// });

// 로그인 기능
app.post('/api/user/login', (req, res) => {});

// 근무 시작/종료 API
app.post('/api/user/work/start', (req, res) => {});
app.post('/api/user/work/end', (req, res) => {});

// 로그인한 사용자의 근무 상태 확인 API
app.get('/api/user/work/status', (req, res) => {});

// 로그인한 사용자의 정보(이름, 소속 부서, 프로필 이미지 경로) 요청 API
app.get('/api/user/info', (req, res) => {});

// 특정 페이지의 휴가/외출 목록 정보 요청 API
app.get('/api/vacation/list', (req, res) => {});

// 휴가/외출 상세 정보 요청 API
app.get('/api/vacation/info', (req, res) => {});

// 휴가/외출 신청 API
app.post('/api/vacation', (req, res) => {});

// 가장 최근에 올라온 공지사항 3개 요청 API
app.get('/api/notice/recent', (req, res) => {});

// 공지사항 상세 정보 요청 API
app.get('/api/notice/info', (req, res) => {});

// 특정 페이지의 공지사항 목록 정보 요청 API
app.get('/api/notice/list', (req, res) => {
  const filepath='./server/data/notices.json';
  
  fs.readFile(filepath, 'utf8', (err, data)=>{
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send({
        status: 'Internal Server Error',
        message: err.message,
        data: null,
      });
    }
    try {
      let jsonData = JSON.parse(data);

      // 최신에 올라온 데이터 부터 보이도록 날짜를 기준으로 내림차순 정렬(기본)
      jsonData = jsonData.sort((a,b)=>new Date(b.date)-new Date(a.date));

      // 제목, 내용에 포함 된 내용으로 검색
      if(searchQuery){
        jsonData = jsonData.filter((item)=>
          item.title.includes(searchQuery) || item.content.includes(searchQuery)
        );
      }
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Error parsing JSON file:', parseErr);
      return res.status(500).send({
        status: 'Internal Server Error',
        message: parseErr.message,
        data: null,
      });
    }
  });
});

// 특정 페이지의 임직원 목록 정보 요청 API
app.get('/api/employee/list', (req, res) => {});

// 임직원 상세 정보 요청 API
app.get('/api/employee/info', (req, res) => {});

// 임직원 상세 정보 수정 API
app.put('/api/employee/info', (req, res) => {});

app.listen(port, () => {
  console.log(`ready to ${port}`);
});
