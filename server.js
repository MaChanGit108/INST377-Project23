// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get(async (req, res) => {
    //console.log('GET request detected');
    //console.log('fetch request data', json);
    console.log('GET request detected, initializing budget chart');
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/uh6s-izyj.json?agency=EDUCATION');
    const json = await data.json();
    //console.log(json);
    res.json(json);
  })
  .post(async (req, res) => {
    console.log('POST request detected, displaying payee info');
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/uh6s-izyj.json?agency=EDUCATION');
    const json = await data.json();
    
    const filtered = [];
    json.forEach((entry) => {
      if (entry.payee_name === req.body.payee_name) {filtered.push(entry);}
    });

    res.json(filtered);
    // console.log('res.json', json);
  })
  .put(async (req, res) => {
    console.log('PUT request detected, updating payee display');
    const data = await fetch('https://data.princegeorgescountymd.gov/resource/uh6s-izyj.json?agency=EDUCATION');
    const json = await data.json();
    
    const filtered = [];
    json.forEach((entry) => {
      if (entry.payee_name === req.body.payee_name) {filtered.push(entry);}
    });

    res.json(filtered);
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
