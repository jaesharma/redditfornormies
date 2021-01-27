const express = require('express');
const path = require('path');
const port=process.env.PORT || 3000;
const app = express();
const root = require('path').join(__dirname, '..', 'build');
const cors = require('cors');

app.use(cors());
app.options('*', cors());
app.use(express.static(root));
app.get('*', function(req, res) {
  res.sendFile(path.join(root,'index.html'));
});
app.listen(port,()=>{
	console.log('server is up');
});