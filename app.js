// Setup the app
setup();

function setup() {
  var express = require('express');
  var app = express();

  // Setup CONFIGURATION
  var config = require('./config.js');
  app.set('config', config);

  // Setup parsing for post information
  var bodyParser = require('body-parser');
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Set HTML template engine
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
  app.use(express.static('static'));

  // Setup Sessions
  setup_session(app);
  // Setup controller/routing funcionality
  setup_routes(app);
  // Connect to the database
  setup_database(app);

  // Run the server
  app.listen(config.PORT);
}

/** Setup session
   Adds as local variable for easier view access
   **/
function setup_session(app) {
  var config = app.get('config');
  var session = require('express-session');

  app.use(session({secret: config.SESSION_KEY}));

  // Set session for views
  app.use(function(req,res,next){
    res.locals.session = req.session;
    next();
  });
}

/** Setup routes
   Includes routing controllers from /routes/
   **/
function setup_routes(app) {
  [
    'home','author','series'/*,'story',
    'character','setting'*/
  ].map(
    function(routeName){
      require('./routes/' + routeName)(app);
    });
}

/** Open the database connection
   **/
function setup_database(app) {

}
