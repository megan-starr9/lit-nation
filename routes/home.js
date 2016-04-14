module.exports = function (app) {
    var config = app.get('config');

    /** Sitewide Index Page
      **/
    app.all('/', function(req, res){
      res.render('home.html');
    });

    /** Sitewide Index Page
      **/
    app.all('/about', function(req, res){
      res.render('about.html');
    });

    /** User Login Page
        Only visible to those not yet logged in
      **/
    app.get('/login', function(req, res) {
      if(!req.session || !req.session.user) {
        res.render('login.html', {form : false});
      } else {

        res.redirect('/');
      }
    });

    app.post('/login', function(req, res) {
      var usermodel = require('../models/user_model')(app);

      var form = require('../libraries/form');
      setup_loginform(form, req.body);
      form.validate();

      // Run user model validations
      if(req.body.username) {
        var user = usermodel.get_user(req.body.username);
        if(!user) {
          form.add_error('username', 'That username does not exist.');
        } else if(!form.has_errors()) {
          // Verify password if there have been no other errors yet!
          if(user.password != form.get_value('password')) {
            form.set_failure('Incorrect Username/Password Combination');
          } else {
            req.session.user = user;
            res.redirect('/');
          }
        }
      }

      res.render('login.html', {form : form});
    });

    /** User Logout (destroy session)
      **/
    app.all('/logout', function(req, res){
      req.session.destroy(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
    });

    /** User Registration Page
        Only visible to those not yet logged in
      **/
    app.get('/register', function(req, res) {
      if(!req.session || !req.session.user) {
        res.render('register.html', {form : false});
      } else {
        res.redirect('/');
      }
    });

    app.post('/register', function(req, res) {
      var usermodel = require('../models/user_model')(app);

      var form = require('../libraries/form');
      setup_registerform(form, req.body);
      form.validate();

      // Run user model validations
      if(req.body.username) {
        var user = usermodel.get_user(req.body.username);
        if(user) {
          form.add_error('username', 'That username is already taken.');
        } else if(!form.has_errors()) {
          // Create user if all is in order!
          usermodel.create_user(form)
          res.redirect('/');
        }
      }

      res.render('register.html', {form : form});
    });

};

function setup_loginform(form, postbody) {
  form.reset();
  form.add_field('username');
  form.add_field('password');
  form.add_value('username', postbody.username);
  form.add_value('password', postbody.password);

  form.add_validation('username', 'required');
  form.add_validation('password', 'required');
}

function setup_registerform(form, postbody) {
  form.reset();
  form.add_field('username');
  form.add_field('password');
  form.add_field('email');
  form.add_value('username', postbody.username);
  form.add_value('password', postbody.password);
  form.add_value('email', postbody.email);

  form.add_validation('username', 'required');
  form.add_validation('username', 'alphanumeric');
  form.add_validation('password', 'required');
  form.add_validation('email', 'required');
}
