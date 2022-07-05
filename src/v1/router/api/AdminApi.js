const { Router } = require('express');
const { getAllAdmins } = require('../../controllers/AdminController');

const AuthApi = new Router();

// Get all the ents
AuthApi.get('/getAllAdmins', getAllAdmins);

module.exports = AuthApi;
