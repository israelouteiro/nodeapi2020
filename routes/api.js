const express = require('express');
const router = express.Router();
const passport = require('passport'); 
 
const UsersApi = require('./../src/users/api')
const OAuthApi = require('./../src/oauth/api')
const UploadApi = require('./../src/upload/api')
const CompaniesApi = require('./../src/companies/api')

const usersApi = new UsersApi();   
const oauthApi = new OAuthApi();   
const uploadApi = new UploadApi();   
const companiesApi = new CompaniesApi();   
 
router.post('/users', usersApi.store); 

router.post('/login', oauthApi.login); 
router.post('/forgot', oauthApi.forgot); 
router.post('/password', oauthApi.password); 
router.post('/login/facebook', oauthApi.facebook_login); 
router.post('/login/google', oauthApi.google_login); 
router.get('/hash', oauthApi.generateKey); 

router.post('/companies/cnpj', companiesApi.find);

/*
 *
 *	Authenticated routes
 *  
 */  

router.get('/logout', passport.authenticate('jwt', { session: false }), oauthApi.logout); 

router.get('/users/me', passport.authenticate('jwt', { session: false }), usersApi.readMe); 
router.put('/users', passport.authenticate('jwt', { session: false }), usersApi.update); 

// router.get('/users', passport.authenticate('jwt', { session: false }), usersApi.index); 
// router.get('/users/:id', passport.authenticate('jwt', { session: false }), usersApi.read); 
// router.delete('/users/:id', passport.authenticate('jwt', { session: false }), usersApi.destroy); 
 
router.get('/companies', passport.authenticate('jwt', { session: false }), companiesApi.index); 
router.get('/companies/:id', passport.authenticate('jwt', { session: false }), companiesApi.read); 
router.post('/companies', passport.authenticate('jwt', { session: false }), companiesApi.store); 
router.put('/companies/:id', passport.authenticate('jwt', { session: false }), companiesApi.update); 
router.delete('/companies/:id', passport.authenticate('jwt', { session: false }), companiesApi.destroy); 


router.post('/upload/image', passport.authenticate('jwt', { session: false }), uploadApi.uploadImage); 
router.post('/upload/file', passport.authenticate('jwt', { session: false }), uploadApi.uploadFile); 
router.post('/upload/convert/docx', passport.authenticate('jwt', { session: false }), uploadApi.convertDocx); 
router.post('/upload/convert/pdf', passport.authenticate('jwt', { session: false }), uploadApi.convertPdf); 


module.exports = router;
