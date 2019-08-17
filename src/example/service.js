const ExampleModel = require('./model');
 
class ExampleService {

	save(req){
		let { field } = req.body; 
		let _pay = { field } 
		return new Promise((resolve, reject) => {  
			new ExampleModel( _pay ).save((err, doc) => {
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true, inserted_id: doc._id });
			})  
		}) 
	}

	read(req){ 
		let _id = req.params.id;  
		return new Promise((resolve, reject) => {   
			ExampleModel.findOne({ _id }, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true, register: result });
			})  
		}) 
	}

	readAll(req){  
		return new Promise((resolve, reject) => {   
			ExampleModel.find({  }, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true, registers: result });
			})  
		}) 
	}

	update(req){
		let { field } = req.body; 
		let _pay = { }

		if( field !== undefined ){ _pay['field'] = field ;}

		return new Promise((resolve, reject) => {  
			ExampleModel.find({  }, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true, updated: _pay });
			})   
		}) 
	}

	delete(req){
		let _id = req.params.id;  
		console.log(_id)
		return new Promise((resolve, reject) => {   
			ExampleModel.remove({ _id }, (err, result) => { 
	            if(err){ reject({ success: false, err }); return; }
                resolve({ success: true });
			})  
		}) 
	}

}

module.exports = ExampleService;