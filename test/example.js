const assert = require('assert');
const should = require('should');
const request = require('request');
const expect = require('chai').expect;
const util = require("util");

let baseUrl = `http://localhost:3000/api/`;

const create = () => {  
	return new Promise((resolve, reject)=>{   
		let _payload = {  field:'israelouteiro' };
		request.post({ url:`${ baseUrl }example`, form: _payload }, ( error, response, body ) => {
			resolve({ _id: JSON.parse(body).inserted_id, response }); 
		})
	})  
} 

 
const readAll = ( done ) => {   
	request.get({ url:`${ baseUrl }example` }, (error,response,body) => {
			expect(response.statusCode).to.equal(200); 
		done();
	}) 
}  

const read = ( _id, done ) => {   
	request.get({ url:`${ baseUrl }example/${ _id }` }, (error,response,body) => {
			expect(response.statusCode).to.equal(200); 
		done();
	}) 
} 
 
const update = ( _id, done ) => {  
	let _payload = { field:'israelouteiro.com' }
	request.put({ url: `${ baseUrl }example/${ _id }`, form: _payload }, (error,response,body) => {
			expect(response.statusCode).to.equal(200); 
		done();
	}) 
} 
 
const destroy = ( _id, done ) => {   
	request.delete({ url:`${ baseUrl }example/${ _id }` }, ( error, response, body ) => {
			expect(response.statusCode).to.equal(200); 
		done();
	})
} 


describe('Examples', () => { 

	let _id = ``
	
	it('Create example', async () => { 
		let result = await create()
		_id = result._id;
		expect(result.response.statusCode).to.equal(200);   
	})  

	it('Read all example', (done) => {  
		readAll(done);   
	});

	it('Read example', (done) => {  
		read(_id, done);   
	}); 

	it('Update example', (done) => {  
		update(_id, done);   
	});

	it('Delete example', (done) => {  
		destroy(_id, done);   
	});
})