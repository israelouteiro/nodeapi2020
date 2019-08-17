const express = require('express');
const router = express.Router();
 
const ExampleApi = require('./../src/example/api')

const exampleApi = new ExampleApi();   
 
router.get('/example', exampleApi.index); 
router.get('/example/:id', exampleApi.read); 
router.post('/example', exampleApi.store); 
router.put('/example/:id', exampleApi.update); 
router.delete('/example/:id', exampleApi.destroy); 

module.exports = router;
