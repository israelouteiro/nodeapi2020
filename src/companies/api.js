const CompaniesService = require('./service');

const companiesService = new CompaniesService();

class CompaniesApi { 
	
	index(req, res) {
		/**
		 * @api {get} /companies Read all `company` options
		 * @apiName ReadAllCompanies
		 * @apiGroup Companies
		 * @apiVersion 1.0.0 
		 *
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {Array} registers Array of all registers found  
		 * @apiSuccess {String} register.company_name Company Name 
		 * @apiSuccess {String} register.cnpj CNPJ
		 * @apiSuccess {String} register.zip_code ZipCode
		 * @apiSuccess {String} register.address_street Street Address
		 * @apiSuccess {String} register.address_city City
		 * @apiSuccess {String} register.address_state State
		 * @apiSuccess {String} register.address_number Number
		 * @apiSuccess {String} register.address_complement Complement
		 * @apiSuccess {String} register.amount_horses Horses quantity
		 * @apiSuccess {String} register.amount_trucks Trucks quantity
		 * @apiSuccess {String} register.observations Observations
		 * @apiSuccess {String} register.email Email
		 * @apiSuccess {String} register.phone Phone
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		 companiesService.readAll(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	} 
	
	read(req, res) {
		/**
		 * @api {get} /companies/:id Read specific `company` option
		 * @apiName ReadCompanies
		 * @apiGroup Companies
		 * @apiVersion 1.0.0
		 *
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {Object} register Object of specific register 
		 * @apiSuccess {String} register.company_name Company Name 
		 * @apiSuccess {String} register.cnpj CNPJ
		 * @apiSuccess {String} register.zip_code ZipCode
		 * @apiSuccess {String} register.address_street Street Address
		 * @apiSuccess {String} register.address_city City
		 * @apiSuccess {String} register.address_state State
		 * @apiSuccess {String} register.address_number Number
		 * @apiSuccess {String} register.address_complement Complement
		 * @apiSuccess {String} register.amount_horses Horses quantity
		 * @apiSuccess {String} register.amount_trucks Trucks quantity
		 * @apiSuccess {String} register.observations Observations
		 * @apiSuccess {String} register.email Email
		 * @apiSuccess {String} register.phone Phone
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		 companiesService.read(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}    

	store(req, res){
		/**
		 * @api {post} /companies Create new `company` option
		 * @apiName CreateCompanies
		 * @apiGroup Companies
		 * @apiVersion 1.0.0
		 *
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiParam {String} company_name Company Name to store 
		 * @apiParam {String} cnpj CNPJ to store 
		 * @apiParam {String} zip_code Zip Code to store 
		 * @apiParam {String} address_street Street Address to store 
		 * @apiParam {String} address_city City to store 
		 * @apiParam {String} address_state State to store 
		 * @apiParam {String} address_number Number to store 
		 * @apiParam {String} address_complement Complement to store 
		 * @apiParam {String} amount_horses Horses quantity to store 
		 * @apiParam {String} amount_trucks Trucks quantity to store 
		 * @apiParam {String} observations Observation to store 
		 * @apiParam {String} email Email to store 
		 * @apiParam {String} phone Phone to store 
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {String} inserted_id String of `_id` inserted  
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */

		companiesService.save(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}

	update(req, res) {
		/**
		 * @api {put} /companies/:id Update specific `company` option
		 * @apiName UpdateCompanies
		 * @apiGroup Companies
		 * @apiVersion 1.0.0
		 *
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiParam {String} [company_name] Company Name to update 
		 * @apiParam {String} [cnpj] CNPJ to update 
		 * @apiParam {String} [zip_code] Zip Code to update 
		 * @apiParam {String} [address_street] Zip Code to update 
		 * @apiParam {String} [address_city] City to update 
		 * @apiParam {String} [address_state] State to update 
		 * @apiParam {String} [address_number] Number to update 
		 * @apiParam {String} [address_complement] Complement to update 
		 * @apiParam {String} [amount_horses] Horses quantity to update 
		 * @apiParam {String} [amount_trucks] Trucks quantity to update 
		 * @apiParam {String} [observations] Observation to update 
		 * @apiParam {String} [email] Email to update 
		 * @apiParam {String} [phone] Phone to update 
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {Object} updated Object with updated fields  
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		 companiesService.update(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}  

	destroy(req, res) {
		/**
		 * @api {delete} /companies/:id Delete specific `company` option
		 * @apiName DeleteCompanies
		 * @apiGroup Companies
		 * @apiVersion 1.0.0 
		 *
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiSuccess {Boolean} success 
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */
		companiesService.delete(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}  

	find(req, res){
		/**
		 * @api {post} /companies/cnpj Find `company` by CNPJ
		 * @apiName FindCompanies
		 * @apiGroup Companies
		 * @apiVersion 1.0.0
		 * 
		 * @apiParam {String} cnpj CNPJ to find company  
		 *
		 * @apiSuccess {Boolean} success
		 * @apiSuccess {String} company_name 
		 * @apiSuccess {String} cnpj 
		 * @apiSuccess {String} zip_code  
		 * @apiSuccess {String} address_street   
		 * @apiSuccess {String} address_city  
		 * @apiSuccess {String} address_state  
		 * @apiSuccess {String} address_number 
		 * @apiSuccess {String} address_complement  
		 *
		 * @apiError {Boolean} success 
		 * @apiError {Array} err Error object
		 *
		 */

		companiesService.find(req)
			.then( response => { res.send(response); })
			.catch( err => { res.status(400).send(err); })
	}


}


module.exports = CompaniesApi;