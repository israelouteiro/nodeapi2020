const ExampleService = require('./service');

const exampleService = new ExampleService();

class ExampleApi { 
	
	index(req, res) {
		/**
		 * @api {get} /example 2 Read all `example` options
		 * @apiName ReadAllExample
		 * @apiGroup Example
		 * @apiVersion 1.0.0 
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {Array} registers Array of all registers found  
		 * @apiSuccess {String} register.field Field value 
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		 exampleService.readAll(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	} 
	
	read(req, res) {
		/**
		 * @api {get} /example/:id 2.1 Read specific `example` option
		 * @apiName ReadExample
		 * @apiGroup Example
		 * @apiVersion 1.0.0
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {Object} register Object of specific register 
		 * @apiSuccess {String} register.field Field value 
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		 exampleService.read(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}    

	store(req, res){
		/**
		 * @api {post} /example 1 Create new `example` option
		 * @apiName CreateExample
		 * @apiGroup Example
		 * @apiVersion 1.0.0
		 *
		 * @apiParam {String} field Field to store 
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {String} inserted_id String of `_id` inserted  
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */

		exampleService.save(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}

	update(req, res) {
		/**
		 * @api {put} /example/:id 3 Update specific `example` option
		 * @apiName UpdateExample
		 * @apiGroup Example
		 * @apiVersion 1.0.0
		 *
		 * @apiParam {String} [field] Field to update 
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {Object} updated Object with updated fields  
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		 exampleService.update(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}  

	destroy(req, res) {
		/**
		 * @api {delete} /example/:id 4 Delete specific `example` option
		 * @apiName DeleteExample
		 * @apiGroup Example
		 * @apiVersion 1.0.0 
		 *  
		 * @apiSuccess {Boolean} success 
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		exampleService.delete(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}  
}


module.exports = ExampleApi;