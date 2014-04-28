var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
  var models = require('../models/');
  // var title = req.body.pageTitle;
  // var body = req.body.pageContent;
  var id = req.body.pageID;
  // var url_name = title.replace(/[\s]/ig,"_").replace(/[^\w]/ig,"");

  // console.log(title, id);

  models.Page.findByIdAndRemove(id, function(err, wikiPage) {
      if (err) {
        console.log(err);
      }
      else {
        if(wikiPage) {
          //console.log("Wikipage found", wikiPage);
          res.redirect('/');
        }
        else {
          res.render('show', {title: 'UNKNOWN PAGE'});
        }
      }
    });

  // var url_name = generateUrlName(title);

  // var p = new models.Page({ "title": title, "body":body, "url_name": url_name});
  // p.save();
  // res.redirect('/wiki/' + url_name);
});



module.exports = router;