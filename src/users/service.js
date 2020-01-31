const UsersModel = require('./model');
const Utils = require('./../../utils/utils')
const CompanyModel = require('./../companies/model'); 

const utils = new Utils()

class UsersService {

	save(req){
		let { name, email, password, image } = req.body;  

		let _pay = { name, email, password:utils.encrypt(password), image, recovery_token: utils.generateHash() } 
		return new Promise((resolve, reject) => {   
			UsersModel.findOne({ email }, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
				if(result){ reject({ success: false, message:'Email já está cadastrado' }); return; }
				new UsersModel( _pay ).save((err, doc) => {
					if(err){ reject({ success: false, err }); return; }
					resolve({ success: true, inserted_id: doc._id });
				})   
			})   
		}) 
	}

	read(req){ 
		let _id = req.params.id;  
		return new Promise((resolve, reject) => {   
			UsersModel.findOne({ _id }, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true, register: result });
			})  
		}) 
	}
	
	readMe(req){ 
		let _id = req.user.id;  
		return new Promise((resolve, reject) => {   
			UsersModel.findOne({ _id }, async (err, result) => { 
				if(err){ reject({ success: false, err }); return; }
				let hasCompany = await this.getCompany(req.user.id)
                resolve({ success: true, register: result, hasCompany });
			})  
		}) 
	}

	readAll(req){  
		return new Promise((resolve, reject) => {   
			UsersModel.find({  }, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true, registers: result });
			})  
		}) 
	}

	update(req){
		let { name, email, password, image } = req.body; 
		let _pay = { }

		if( name !== undefined ){ _pay['name'] = name ;}
		if( email !== undefined ){ _pay['email'] = email ;}
		if( image !== undefined ){ _pay['image'] = image ;}
		if( password !== undefined ){   _pay['password'] = utils.encrypt(password) ; }

		return new Promise((resolve, reject) => {  
			UsersModel.update({ _id: req.user.id }, _pay, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true, updated: _pay });
			})   
		}) 
	}

	delete(req){
		let _id = req.params.id;  
		console.log(_id)
		return new Promise((resolve, reject) => {   
			UsersModel.remove({ _id }, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true });
			})  
		}) 
	}

	getCompany(users_id){
		return new Promise((resolve, reject) => {
			CompanyModel.find({ users_id }, (err, doc) => { 
				  if ( err ) { reject( err);  }
				  	if ( !doc.length || doc.length < 1 ) { 
					  	resolve(false)
					}else{ 
						resolve(doc[0]) 
				  	}
			  }) 
		})
	}

}

module.exports = UsersService;