
const AuthService = require('./services');

const authService = new AuthService();

class OAuthApi {

	login(req, res) { 

		/**
		 * @api {post} /login User Login 
		 * @apiName LoginUser
		 * @apiGroup OAuth
		 * @apiVersion 1.0.0
		 *
		 * @apiParam {String} email Email of User
		 * @apiParam {String} password Password of User  
		 *
		 * @apiSuccess {Boolean} success Status of request
		 * @apiSuccess {String} message A message about status
		 * @apiSuccess {String} token User token
		 * @apiSuccess {Object} user User object
		 * @apiSuccess {String} user.name Name of user
		 * @apiSuccess {String} user.email Email of user   
		 *
		 * @apiError {String} status Status of request ( Error )
		 * @apiError {String} messages Messages about status
		 *
		 */

		authService.doLogin(req.body)
		  .then((response)=>{
		  	res.json(response)
		}).catch((err)=>{  
		  	res.status(401).json(err)
		})
	}


	facebook_login(req, res) { 

		/**
		 * @api {post} /login/facebook User Facebook Login 
		 * @apiName LoginUserFacebook
		 * @apiGroup OAuth
		 * @apiVersion 1.0.0
		 *
		 * @apiParam {String} access_token Facebook token 
		 *
		 * @apiSuccess {Boolean} success Status of request
		 * @apiSuccess {String} message A message about status
		 * @apiSuccess {String} token User token
		 * @apiSuccess {Object} user User object
		 * @apiSuccess {String} user.name Name of user
		 * @apiSuccess {String} user.email Email of user   
		 *
		 * @apiError {String} status Status of request ( Error )
		 * @apiError {String} messages Messages about status
		 *
		 */

		authService.doFacebookLogin(req.body)
		  .then((response)=>{
		  	res.json(response)
		}).catch((err)=>{  
		  	res.status(401).json(err)
		})
	}

	google_login(req, res) { 

		/**
		 * @api {post} /login/google User Google Login 
		 * @apiName LoginUserGoogle
		 * @apiGroup OAuth
		 * @apiVersion 1.0.0
		 *
		 * @apiParam {String} access_token Google token 
		 *
		 * @apiSuccess {Boolean} success Status of request
		 * @apiSuccess {String} message A message about status
		 * @apiSuccess {String} token User token
		 * @apiSuccess {Object} user User object
		 * @apiSuccess {String} user.name Name of user
		 * @apiSuccess {String} user.email Email of user   
		 *
		 * @apiError {String} status Status of request ( Error )
		 * @apiError {String} messages Messages about status
		 *
		 */

		authService.doGoogleLogin(req.body)
		  .then((response)=>{
		  	res.json(response)
		}).catch((err)=>{  
		  	res.status(401).json(err)
		})
	}

	logout(req, res) { 

		/**
		 * @api {get} /logout User Logout 
		 * @apiName LogoutUser
		 * @apiGroup OAuth
		 * @apiVersion 1.0.0
		 * 
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiSuccess {Boolean} success Status of request
		 * @apiSuccess {String} message A message about status  
		 *
		 * @apiError {String} status Status of request ( Error )
		 * @apiError {String} messages Messages about status
		 *
		 */

		authService.doLogout(req)
		  .then((response)=>{
		  	res.json(response)
		}).catch((err)=>{  
		  	res.status(401).json(err)
		})
	}

	forgot(req, res) { 

		/**
		 * @api {post} /forgot User Forgot 
		 * @apiName ForgotUser
		 * @apiGroup OAuth
		 * @apiVersion 1.0.0
		 *
		 * @apiParam {String} email Email to recovery
		 *
		 * @apiSuccess {Boolean} success Status of request
		 * @apiSuccess {String} message A message about status  
		 *
		 * @apiError {String} status Status of request ( Error )
		 * @apiError {String} messages Messages about status
		 *
		 */

		authService.forgot(req)
		  .then((response)=>{
		  	res.json(response)
		}).catch((err)=>{  
		  	res.status(401).json(err)
		})
	}

	password(req, res) { 

		/**
		 * @api {post} /password Create password 
		 * @apiName CreatePasswordUser
		 * @apiGroup OAuth
		 * @apiVersion 1.0.0
		 *
		 * @apiParam {String} code Code to authorize
		 * @apiParam {String} password Password to update
		 *
		 * @apiSuccess {Boolean} success Status of request   
		 *
		 * @apiError {String} status Status of request ( Error )
		 * @apiError {String} messages Messages about status
		 *
		 */

		authService.password(req)
		  .then((response)=>{
		  	res.json(response)
		}).catch((err)=>{  
		  	res.status(401).json(err)
		})
	}

	generateKey(req, res){

		/**
		 * @api {get} /hash Get a generic Hash
		 * @apiName GetHash
		 * @apiGroup System
		 * @apiVersion 1.0.0 
		 *
		 * @apiSuccess {Boolean} success Status of request
		 * @apiSuccess {String} message A message about status  
		 * @apiSuccess {String} hash Hash generated  
		 *
		 * @apiError {String} status Status of request ( Error )
		 * @apiError {String} messages Messages about status
		 *
		 */

		authService.generateKey()
		  .then((response)=>{
			res.json(response)
		}).catch((err)=>{
			res.status(400).json(err)
		})
	}

}


module.exports = OAuthApi; 