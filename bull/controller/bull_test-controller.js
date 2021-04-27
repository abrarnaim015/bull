const { getDatabase } = require('../config')
const { ObjectID } = require('mongodb')


class MoviesController {

  static async getBullTest(req, res, next) {
    try {
      const db = getDatabase()
      const MoviesCollection = db.collection('bull-test')
      const movies = await MoviesCollection.find().toArray()
      res.status(200).json(movies)
    } catch (err) {
      console.log(err)
    }
  }

  static async postBullTest(req, res, next) {
    try {
      const dataBody = req.body
      const db = getDatabase()
      const MoviesCollection = db.collection('bull-test')
      const newMovie = await MoviesCollection.insertOne(dataBody)
      res.status(201).json(newMovie)
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteBullTest(req, res, next) {
    try {
      const id = req.params.id
      const db = getDatabase()
      const MoviesCollection = db.collection('bull-test')
      const delMovie = await MoviesCollection.deleteOne({ _id: ObjectID(id) })
      if (delMovie.deletedCount === 1) {
        res.status(200).json({ msg: "Successfully deleted one document." })
      } else {
        res.status(401).json({ msg: "No documents matched the query. Deleted 0 documents." })
      }
    } catch (err) {
      console.log(err)
    }
  }

  static async deleteManyBullTest(req, res, next) {
    try {
      const id = req.params.id
      const db = getDatabase()
      const MoviesCollection = db.collection('bull-test')
      const delMovie = await MoviesCollection.deleteMany({})
      if (delMovie.deletedCount === 1) {
        res.status(200).json({ msg: "Successfully deleted one document." })
      } else {
        res.status(401).json({ msg: "No documents matched the query. Deleted 0 documents." })
      }
    } catch (err) {
      console.log(err)
    }
  }

}

module.exports = MoviesController

