var express = require('express');
var cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), 'public/tmp'));
  },
  filename: function (req, file, cb) {
    const og_name = file.originalname;
    // const ext = path.extname(og_name);
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E5);
    cb(null, og_name);
  }
})

const upload = multer({ storage: storage })

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const file = req.file;
  res.json({
    name: file.filename,
    type: file.mimetype,
    size: file.size
  });
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on http://localhost:3000');
});
