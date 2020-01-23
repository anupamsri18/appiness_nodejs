const express = require('express')
const app = express()
const port = 3000;
var {
    products_model,
    categories_model
  } = require("./model");
  
var database = require('./config');
app.get('/', (req, res) => res.json('Welcome to Appiness!'))

app.delete('/category/:cat_name', async (req, res) => {
    try{
        
        let product_data = await
        products_model.find({
            category:req.params.cat_name
        });
        if(product_data.length > 0){
            try{
                let status = await products_model.deleteMany({
                    category:req.params.cat_name
                })
               
                if(status.n > 0){
                    res.json({
                        product_data:product_data
                    })
                }
                else{
                    res.json({
                        status:"No Data deleted"
                    })
                }
            }catch(err){
                res.json(err);
            }
        }else{
            res.json({
                status:"No Data found"
            })
        }
    }catch(err){
        res.json(err);
    }
  
})

var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, X-Callback-Type, Content-Type, Accept");
    res.header('Cache-Control', 'no-cache');
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
});

app.use(bodyParser.json({limit: '5mb'}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(function (req, res, next) {
    next(createError(404));
});



app.listen(port, () => console.log(`Listening on port ${port}!`))
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    var propertyNames = Object.getOwnPropertyNames(err);
    var descriptor;
    var error = {}
    for (var property, i = 0, len = propertyNames.length; i < len; ++i) {
        property = propertyNames[i];
        descriptor = Object.getOwnPropertyDescriptor(err, property);
        error[property] = descriptor;
        console.log(descriptor);
    }
    error['status'] = 500;
    // delete error.stack;
    // render the error page
    res.status(err.status || 500).json({'error': error});
    // res.render('error');
});

module.exports = app;