'use strict'

const Mongoose = require('mongoose')
const MongooseRandom = require('mongoose-simple-random')
const Schema = Mongoose.Schema

const showSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true
    },
    ids: {
      trakt: { type: Number, unique: true },
      slug: { type: String, unique: true },
      imdb: String,
      tvdb: Number,
      tmdb: Number,
      fanart: Number,
      tvrage: Number
    },
    images: {
      poster: String,
      background: String
    },
    overview: String,
    trailer: String,
    homepage: String,
    status: String,
    year: Number,
    first_aired: Date,
    airs: {
      day: String,
      time: String,
      timezone: String
    },
    aired_episodes: Number,
    rating: Number,
    votes: Number,
    runtime: Number,
    genres: [String],
    language: String,
    certification: String,
    network: String,
    country: String
  },
  {
    // minimize JSON for API: don't include all season/episode info and remove _id, __v properties
    toJSON: {
      virtuals: true,
      transform: function (doc, ret, options) {
        delete ret._id
        // delete ret.__v  // removed by "versionKey" option
        return ret
      },
      versionKey: false // removes __v from JSON response
    },
    toObject: { virtuals: true }
  }
)

// use a virtual property for the “seasons” relation
// allows you to benefit from Mongoose’s “toJSON” configuration
// to remove seasons before sending them to the client
// this won’t bloat the JSON with ALL the data
// because this “seasons” population fetches
// the related episodes as well (defined in the ”season” model)
showSchema.virtual('seasons', {
  ref: 'Season',
  localField: '_id',
  foreignField: 'show'
})

/**
 * Create Indexes
 */
showSchema.index(
  { title: 'text', overview: 'text', genres: 'text' },
  {
    weights: { title: 5, overview: 2, genres: 1 }
  }
)

// add plugin to find random movies
showSchema.plugin(MongooseRandom)

showSchema.statics.random = function (limit) {
  const self = this

  return new Promise((resolve, reject) => {
    self.findRandom({}, {}, { limit }, (err, results) => {
      if (err) {
        return reject(err)
      }

      return resolve(results)
    })
  })
}

module.exports = Mongoose.model('Show', showSchema)
