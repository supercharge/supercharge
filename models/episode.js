'use strict'

const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const episodeSchema = new Schema(
  {
    title: {
      type: String,
      trim: true
    },
    ids: {
      trakt: Number,
      imdb: String,
      tvdb: Number,
      tmdb: Number,
      tvrage: Number
    },
    season: { type: Schema.Types.ObjectId, ref: 'Season' },
    number: Number,
    number_abs: Number,
    overview: String,
    rating: Number,
    votes: Number,
    first_aired: String,
    runtime: Number, // in minutes
    available_translations: [String]
  },
  {
    // minimize JSON for API: remove _id, __v properties
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id
        delete ret.__v
        return ret
      }
    },
    toObject: { virtuals: true }
  }
)

module.exports = Mongoose.model('Episode', episodeSchema)
