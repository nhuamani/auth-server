const express = require('express');


// Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 4000)

// Routes
app.use( '/api/auth', require('./routes/auth') )

// Start Server
app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${ app.get('port') }`)
})
