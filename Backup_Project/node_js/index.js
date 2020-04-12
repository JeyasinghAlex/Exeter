var express = require('express');
var app = express();
var ejs = require('ejs');
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/',(req, res)=>{
   res.render('home');
});

app.get('/about', (req, res)=>{
     res.render('about');
});
ejs.
app.listen(3000);