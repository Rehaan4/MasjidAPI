const Joi = require('joi').extend(require('@joi/date'));
const { enums } = require('../constants');

// /^[A-Za-z0-9'\.\-\s\,+$/]

const MasjidSchema = Joi.object({

  masjidName: Joi.string().regex(/^[A-Za-z" "]+$/),
  // desc: Joi.string().regex(/^[A-Za-z0-9.,!@&*" "]+$/),
  country: Joi.string().regex(/^[A-Za-z0-9.,!@&*" "]+$/),
  address: Joi.string()
    .regex(/^[A-Za-z0-9.," "]+$/),
  // masjidPhotos: Joi.array().items(Joi.string()),
  contact: Joi.string(),
  location: Joi.object({
    type: Joi.string(),
    coordinates: Joi.array().min(1).max(2).items(Joi.number()),
  }),

});

const EventSchema = Joi.object({
  eventName: Joi.string().regex(/^[A-Za-z" "]+$/),
  masjidId: Joi.string().alphanum(),
  desc: Joi.string().regex(/^[A-Za-z0-9.,!@&*" "]+$/),
  timings: Joi.array().items(
    Joi.object({
      date: Joi.date(),
      startTime: Joi.number(),
      endTime: Joi.number(),
    }),
  ),
  guests: Joi.array().items(
    Joi.object({
      name: Joi.string().regex(/^[A-Za-z" "]+$/),
      desc: Joi.string().regex(/^[A-Za-z0-9.,!@&*" "]+$/),
    }),
  ),
  eventPhotos: Joi.array().items(Joi.string()),
  location: Joi.object({
    type: Joi.string(),
    coordinates: Joi.array().min(1).max(2).items(Joi.number()),
  }),
  address: Joi.string()
    .regex(/^[A-Za-z0-9.," "]+$/),
});

// console.log(...Object.values(enums));
const TimingSchema = Joi.object({
  masjidId: Joi.string().alphanum(),
  timings: Joi.array().items(
    Joi.object({
      namazName: Joi.string().valid(...Object.values(enums)),
      startTime: Joi.number(),
      endTime: Joi.number(),
    }),
  ),
});

module.exports = {
  MasjidSchema,
  EventSchema,
  TimingSchema,
};
