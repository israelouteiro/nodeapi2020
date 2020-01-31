const UploadModel = require('./model');
const multer = require('multer'); 

class UploadService {


	uploadImage(req, res){  
		return new Promise( (resolve, reject) => { 

			let DIR = './public/uploads/images/'; 
			let storage = multer.diskStorage({
				  destination: (req, file, cb) => {
				    cb(null, DIR )
				  },
				  filename: (req, file, cb) => {
				  	let extension = file.originalname.split('.').pop();
				    cb(null, file.originalname.replace(/\ /g, '') ) 
				  }
			})
			let post_param = 'image'
			let upload = multer({ storage }).single(post_param);  
			let self = this
			upload(req, res, function (err) {
		        if (err) {   
		         	resolve( self.createDestFirst(req, res, DIR, post_param) ); 
		          return false;
		        }    
		        // Response User
				let source = req.file.path.replace('public/','');
			        resolve({
			        	success: true, 
			        	source
			        }); 
					 
			}); 
		})
	}




	createDestFirst(req, res, DIR, post_param){ 
		return new Promise( (resolve, reject) => {  
			let upload = multer({ dest: DIR }).single(post_param);
			let self = this
			let kueer = post_param == 'image' 	
				? 'upload_image_error' : 'upload_error'
			upload(req, res, function (err) {
		        if (err) {  
		          reject({
		          	success:false,
		          	error: err, 
		          })
		          return false;
		        }    
		        reject({ success:false }); 
		  	}); 
		}) 
	}




	uploadFile(req, res){  
		return new Promise( (resolve, reject) => { 

			let DIR = './public/uploads/files/'; 
			let storage = multer.diskStorage({
				  destination: (req, file, cb) => {
				    cb(null, DIR )
				  },
				  filename: (req, file, cb) => { 
				  	let extension = file.originalname.split('.').pop();
				    cb(null, `${ Date.now() }.${ extension }`) 
				  }
			})

			let post_param = 'file'
			let upload = multer({ storage }).single(post_param);  
			let self = this
			upload(req, res, function (err) {
		        if (err) {   
		         	resolve( self.createDestFirst(req, res, DIR, post_param) ); 
		          	return false;
		        }   
		        let source = req.file.path.replace('public/',''); 
		        resolve({
		        	success:true,
		        	source
		        }); 
			}); 
		})
	}



	convertDocx(req, res){
		return new Promise((resolve, reject) => {
			const mammoth = require("mammoth");

			let options = {
			    convertImage: mammoth.images.imgElement(function(image) {
			        return image.read("base64").then(function(imageBuffer) {
			            return {
			                src: "data:" + image.contentType + ";base64," + imageBuffer,
			                alt:"image"
			            };
			        });
			    })
			};

			mammoth.convertToHtml({path: __dirname+'/../../public/'+req.body.url }, options)
			    .then(function(result){
			        let html = result.value; 
			        let messages = result.messages; 

			        resolve({
						success:true,
						html
					})

			    }) 

		})
	}




	convertPdf(req, res){
		return new Promise((resolve, reject) => {
			const pdf2html = require("pdf2html");
			pdf2html.html( __dirname+'/../../public/'+req.body.url, function(err, html){ 
					if(err){ reject(err);  }
			        resolve({	
						success:true,
						html
					})
			    }) 

		})
	}




}

module.exports = UploadService;