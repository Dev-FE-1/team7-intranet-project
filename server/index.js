import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { getJsonData, findKeyValue } from './utils/common.js';
import fs from 'fs';

const port = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.json());
app.use(cookieParser());

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
app.post('/api/user/login', async (req, res) => {
  const { id, pw } = req.body;
  const jsonData = await getJsonData('./server/data/user.json');
  const [user] = findKeyValue(jsonData, 'email', `${id}@77cm.co.kr`);

  if (user && user.password === pw) {
    // 사용자 정보를 쿠키에 저장
    res.cookie('userId', user.userId, { maxAge: 900000, httpOnly: true });
    res.cookie('admin', user.admin, { maxAge: 900000, httpOnly: true });

    res.status(200).send({ message: '로그인 성공' });
  } else {
    res.status(401).send({ message: '로그인 실패' });
  }
});

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
app.get('/api/notice/list', (req, res) => {});

// 특정 페이지의 임직원 목록 정보 요청 API
app.get('/api/employee/list', (req, res) => {});

// 임직원 상세 정보 요청 API
app.get('/api/employee/info', (req, res) => {});

// 임직원 상세 정보 수정 API
app.put('/api/employee/info', (req, res) => {});

app.listen(port, () => {
  console.log(`ready to ${port}`);
});
