/* eslint-disable max-len */
const { Router } = require('express');
const {
  getTimingByMasjid, getTimingById, addTiming, deleteNamaz, updateTiming, deleteTiming, updateNamaz, getTimingByDateRange, getTimingByDate,
} = require('../../controllers/TimingController');

const TimingsApi = new Router();

// Get the timings of a masjid.
TimingsApi.get('/getTimingByMasjid/:masjidId', getTimingByMasjid);

// Get the timings by Id.
TimingsApi.get('/getTimingById/:timingId', getTimingById);

// Get the timings of a masjid.
TimingsApi.get('/getTimingByDate', getTimingByDate);

// Get the timings of a masjid.
TimingsApi.get('/getTimingByDateRange/:masjidId', getTimingByDateRange);

// Add new Timings
TimingsApi.post('/addTiming', addTiming);

// Update Timings
TimingsApi.put('/updateTiming/:timingId', updateTiming);

// Update Namaz
TimingsApi.put('/updateNamaz/:id', updateNamaz);

// Delete Namaz
TimingsApi.put('/deleteNamaz/:id', deleteNamaz);

// Delete Timings
TimingsApi.delete('/deleteTiming/:timingId', deleteTiming);

module.exports = TimingsApi;
