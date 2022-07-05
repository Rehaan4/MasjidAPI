const Event = require('../model/EventSchema');
const { EventSchema } = require('../../../helpers/validation_schema');

// @desc get all the masjid
// @route GET /api/v1/events/getAllEvent
// @access Public
exports.getAllEvents = async (req, res) => {
  try {
    const data = await Event.find({});

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc get all the events of certain masjids.
// @route Post /api/v1/masjid/getNearByEvents
// @access Public
exports.getEventsByMasjid = async (req, res) => {
  try {
    const events = await Event.find({
      masjidId: {
        $in: req.body,
      },
    }, {
      masjidId: 0, createdAt: 0, updatedAt: 0, __v: 0,
    });

    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// same but her we will fetch by location.
// @desc get all the events of certain masjids.
// @route Post /api/v1/masjid/getNearByEvents
// @access Public
exports.getNearByEvents = async (req, res) => {
  try {
    const distance = req.body.distanceType === 'Miles' ? req.body.distance * 1609 : req.body.distance * 1000;

    const events = await Event.find({
      location:
                {
                  $near:
                   {
                     $geometry:
                       {
                         type: 'Point', coordinates: req.body.coordinates,
                       },
                     $maxDistance: distance,
                   },
                },
    }, {
      createdAt: 0, updatedAt: 0, __v: 0,
    });

    if (events.length > 0) {
      return res.status(200).json({
        success: true,
        count: events.length,
        data: events,
      });
    }

    return res.status(404).json({
      success: false,
      message: " No Event's Found",
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

// @desc Create a event
// @route POST  /api/v1/event/addEvent
// @access Public
exports.addEvent = async (req, res) => {
  try {
    // const result = await EventSchema.validateAsync(req.body);

    const event = await Event.create(req.body);

    return res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(501).json({ error: 'This Event already exists' });
    }

    if (error.isJoi === true) {
      return res.status(422).json({ error: "The details doesn't match the pattern,Please check and try again" });
    }
    return res.status(501).json({ error: error.message });
  }
};

// @desc update  the event details.
// @route GET /api/v1/event/updateEvent/:eventId
// @access Public
exports.updateEvent = async (req, res) => {
  try {
    const result = await EventSchema.validateAsync(req.body);

    await Event.findByIdAndUpdate(req.params.id, {
      $set: result,
    });

    const updatedEvent = await Event.findById(req.params.id);

    return res.status(200).json({
      success: true,
      data: updatedEvent,
    });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({ error: "The details doesn't match the pattern,Please check and try again" });
    }
    return res.status(501).json({ error: error.message });
  }
};

// @desc delete an event
// @route DELETE /api/v1/event/deleteEvent/:eventId
// @access Public
exports.deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndRemove(req.params.id);

    return res.status(200).json({
      success: true,
      data: 'The Event has been removed from the Database',
    });
  } catch (error) {
    return res.status(501).json({ error: "Couldn't Find the Event" });
  }
};
