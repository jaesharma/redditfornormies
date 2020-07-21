const express = require('express');
const path = require('path');
const port=process.env.PORT || 3000;
const app = express();
const root = require('path').join(__dirname, '..', 'build')
app.use(express.static(root));
app.get('/*', function(req, res) {
  res.sendFile(path.join('index.html',{ root }));
});
app.listen(port,()=>{
	console.log('server is up');
});