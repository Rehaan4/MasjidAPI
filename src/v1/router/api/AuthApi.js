const { Router } = require('express');
const { adminRegister, adminLogin } = require('../../controllers/AuthController');

const AuthApi = new Router();

// Get all the ents
AuthApi.post('/adminRegister', adminRegister);
AuthApi.post('/adminLogin', adminLogin);

module.exports = AuthApi;
