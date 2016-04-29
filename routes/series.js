module.exports = function (app) {
    var config = app.get('config');

    /** Series Index Page
      **/
    app.all('/series', function(req, res){
      var seriesmodel = require('../models/series_model')(app);

      var serieslist = seriesmodel.get_series_list(req.session.user.id);
      if(serieslist) {
        res.render('series/listing.html', {serieslist : serieslist});
      } else {
        res.redirect('/');
      }

    });

    app.get('/series/:id', function(req, res){
      var seriesmodel = require('../models/series_model')(app);

      var series = seriesmodel.get_series(req.params.id);
      if(series) {
        res.render('series/detail.html', {series : series});
      } else {
        res.redirect('/');
      }

    });

    return this;

  }
