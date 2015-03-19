var mongoose = require( 'mongoose' );
var User = require('../model/user');
var db = mongoose.connect( 'mongodb://localhost/mydb' );
var order=-1;
var sorty ='name';
var currentsearch='';

exports.index = function ( req, res ){	
  var sortby=req.param('sortBy','name');
  var isSearch =req.param('issearch',false);
  
  if(sorty!== sortby){
	  order=1;
	  sorty= sortby;
  }else{
	  if(order===-1){
		  order=1;
	  }else{
		  order=-1;
	  }
  }
  
  if(isSearch){
	  order=1;
	  sorty ='name';
  }
  
  var searchval= req.body.searchName;
  
  if(searchval === null || typeof searchval === 'undefined'){
	  searchval=currentsearch;
  }else{
	  currentsearch= searchval;
  }
  
  if(sortby=== 'name'){
	  User.
	    find({
	    	'name': new RegExp('^'+searchval, "i")
	    }).
	    sort({name: order}).
	    exec( function ( err, users, searchName){
	      if(err){
	    	  console.log(err);
	      }
	      res.render( 'index', {
	          title : 'User List',
	          users : users,
	          searchName : searchval,
	          order : order,
	          sorty : sorty
	      });
	    });
  	}
  
  if(sortby=== 'email'){
	  User.
	    find({
	    	'name': new RegExp('^'+searchval, "i")
	    }).
	    sort({email: order}).
	    exec( function ( err, users, searchName){
	      if(err){
	    	  console.log(err);
	      }
	      res.render( 'index', {
	          title : 'User List',
	          users : users,
	          searchName : searchval,
	          order : order,
	          sorty : sorty
	      });
	    });
  }
  
  if(sortby=== 'birthday'){
	  User.
	    find({
	    	'name': new RegExp('^'+searchval, "i")
	    }).
	    sort({birthday: order}).
	    exec( function ( err, users, searchName){
	      if(err){
	    	  console.log(err);
	      }
	      res.render( 'index', {
	          title : 'User List',
	          users : users,
	          searchName : searchval,
	          order : order,
	          sorty : sorty
	      });
	    });
  }
  
};

/*
exports.search = function ( req, res ){
	  User.
	    find({
	    	 'name': new RegExp('^'+req.body.searchName, "i")
	    }).
	    sort( 'name' ).
	    exec( function ( err, users ,searchName, order){
	      if(err){
	    	  console.log(err);
	      }
	      res.render( 'index', {
	          title : 'User List',
	          users : users,
	          searchName : req.body.searchName,
	          order : order
	      });
	    });
	};
*/	

exports.create = function ( req, res){	
	res.render( 'create', {title : 'Insert User'});
};

exports.insert = function ( req, res ){
  new User({
	user_no  : req.body.no,
    name     : req.body.name,
    email	 : req.body.email,
    birthday : req.body.birthday
  }).save( function( err, user, count ){
	  if(err){
		  console.log(err);
	  }
      res.redirect( '/' );
  });
};

exports.edit = function ( req, res ){
  var id = req.params.id;
  User.findOne({
	  _id :id,
  }, function(err, user){
	  if(err){
		  console.log(err);
	  }
	  res.render('edit',{
		  title: 'Edit User',
		  user: user
	  });
  });
   
};

exports.detail = function ( req, res ){
	  var id = req.params.id;
	  User.findOne({
		  _id :id,
	  }, function(err, user){
		  if(err){
			  console.log(err);
		  }
		  res.render('detail',{
			  title: 'User Detail',
			  user: user
		  });
	  });
	   
	};


exports.update = function ( req, res ){
  User.findById( req.body.id, function ( err, user ){
	if(err){
		 console.log(err);
	}
	user.user_no = req.body.no;
	user.name    = req.body.name;
	user.email   = req.body.email;
	user.birthday = req.body.birthday;
	user.save( function ( err, todo, count ){
	  if(err){
		  console.log(err);
	  }
	  res.redirect( '/' );
    });
  });
};


exports.destroy = function ( req, res ){
  User.findById( req.params.id, function ( err, user ){
    user.remove( function ( err, user ){
      res.redirect( '/' );
    });
  });
};