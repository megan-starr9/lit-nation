module.exports = function (app) {
    var config = app.get('config');

    /** User Index Page
      **/
    app.all('/author', function(req, res){
      res.redirect('/author/profile');
    });

    app.all('/author/profile/:username?', function(req, res) {
      var usermodel = require('../models/user_model')(app);

      if(req.params.username) {
        user = usermodel.get_user(req.params.username);
      } else {
        user = req.session.user;
      }
      if(user) {
        res.render('author/profile.html', {user : user});
      } else {
        res.redirect('/');
      }
    });
}
