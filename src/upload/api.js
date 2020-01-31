const UploadService = require('./service');

const uploadService = new UploadService();

class UploadApi {  

	uploadImage(req, res) {
		/**
		 * @api {post} /upload/image Update image
		 * @apiName UploadImage
		 * @apiGroup Upload
		 * @apiVersion 1.0.0
		 *
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiParam {File} [image] File to upload 
		 *
		 * @apiSuccess {String} status Status of request ( Success )
		 * @apiSuccess {String} source Image source
		 *
		 * @apiError {String} status Status of request ( Error )
		 * @apiError {String} messages Messages about status
		 *
		 */ 
 

		 uploadService.uploadImage(req, res)
			.then( response => {
				res.send(response) 
			}).catch( err => {
				res.status(400).send(err)
			})
	}  

	uploadFile(req, res) {
		/**
		 * @api {post} /upload/file Update file
		 * @apiName UploadFile
		 * @apiGroup Upload
		 * @apiVersion 1.0.0
		 *
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiParam {File} [file] File to upload 
		 *
		 * @apiSuccess {String} status Status of request ( Success )
		 * @apiSuccess {String} source Image source
		 *
		 * @apiError {String} status Status of request ( Error )
		 * @apiError {String} messages Messages about status
		 *
		 */ 
		 uploadService.uploadFile(req, res)
			.then( response => {
				res.send(response) 
			}).catch( err => {
				res.status(400).send(err)
			})
	}  

	convertDocx(req, res) {
		/**
		 * @api {post} /upload/convert/docx Convert DOCX
		 * @apiName Convert DOCX
		 * @apiGroup Upload
		 * @apiVersion 1.0.0
		 *
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiParam {File} [file] File to upload 
		 *
		 * @apiSuccess {String} status Status of request ( Success )
		 * @apiSuccess {String} source Image source
		 *
		 * @apiError {String} status Status of request ( Error )
		 * @apiError {String} messages Messages about status
		 *
		 */ 
		 uploadService.convertDocx(req, res)
			.then( response => {
				res.send(response) 
			}).catch( err => {
				res.status(400).send(err)
			})
	}  


	convertPdf(req, res) {
		/**
		 * @api {post} /upload/convert/pdf Convert PDF
		 * @apiName Convert PDF
		 * @apiGroup Upload
		 * @apiVersion 1.0.0
		 *
		 * @apiHeader {String} authorization `Bearer {{ ACCESS_TOKEN }}`.
		 *
		 * @apiParam {File} [file] File to upload 
		 *
		 * @apiSuccess {String} status Status of request ( Success )
		 * @apiSuccess {String} source Image source
		 *
		 * @apiError {String} status Status of request ( Error )
		 * @apiError {String} messages Messages about status
		 *
		 */ 
		 uploadService.convertPdf(req, res)
			.then( response => {
				res.send(response) 
			}).catch( err => {
				res.status(400).send(err)
			})
	}  

}

module.exports = UploadApi;