const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const https = require('https');


const USE_SSL = true // set to false if u want to run with http (it may not work in every case)
const SSL_DOMAIN = "yourdomain.com" // domain for api, need for ssl only (you can skip this if running http)
const sslOptions = {
  key: fs.readFileSync('/etc/letsencrypt/live/',SSL_DOMAIN,'/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/',SSL_DOMAIN,'/cert.pem'),
  ca: fs.readFileSync('/etc/letsencrypt/live/',SSL_DOMAIN,'/chain.pem'), // dont forget to generate ssl certs via LetsEncrypt
};

const app = express();
const PORT = 1414;

app.use(cors());

const F_DATA = path.join(__dirname, 'response.json');

const fetchData = async () => {
  try {
    console.log('fetching...');
    const responses = await Promise.all([
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=1&sparkline=false'),
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=2&sparkline=false'),
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=3&sparkline=false'),
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=4&sparkline=false'),
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=200&page=5&sparkline=false'),
    ]);

    const data = responses.flatMap(response => response.data);
    const result = {
      data,
      lastUpdated: new Date(),
    };

    fs.writeFileSync(F_DATA, JSON.stringify(result, null, 2));
    console.log('saved to responce.json');
  } catch (error) {
    console.error('err:', error.message);
  }
};

const interval = 5; // time between requests in minutes
setInterval(fetchData, interval * 60 * 1000);
fetchData();

app.get('/api/getData', (req, res) => {
  if (fs.existsSync(F_DATA)) {
    const jsonData = fs.readFileSync(F_DATA, 'utf-8');
    res.json(JSON.parse(jsonData));
  } else {
    res.status(404).json({ error: 'Data not available.' });
  }
});

if (USE_SSL) {
  https.createServer(sslOptions, app).listen(PORT, () => {
    console.log('[HTTPS] running on :', PORT);
  });
} else {
  app.listen(port, () => {
    console.log('[HTTP] running on :', PORT);
  })
}