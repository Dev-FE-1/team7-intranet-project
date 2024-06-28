fetch('/server/data/users.json')
  .then((res) => res.json())
  .then((data) => console.log(data));

// async function fetchData() {
//   const employee = await fetch('/server/data/users.json')
//     .then((res) => res.json())
//     .then((data) => console.log(data[0]));
// }

// fetchData();

// const fs = require('fs');
// const employeeList = fs.readFileSync('./server/data/users.json', 'utf8');
// console.log(employeeList);
