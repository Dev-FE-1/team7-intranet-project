import express from 'express';
import morgan from 'morgan';
import fs from 'fs';

const port = process.env.PORT || 8080;
const app = express();

app.use(morgan('dev'));
app.use(express.static('dist'));
app.use(express.json());

app.get('/server/data/users.json', (req, res) => {
  fs.readFile('/server/data/users.json', 'utf8', (err, data) => {
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

app.listen(port, () => {
  console.log(`ready to ${port}`);
});
