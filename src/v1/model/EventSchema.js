const { Schema, model } = require('mongoose');

const EventSchema = new Schema(
  {

    eventName: {
      type: String,
      min: 5,
      max: 40,
      trim: true,
    },
    masjidId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    EventPhotos: {
      type: [String],
      default: '',
    },
    timings: [
      {
        date: Number,
        startTime: Number,
        endTime: Number,
      },
    ],
    guests: [
      {
        name: String,
        desc: String,
      },
    ],
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

EventSchema.index({ location: '2dsphere' });

module.exports = model('Event', EventSchema);
