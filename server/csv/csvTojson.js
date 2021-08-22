// https://attacomsian.com/blog/nodejs-convert-csv-to-json
// require csvtojson module
const dayjs = require('dayjs');
const CSVToJSON = require('csvtojson');
const mysql = require('mysql2');
const fs = require('fs');
const faker = require('faker');

const conn = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'recommend'
}

// const conn = {
//   host: 'localhost',
//   port: '3311',
//   user: 'root',
//   password: '',
//   database: 'recommend'
// }

// const conn = {
//   host: '4.tcp.ngrok.io',
//   port: '14491',
//   user: 'root',
//   password: '',
//   database: 'recommend'
// }

const GUS = [
  {
    name: '종로구',
    longitude: 126.9773213,
    latitude: 37.59491732,
  },
  {
    name: '중구',
    longitude: 126.9959681,
    latitude: 37.56014356,
  },
  {
    name: '용산구',
    longitude: 126.979907,
    latitude: 37.53138497,
  },
  {
    name: '성동구',
    longitude: 127.0410585	,
    latitude: 37.55102969,
  },
  {
    name: '광진구',
    longitude: 127.0857435	,
    latitude: 37.54670608,
  },
  {
    name: '동대문구',
    longitude: 127.0548481	,
    latitude: 37.58195655,
  },
  {
    name: '중랑구',
    longitude: 	127.0928803		,
    latitude: 37.59780259,
  },
  {
    name: '성북구',
    longitude: 	127.0175795		,
    latitude: 37.6057019,
  },
  {
    name: '강북구',
    longitude: 127.011189	,
    latitude: 37.64347391	,
  },
  {
    name: '도봉구',
    longitude: 	127.0323688	,
    latitude: 37.66910208	,
  },
  {
    name: '노원구',
    longitude: 	127.0750347	,
    latitude:37.65251105,
  },
  {
    name: '은평구',
    longitude: 	126.9270229	,
    latitude: 37.61921128,
  },
  {
    name: '서대문구',
    longitude: 	126.9390631,
    latitude: 	37.57778531
  },
  {
    name: '마포구',
    longitude: 	126.90827		,
    latitude: 37.55931349	,
  },
  {
    name: '양천구',
    longitude: 	126.8554777		,
    latitude: 37.52478941,
  },
  {
    name: '강서구',
    longitude: 	126.822807	,
    latitude: 337.56123543	,
  },
  {
    name: '구로구',
    longitude: 	126.8563006			,
    latitude: 37.49440543,
  },
  {
    name: '금천구',
    longitude: 126.9008202		,
    latitude: 37.46056756,
  },
  {
    name: '영등포구',
    longitude: 	126.9101695			,
    latitude: 37.52230829,
  },
  {
    name: '동작구',
    longitude: 	126.9516415			,
    latitude: 37.49887688,
  },
  {
    name: '관악구',
    longitude: 	126.9453372				,
    latitude: 37.46737569,
  },
  {
    name: '서초구',
    longitude: 	127.0312203		,
    latitude: 37.47329547	,
  },
  {
    name: '강남구',
    longitude: 	127.0629852		,
    latitude: 37.49664389	,
  },
  {
    name: '송파구',
    longitude: 	127.115295		,
    latitude: 37.50561924	,
  },
  {
    name: '강동구',
    longitude: 	127.1470118		,
    latitude: 37.55045024	,
  },
]


// const GUS = ['종로구','중구','용산구','성동구','광진구','동대문구','중랑구','성북구','강북구','도봉구','노원구','은평구','서대문구','마포구','양천구','강서구','구로구','금천구','영등포구','동작구','관악구','서초구','강남구','송파구','강동구'];

var connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();   // DB 접속

// console.log(connection)
/**
 * db에 넣기!
 */
// convert users.csv file to JSON array
function insertData() {
  CSVToJSON()
    .fromFile('data2.csv')
    .then(async users => {
      for(let a of users) {
        const arr = a.price.split(',');
        let str = '';
        for(let i=0; i<arr.length; i++) {
          str+=arr[i];
        }
        a.price = Number.parseInt(str);
        
        const d = new Date();
        d.setFullYear(Number.parseInt(a.year));
        d.setMonth(Number.parseInt(a.month));
        d.setDate(Number.parseInt(a.date));
        a.traded_at = getTime(d);
        
        a.built_at = Number.parseInt(a.built_at);
        a.latitude = Number.parseFloat(a.latitude);
        a.longitude = Number.parseFloat(a.longitude);
        a.floor = Number.parseInt(a.floor);
        a.area = Number.parseFloat(a.area);
        delete a.year;
        delete a.month;
        delete a.date;
        
        if(!a.longitude || !a.latitude) continue;
        
        var testQuery = `insert into recommend.apart(price, built_at, traded_at, dong, apart, latitude, longitude, floor, area, gu)
        values(${a.price}, ${a.built_at}, "${a.traded_at}", "${a.dong}", "${a.apart}", ${a.latitude}, ${a.longitude}, ${a.floor}, ${a.area}, "${a.gu}")`;
        console.log(testQuery);
        await pro(testQuery)
      }
      let i=0;
      for(let gu of GUS) {
        i++;
        const guQuery = `insert into recommend.gu(name, latitude, longitude, size) values("${gu.name}", ${gu.latitude}, ${gu.longitude}, ${i});`;
        console.log(guQuery);
        await pro(guQuery);
      }
    }).catch(err => {
    // log error if any
    console.log(err);
  });
}


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




async function user() {
  for(let i=0; i<990; i++) {
    const email = faker.unique(faker.internet.email);
    const password = faker.internet.password();
    const salt = faker.internet.password();
    const firstname = faker.unique(faker.name.firstName);
    const gender = i%2===0 ? '남자' : '여자';
    const age = getRandomInt(20, 50);
    // const created = dayjs().format();
    // const updated = dayjs()
    console.log(email, password, firstname, gender, age);
    let str = `
    Insert into recommend.user(email, password, username, salt, age, gender)
    values(
              "${email}",
              "${password}",
              "${firstname}",
              "${salt}",
              ${age},
              "${gender}"
          )
  `;
    await pro(str);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
}


// insertData()
user();

async function log() {
  for(let i=1; i<991; i++) {
    for(let j=1; j<=10; j++) {
      let str = `
      insert into recommend.click_log(user_id, apart_id)
      values(${i}, ${j})
      `
    }
  }
}
