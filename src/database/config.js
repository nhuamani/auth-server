const mongoose = require('mongoose');


const dbConnection = async () => {

  await mongoose.connect( process.env.MONGODB_LOCAL , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 1000,
    autoIndex: false
  }).then(
    (db) => {
      console.log('DB online is connected', db)
    },
    (error) => {
      console.log(error)
      throw new Error('Error connecting DB')
    }
  )

}

module.exports = {
  dbConnection
}
