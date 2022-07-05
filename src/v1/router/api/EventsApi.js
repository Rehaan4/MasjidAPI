const { Router } = require('express');
const {
  getAllEvents, addEvent, updateEvent, deleteEvent, getNearByEvents, getEventsByMasjid,
} = require('../../controllers/EventController');

const EventsApi = new Router();

// Get all the events
EventsApi.get('/getAllEvents', getAllEvents);

// Get the events according to the location
EventsApi.post('/getNearByEvents', getNearByEvents);

// Get the events according to the nearby masjids
EventsApi.post('/getEventsByMasjid', getEventsByMasjid);

// Add new Event
EventsApi.post('/addEvent', addEvent);

// Update an Event
EventsApi.put('/updateEvent/:id', updateEvent);

// Delete an Event
EventsApi.delete('/deleteEvent/:id', deleteEvent);

module.exports = EventsApi;
