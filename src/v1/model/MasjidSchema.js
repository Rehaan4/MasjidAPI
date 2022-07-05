const { Schema, model } = require('mongoose');

const MasjidSchema = new Schema(
  {
    masjidName: {
      type: String,
      min: 5,
      max: 30,
      trim: true,
      unique: true,
      required: true,
    },
    masjidPhotos: {
      type: [String],
      default: '',
    },
    desc: {
      type: String,
    },
    country: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
    },

    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },

  },
  { timestamps: true },
);

MasjidSchema.index({ location: '2dsphere' });

module.exports = model('Masjid', MasjidSchema);
