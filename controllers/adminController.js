var client = require("../models/db").client;

exports.getLogin = function(req,res){
	let session = req.session;
	if(session.email == undefined && session.password == undefined){
		res.render('adminlogin',{msgalert:""});
	}else{
		res.redirect('/admin/photos');
	}
}

exports.postLogin = function(req,res){
	let session = req.session;
	let email = req.body.email;
	let pwd = req.body.password;
	if(email == "" || pwd == ""){
		res.render('adminlogin',{msgalert:"Remplir les 2 champs"});
	}else{
		client.connect(err => {
		  	const collection = client.db("nancy").collection("user");
		  	// perform actions on the collection object
			collection.find().limit(1).toArray(function(err, result) {
			    if (err) throw err;
			    if(result[0]['email'] == email && result[0]['password'] == pwd){
			    	session.email = email;
					session.password = pwd;
					res.redirect('/admin/photos');
			    }else{
			    	res.render('adminlogin',{msgalert:"Erreur"});
			    }
			    //client.close();
			});
		});
	}
}


exports.getAdminImage = function(req,res){
	let session = req.session;
	if(session.email == undefined || session.password == undefined){
		res.render('adminlogin',{msgalert:""});
	}else{
		client.connect(err => {
		  	const collection = client.db("nancy").collection("photo");
		  	// perform actions on the collection object
			collection.find().toArray(function(err, result) {
			    res.render('adminphoto',{photos:result});
			    //client.close();
			});
		});
		
	}
}

exports.postAdminImage = function(req,res){
	let session = req.session;
	if(session.email == undefined || session.password == undefined){
		res.render('adminlogin',{msgalert:""});
	}else{
		let url = req.body.url;
		if(url != undefined && url != ""){
			client.connect(err => {
			  	const collection = client.db("nancy").collection("photo");
			  	// perform actions on the collection object
				let photo = {link:url};
				collection.insertOne(photo, function(err, res) {
				    if (err) throw err;
				    console.log("1 document inserted");
				    //client.close();
				    res.redirect('/admin/photos');
			  	});
			});
		}
		else res.redirect('/admin/photos');
	}
}



