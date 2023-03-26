const https = require('https');

const options = {
  hostname: '127.0.0.1',
  port: 4000,
  path: '/todos',
  method: 'GET',
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();