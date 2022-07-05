/* eslint-disable no-undef */
const Timing = require('../model/TimingSchema');
// const { TimingSchema } = require('../../../helpers/validation_schema');

// @desc get the timings according to the Timing.
// @route GET /api/v1/timings/getTiming/:MasjidId
// @access Public
exports.getTimingByMasjid = async (req, res) => {
  try {
    const timings = await Timing.find({ masjidId: req.params.masjidId }, {
      masjidId: 0, createdAt: 0, updatedAt: 0, __v: 0,
    });

    if (timings.length > 0) {
      return res.status(200).json({
        success: true,
        count: timings.length,
        data: timings,
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Not Found',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc get the timings according to the Timing.
// @route GET /api/v1/timings/getTimingByDate/:date
// @access Public
exports.getTimingByDate = async (req, res) => {
  try {
    const date = new Date(req.query.date);
    const timings = await Timing.find({ date }, {
      masjidId: 0, createdAt: 0, updatedAt: 0, __v: 0,
    });

    if (timings.length > 0) {
      return res.status(200).json({
        success: true,
        count: timings.length,
        data: timings,
      });
    }

    return res.status(500).json({
      success: false,
      message: 'No Timings Available for that date',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc get all the date from the range.
// @route GET /api/v1/entries/getEntryByDateRange
// @access Public
exports.getTimingByDateRange = async (req, res) => {
  try {
    const startDate = new Date(req.query.startDate);

    const timings = await Timing.find({
      date:
                {
                  $gte: startDate,
                },

      masjidId: req.params.masjidId,
    }, {
      masjidId: 0, createdAt: 0, updatedAt: 0, __v: 0,
    }).sort({ arrivingDate: 'asc' });

    if (timings.length > 0) {
      return res.status(200).json({
        success: true,
        count: timings.length,
        masjidId: req.params.masjidId,
        data: timings,
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Not Found',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// @desc Create  the timings
// @route POST  /api/v1/timings/addTiming
// @access Public
exports.addTiming = async (req, res) => {
  try {
    const timings = await Timing.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Masjid timings successfully Created.',
      data: timings,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(501).json({ error: 'This timings for that date already exists' });
    }

    return res.status(502).json({ error: error.message });
  }
};

// @desc update  the timings
// @route PUT/api/v1/timings/updateTiming/:timingId
// @access Public
exports.updateTiming = async (req, res) => {
  try {
    const updatedTiming = await Timing.updateOne(

      {
        _id: req.params.timingId,
        'timings.namazName': req.body.namazName,
      },
      {
        $set: {
          'timings.$.azaanTime': req.body.azaanTime,
          'timings.$.jamaatTime': req.body.jamaatTime,
        },
      },
      { _id: 0 },

    );
    if (updatedTiming.modifiedCount > 0) {
      const timings = await Timing.find({ _id: req.params.timingId }, {
        createdAt: 0, updatedAt: 0, __v: 0,
      });
      if (updatedTiming) {
        return res.status(200).json({
          success: true,
          data: timings,
        });
      }
    } else {
      return res.status(500).json({ message: 'Couldnt Find Namaz,Please Check and Try again' });
    }

    return res.status(500).json({ message: 'The Timing is not found' });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

// @desc update  the Namaz
// @route PUT/api/v1/timings/updateNamaz/:id
// @access Public
exports.updateNamaz = async (req, res) => {
  try {
    const namaz = await Timing.find(

      {
        'timings.namazName': req.body.namazName,
        _id: req.params.id,
      },
      {
        masjidId: 0, createdAt: 0, updatedAt: 0, __v: 0,
      },
    );
    if (!namaz.length > 0) {
      const data = await Timing.updateOne(

        { _id: req.params.id },
        {
          $push: {
            timings: req.body,
          },
        },
        { _id: 0 },

      );
      if (data.modifiedCount > 0) {
        const timings = await Timing.find({ _id: req.params.timingId }, {
          createdAt: 0, updatedAt: 0, __v: 0,
        });

        return res.status(200).json({
          success: true,
          data: timings,
          message: 'The new Namaz has been added.',
        });
      }
    } else {
      return res.status(500).json({ message: 'Namaz Already Exists' });
    }

    return res.status(404).json({ message: 'Namaz Not Found, Please check the Id' });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

// @desc delete a  Namaz
// @route PUT/api/v1/timings/updateNamaz/:id
// @access Public
exports.deleteNamaz = async (req, res) => {
  try {
    const NamazId = req.params.id;
    const data = await Timing.updateOne(

      {
        _id: req.body.timingsId,
      },
      {
        $pull: {
          timings:
                      {
                        _id: NamazId,
                      },
        },
      },
    );

    if (data.modifiedCount > 0) {
      return res.status(200).json({
        success: true,
        id: NamazId,
        message: 'The new Timings has been removed.',
      });
    }

    return res.status(404).json({ message: 'Namaz Not Found, Please check the Id' });
  } catch (error) {
    return res.status(501).json({ error: error.message });
  }
};

// @desc delete the Timing
// @route DELETE /api/v1/Timing/deleteTiming/:Id
// @access Public
exports.deleteTiming = async (req, res) => {
  try {
    await Timing.findByIdAndRemove(req.params.timingId);

    res.status(200).json({
      success: true,
      id: req.params.timingId,
      data: 'The Timing has been removed from the Database',
    });
  } catch (error) {
    res.status(501).json({ error: "Couldn't Find the Timing" });
  }
};

// @desc get the timings according to the Timing.
// @route GET /api/v1/timings/getTiming/:MasjidId
// @access Public
exports.getTimingById = async (req, res) => {
  try {
    const timings = await Timing.find({ _id: req.params.timingId }, {
      createdAt: 0, updatedAt: 0, __v: 0,
    });

    if (timings.length > 0) {
      return res.status(200).json({
        success: true,
        count: timings.length,
        data: timings,
      });
    }

    return res.status(404).json({
      success: false,
      message: 'Not Found',
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
