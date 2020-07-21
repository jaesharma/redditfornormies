const express = require('express');
const path = require('path');
const app = express();
const root = require('path').join(__dirname, '..', 'build')
app.use(express.static(root));
app.get('/*', function(req, res) {
  res.sendFile(path.join('index.html',{ root }));
});
app.listen(9000);