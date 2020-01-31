

// import _ from "lodash";  
const jwt = require('jsonwebtoken'); 
const passportJWT = require("passport-jwt");
const FB = require('fb'); 
const request = require('request');

const UserModel = require('./../users/model'); 
const CompanyModel = require('./../companies/model'); 
const AuthModel = require('./model');

const Utils = require('./../../utils/utils');
 
const ExtractJwt = passportJWT.ExtractJwt;
const util = new Utils();

class AuthService {

  doLogin(body){
	return new Promise( (resolve, reject) => {
	  	let { email, password } = body 
	  	UserModel.find( { email } , (err, user) => { 

	      if ( err ) { reject( err);  }
	      if ( !user.length || user.length < 1 ) { reject({ success:false, messages:["Usuário não encontrado"] }); return;}
	      	user = user.shift()   

	      	let vpass = util.decrypt(user.password); 
			    if( vpass == password ) {  
				    resolve( this.login(user) )
				} else {
				    reject({ success:false, messages:["Credenciais inválidas"] }) 
				} 

	  	}); 

	});
  }

  login(user){
  	return new Promise( async (resolve, reject) => {

      	let cuser = {
      		id: user.id,
      		name: user.name,
      		email: user.email 
		} 
		  
		let hasCompany = await this.getCompany(user.id)

		let jwtOptions = {}
		jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
		jwtOptions.secretOrKey = process.env.API_SECRET;
		
  		let payload = { id: user.id };
	    let minutes_token = ( 60 * 24 ) * 7; // 1 week
	    let token = jwt.sign(payload, jwtOptions.secretOrKey, { expiresIn: ( minutes_token * 60 ) } ); 

			    AuthModel
			    	.updateMany({
			    		$or:[
			    			{ 'users_id': user.id } 
			    		]
			    	}, 
	    			{ is_valid : false }, null,
           			(err, doc)=>{
                		if(err) reject({ success:false, messages:["DB Error"], error:err })
                    	// SAVE	TOKEN //
                    	let _pay = {
					    		token,
					    		is_valid: true,
					    		users_id: user.id
					    	} 
				    	new AuthModel( _pay ).save( (err, doc) => {
				            if(err){ reject(err); } 
				            resolve({ success:true , token, user:cuser, hasCompany });
				        });
					    ////////////////
        }) 
  	})
  }

  doLogout(req){
	return new Promise( (resolve, reject) => {  
	    AuthModel
    	.updateMany({ 'users_id': req.user.id }, 
    		{ is_valid : false }, null,
       		(err,doc)=>{
        		if(err) reject({ success:false, messages:["DB error"], error:err })
		    resolve({ success:true, message: "User logged out with Success" }) ;
    	}) 
	});
  }

	doFacebookLogin(body){
		return new Promise( (resolve, reject) => {
			let { access_token } = body   

			FB.options({
				version: 'v2.4', 
				appId: process.env.FACEBOOK_ID, 
				appSecret: process.env.FACEBOOK_SECRET
			});

			let self = this;
			FB.setAccessToken(access_token);
			FB.api('me', { fields: ['id', 'name', 'email'] }, function (res) {
					if(!res || res.error) { reject(!res ? 'error occurred' : res.error); return; }

					let email = res.email ? res.email : `${res.id}@facebook.com`;
					resolve(self.resolveSocialLogin(res, email, 'facebook_id', self))  

				}); 
			//
		})
	}

	doGoogleLogin(body){
		return new Promise( (resolve, reject) => {
			let { access_token } = body    
			let self = this;
			request.get({ 
				url:`https://www.googleapis.com/oauth2/v3/userinfo`, 
				headers: {
					'Authorization' : `Bearer ${ access_token }`
				}
			}, (error, response, body) => {
					if(response.statusCode === 200){
						let res = JSON.parse(body)
						let email = res.email ? res.email : `${res.id}@google.com`;
						resolve(self.resolveSocialLogin(res, email, 'google_id', self))  
					}else{
						reject({ success:false, messages:["Não foi possivel conectar com o Google, tente novamente mais tarde"]})
					} 
			})  
			//
		})
	}






	resolveSocialLogin(res, email, type, self){
		return new Promise((resolve, reject) => {
			if(!email){
				resolve({
					success:false
				})
			}else{
				UserModel.find( { email } , async (err, user) => { 
	  				if ( err ) { reject( err);  }
			      	if ( !user.length || user.length < 1 ) { 
						// need create

			      		let recovery_token = util.generateHash();

						let _create = {  
							name: res.name, 
							email: email,  
							[type]: res.id ? res.id : res.sub, 
							recovery_token
						};

						if(res.picture){ _create['image'] = res.picture ;}

						_create['password'] = `${ Math.random(100000) }`;
						let hash = util.encrypt(_create.password)  
						_create.password = hash;

						resolve(self.finishCreate(_create))
			      	}else{
			      		user = user.shift()   
			      		resolve(self.login(user))
			      	} 
	  			}); 
			}
		})
	}

	finishCreate(_create){
		return new Promise((resolve, reject) => {
			new UserModel(_create).save( (err, doc) => {
                if(err){ reject(err); return; } 
                UserModel.find({ email: _create.email } 
                	, (err, user) => { 
      				if ( err ) { reject( err);  }
			      	if ( !user.length || user.length < 1 ) { 
			      		reject({ success:false, messages:["Usuário não encontrado"] }); 
			      		return;
			      	}else{ 
			      		user = user.shift()   
			      		resolve(this.login(user))
			      	}
			      }) 
            }) 
		})
	}

	generateKey(){
		return new Promise((resolve, reject)=>{
			resolve({ 
				success:true,
				message:'Hash generated with Success',
				hash: util.generateHash()
			});
		})
	}


	forgot(req){ 
		let { email } = req.body 
		return new Promise( (resolve, reject) => {  
			UserModel.find( { email } , async (err, user) => { 

				if ( err ) { reject( err);  }
				if ( !user.length || user.length < 1 ) { reject({ success:false, messages:["Usuário não encontrado"] }); return;}
				user = user.shift()   
				
				let token = Math.floor(100000 + Math.random() * 900000); 
				
				try{
					let templateEmail = await util.emailMarketingTemplate('Recuperação de senha', `Seu código para recuperação é: <b>${ token }</b><br>Caso nao tenha solicitado esse email, descosidere-o`)
					await util.sendEmail(user.email, `${ process.env.APPLICATION_NAME } - Recuperação de senha`, templateEmail )
				}catch(error){ reject({ success:false, messages:["Usuário não encontrado"] }); return;}
				
				let _pay ={ recovery_token: token }
				UserModel.update({ email }, _pay, (err, result) => { 
					if(err){ reject({ success: false, err }); return; }
					resolve({ success: true, updated: _pay });
				});
	
			});   
		})  
	}

	password(req){ 
		let { code, password } = req.body 
		return new Promise( (resolve, reject) => {  
			UserModel.find( { recovery_token:`${ code }` } , async (err, user) => { 

				if ( err ) { reject( err);  }
				if ( !user.length || user.length < 1 ) { reject({ success:false, messages:["Código inválido ou já utilizado: "+ code] }); return;}
				user = user.shift()   

				let recovery_token = util.generateHash();  
				
				let _pay ={ recovery_token, password: util.encrypt(`${ password }`)   }
				UserModel.update({ _id: user._id }, _pay, (err, result) => { 
					if(err){ reject({ success: false, err }); return; } 
					resolve({ success: true  });
				});
	
			});   
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

module.exports = AuthService; 