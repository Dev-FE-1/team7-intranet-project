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

// 로그인 API
app.post('/api/user/login', async (req, res) => {
  const { id, pw } = req.body;
  const jsonData = await getJsonData('./server/data/user.json');
  const [user] = findKeyValue(jsonData, 'email', `${id}@77cm.co.kr`);

  if (user && user.password === pw) {
    // 사용자 정보를 쿠키에 저장
    res.cookie('userId', user.userId, { maxAge: 900000 });
    res.cookie('admin', user.admin, { maxAge: 900000 });

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
app.get('/api/vacation/list', (req, res) => {
  fs.readFile('./server/data/vacation.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading JSON file:', err);
      return res.status(500).send({
        status: 'Internal Server Error',
        message: err,
        data: null,
      });
    }
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseErr) {
      console.error('Error parsing JSON file:', parseErr);
      return res.status(500).send({
        status: 'Internal Server Error',
        message: parseErr,
        data: null,
      });
    }
  });
});

// 휴가/외출 상세 정보 요청 API
app.get('/api/vacation/info', (req, res) => {});

// 휴가/외출 신청 API
app.post('/api/vacation', (req, res) => {});

// 가장 최근에 올라온 공지사항 3개 요청 API
app.get('/api/notice/recent', (req, res) => {});

// 공지사항 상세 정보 요청 API
app.get('/api/notice/info', (req, res) => {
  const filepath = './server/data/notice.json';

  fs.readFile(filepath, 'utf8', (err, data) => {
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

      //업로드 날짜 최신순으로 불러오도록 함
      jsonData.data = jsonData.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const noticeId = req.query.noticeId
      //json 형태로 응답을 돌려줌
      res.json({
        jsonData,
        noticeId: noticeId
      });
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

// 특정 페이지의 공지사항 목록 정보 요청 API
app.get('/api/notice/list', (req, res) => {
  const filepath = './server/data/notice.json';

  fs.readFile(filepath, 'utf8', (err, data) => {
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

      //업로드 날짜 최신순으로 불러오도록 함
      jsonData.data = jsonData.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      // 요청한 페이징 정보에 대한 응답
      const page = parseInt(req.query.page) || 1;
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 9;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      //검색
      let filterData = jsonData.data;

      if (req.query.search) {
        const searchQuery = req.query.search.trim();
        const keywords = searchQuery.split(' ')
        filterData = filterData.filter((item) => {
          return keywords.every((keyword)=>(
            item.title.includes(keyword) ||
            item.content.includes(keyword)
          )) 
        });

        if(filterData.length === 0){
          return res.status(404).json({ message: '해당 키워드가 없습니다' });
        }
      }
      const sliceData = filterData.slice(startIndex, endIndex);

      //json 형태로 응답을 돌려줌
      res.json({
        jsonData,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        totalItems: jsonData.data.length,
        totalPages: Math.ceil(jsonData.data.length / itemsPerPage),
        data: sliceData,
        searchQuery: req.query.search || '',
      });
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
