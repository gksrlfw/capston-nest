// https://attacomsian.com/blog/nodejs-convert-csv-to-json
// require csvtojson module
const CSVToJSON = require('csvtojson');
const mysql = require('mysql2');
const fs = require('fs');

const conn = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'eksrja784$',
  database: 'sample'
}


const GUS = ['종로구','중구','용산구','성동구','광진구','동대문구','중랑구','성북구','강북구','도봉구','노원구','은평구','서대문구','마포구','양천구','강서구','구로구','금천구','영등포구','동작구','관악구','서초구','강남구','송파구','강동구'];

var connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();   // DB 접속

/**
 * db에 넣기!
 */
// convert users.csv file to JSON array
CSVToJSON()
    .fromFile('data.csv')
    .then(async users => {
      // for(let a of users) {
      //   const arr = a.price.split(',');
      //   let str = '';
      //   for(let i=0; i<arr.length; i++) {
      //     str+=arr[i];
      //   }
      //   a.price = Number.parseInt(str);

      //   const d = new Date();
      //   d.setFullYear(Number.parseInt(a.year));
      //   d.setMonth(Number.parseInt(a.month));
      //   d.setDate(Number.parseInt(a.date));
      //   a.traded_at = getTime(d);

      //   a.built_at = Number.parseInt(a.built_at);
      //   a.latitude = Number.parseFloat(a.latitude);
      //   a.longitude = Number.parseFloat(a.longitude);
      //   a.floor = Number.parseInt(a.floor);
      //   a.area = Number.parseFloat(a.area);
      //   delete a.year;
      //   delete a.month;
      //   delete a.date;

      //   if(!a.longitude || !a.latitude) continue;
        
      //   var testQuery = `insert into sample.apart(price, built_at, traded_at, dong, apart, latitude, longitude, floor, area) 
      //   values(${a.price}, ${a.built_at}, "${a.traded_at}", "${a.dong}", "${a.apart}", ${a.latitude}, ${a.longitude}, ${a.floor}, ${a.area})`;
      //   console.log(testQuery);
      //   await pro(testQuery)
      // }
      let i=0;
      for(let gu of GUS) {
        i++;
        const guQuery = `insert into sample.gu(name, size) values("${gu}", ${i});`;
        console.log(guQuery);
        await pro(guQuery);
      }
    }).catch(err => {
      // log error if any
      console.log(err);
    });
 
const pro = (testQuery) => {
  return new Promise((res, rej) => {
    connection.query(testQuery, (err, results, fields) => { 
      if (err) {
        rej(err);
      }
      res(results);
    });
  });
}

function getTime(date) {
  return date.getFullYear()
          + '-' +
          (Number.parseInt(date.getMonth())+1).toString()
          + '-' +
          date.getDate()
}
