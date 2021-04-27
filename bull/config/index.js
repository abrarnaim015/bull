const { MongoClient } = require('mongodb')

const databaseUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017'
const client = new MongoClient(databaseUrl, { useUnifiedTopology: true })

let db;

const connect = cb => {
  client.connect(err => {
    if (err) {
      console.log('connection failed')
    } else {
      console.log('connected')
      db = client.db('Mongo-Bull')
    }
    cb(err)
  })
}

const getDatabase = () => {
  if (db) return db
}

module.exports = { getDatabase, connect }
