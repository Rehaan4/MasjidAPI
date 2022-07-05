/* eslint-disable no-underscore-dangle */
const { Schema, model } = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const { enums } = require('../../../constants');

const TimingSchema = new Schema(
  {
    masjidId: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
    },
    timings: [
      {
        namazName:
        {
          type: String,
          enum: Object.values(enums.NAMAZ),
          unique: true,
          // validate: async (value) => {
          //   try {
          //     const result = await TimingSchema.findOne({ namazName: value });
          //     if (result) throw new Error(`duplicity detected: id :${value}`);
          //   } catch (error) {
          //     throw new Error(error);
          //   }
          // },
        },
        azaanTime: { type: Number, trim: true },
        jamaatTime: { type: Number, trim: true },
      },
    ],
  },
  { timestamps: true },
);
// TimingSchema.plugin(uniqueValidator);

TimingSchema.index({ date: 1, masjidId: 1 }, { unique: true });

module.exports = model('Timing', TimingSchema);
