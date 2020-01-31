const UsersService = require('./service');

const usersService = new UsersService();

class UsersApi { 
	
	index(req, res) {
		/**
		 * @api {get} /users Read all `user` options
		 * @apiName ReadAllUser
		 * @apiGroup User
		 * @apiVersion 1.0.0 
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {Array} registers Array of all registers found  
		 * @apiSuccess {String} register.name Name 
		 * @apiSuccess {String} register.email Email
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		 usersService.readAll(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	} 
	
	read(req, res) {
		/**
		 * @api {get} /users/:id Read specific `user` option
		 * @apiName ReadUser
		 * @apiGroup User
		 * @apiVersion 1.0.0
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {Object} register Object of specific register 
		 * @apiSuccess {String} register.name Name 
		 * @apiSuccess {String} register.email Email
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		 usersService.read(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}    
	
	readMe(req, res) {
		/**
		 * @api {get} /users/me Read My `user` option
		 * @apiName ReadUserMe
		 * @apiGroup User
		 * @apiVersion 1.0.0 
		 *
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {Object} register Object of specific register 
		 * @apiSuccess {String} register.name Name 
		 * @apiSuccess {String} register.email Email
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		 usersService.readMe(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}    

	store(req, res){
		/**
		 * @api {post} /users Create new `user` option
		 * @apiName CreateUser
		 * @apiGroup User
		 * @apiVersion 1.0.0
		 *
		 * @apiParam {String} name Name to store 
		 * @apiParam {String} email Email to store 
		 * @apiParam {String} password Password to store 
		 * @apiParam {String} image Image to store 
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {String} inserted_id String of `_id` inserted  
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */

		usersService.save(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}

	update(req, res) {
		/**
		 * @api {put} /users/:id Update specific `user` option
		 * @apiName UpdateUser
		 * @apiGroup User
		 * @apiVersion 1.0.0
		 *
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiParam {String} [name] Name to update 
		 * @apiParam {String} [email] Email to update 
		 * @apiParam {String} [image] Image to update 
		 * @apiParam {String} [password] Password to update 
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {Object} updated Object with updated fields  
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		 usersService.update(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}  

	destroy(req, res) {
		/**
		 * @api {delete} /users/:id Delete specific `user` option
		 * @apiName DeleteUser
		 * @apiGroup User
		 * @apiVersion 1.0.0 
		 *  
		 * @apiSuccess {Boolean} success 
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		usersService.delete(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}  
}


module.exports = UsersApi;