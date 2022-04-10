const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const http = require('http')
const compression = require('compression')
const dotenv = require('dotenv')

const app = express()
app.use(bodyParser.json())
app.use(cors());


const connectDB = require('./config/db')
//Routes
app.use('/', require('./routes/index'));

//Load Config
dotenv.config({ path: './config/config.env' });

connectDB();

//PAS AAN NAAR 3000
app.listen(3001)

// Compress static assets to enhance performance.
// Decrease the download size of your app through gzip compression:
app.use(compression())

//
// appname is the name of the "defaultProject" value that was set in the angular.json file.
// When built in production mode using 'ng build', a ./dist/{appname} folder is
// created, containing the generated application. The appname points to that folder.
//
// Replace the name below to match your own "defaultProject" value!
//
const appname = 'my-app'

// Set express options
const options = {
  setHeaders: (res, path, stat) => {
    res.set(
      'Content-Security-Policy',
      "default-src 'self' http://angular-gitlab-heroku.herokuapp.com/; script-src 'self' http://angular-gitlab-heroku.herokuapp.com/; connect-src http://angular-gitlab-heroku.herokuapp.com/ 'self'; img-src 'self' www.google.com; style-src 'self' 'unsafe-inline';"
    )
  }
}
resp.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');

// Point static path to dist
app.use(express.static(path.join(__dirname, '..', 'dist', appname), options))

// Catch all routes and return the index file

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', appname, 'index.html'))
})

// Get port from environment and store in Express.
//process.env.PORT || 
const port = '4200'
app.set('port', port)
// Create HTTP server.
const server = http.createServer(app)
// Listen on provided port, on all network interfaces.
server.listen(port, () => {
  console.log(`Angular app \'${appname}\' running in ${process.env.NODE_ENV} mode on port ${port}`)
})

