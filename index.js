var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var controller = require("./controllers/adminController");

 
app.set("view engine","ejs")
app.set('views',__dirname + '/views');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
  cookie:{
  	blabla:600000,
  	sameSite:'strict'
  },
  rolling:true
}));


app.get('/admin', controller.getLogin);
app.post('/admin', controller.postLogin);
app.get('/admin/photos', controller.getAdminImage);
app.post('/admin/photos', controller.postAdminImage);

app.get('/logout',function(req,res){
	req.session.destroy(function(err){
		if(err)res.send(err);
		else{
			res.redirect('/admin');
		}
	});
});


const port = process.env.PORT || 3000;
app.listen(port); 