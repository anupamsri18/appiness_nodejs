var mongoose = require('mongoose');
// const url = "mongodb://159.65.222.240:27017/29k";
// const url = "mongodb+srv://admin:m2g8OmmvMGf3iGOz@cluster0-s3bhx.mongodb.net/29k?retryWrites=true&w=majority";
const url = "mongodb://127.0.0.1/appiness";
//var ds = {};
// mongoose.connect('mongodb://127.0.0.1/pinclickdb').then(() => console.log('connection success')).catch((err) => console.log(err));
mongoose.connect(url, { useNewUrlParser: true }).then((resp) => console.log('db connection success')).catch((err) => console.log('Error:::'+err));