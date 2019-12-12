var express = require('express');
const mongoose=require('mongoose');
const Ninja=require('./models/database');
const routes =require('./routes/api');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

var app = express();
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(routes);

mongoose.connect("mongodb://localhost:27017/ninjago", { useNewUrlParser: true,useUnifiedTopology: true });

app.get('/', function(req, res) {
	//response.sendFile(path.join(__dirname + '/login.html'));
	res.render('login');
});


app.listen(8000);