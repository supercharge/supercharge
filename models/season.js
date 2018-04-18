'use strict'

const Mongoose = require('mongoose')
const Schema = Mongoose.Schema

const seasonSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    ids: {
      trakt: Number,
      slug: String,
      imdb: String,
      tmdb: Number,
      tvrage: Number
    },
    show: { type: Schema.Types.ObjectId, ref: 'Show' },
    number: Number,
    overview: String,
    first_aired: String,
    runtime: Number, // in minutes
    network: String,
    rating: Number,
    votes: Number,
    episode_count: Number,
    aired_episodes: Number
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

// virtual property for “episodes” instead of a
// dedicated “episodes” array within the schema
// this let’s you use Mongoose’s “toJSON” configuration
// to remove virtuals when sending to the client
seasonSchema.virtual('episodes', {
  ref: 'Episode',
  localField: '_id',
  foreignField: 'season'
})

module.exports = Mongoose.model('Season', seasonSchema)
