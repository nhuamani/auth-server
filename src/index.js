const express = require('express');
const cors = require('cors');


// Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 4000)

// Middlewares
app.use( cors() )           // Definir peticiones de un solo dominio de Frontend
app.use( express.json() )   // Lectura y parseo del body

// Routes
app.use( '/api/auth', require('./routes/auth') )

// Start Server
app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${ app.get('port') }`)
})
