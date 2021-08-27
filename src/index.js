const express = require('express');


// Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 4000)

// Routes
app.get('/', ( req, res ) => {
  res.json({
    ok: true,
    massage: 'All Success',
    uid: 1234
  })
})

// Start Server
app.listen(app.get('port'), () => {
  console.log(`App listening at http://localhost:${ app.get('port') }`)
})
