/* eslint-disable max-len */
const { Router } = require('express');
const {
  getAllMasjid, getMasjid, getNearMasjid, getAreaMasjids, addMasjid, updateMasjid, deleteMasjid, getMasjidByAreaSearch,
} = require('../../controllers/MasjidController');

const MasjidApi = new Router();

// Get all the masjids
MasjidApi.get('/getAllMasjid', getAllMasjid);

// Get all the masjids
MasjidApi.get('/getMasjid/:masjidName', getMasjid);

// Get all the masjids according to users location
MasjidApi.post('/getNearMasjids', getNearMasjid);

// Get all the masjids according to users location
MasjidApi.post('/getAreaMasjids', getAreaMasjids);

// Get all the masjids according to user  address entered
MasjidApi.get('/getMasjidByAreaSearch/:address', getMasjidByAreaSearch);

// Add new Masjid
MasjidApi.post('/addMasjid', addMasjid);

// Update Masjid
MasjidApi.put('/updateMasjid/:id', updateMasjid);

// Delete Masjid
MasjidApi.delete('/deleteMasjid/:id', deleteMasjid);

module.exports = MasjidApi;
