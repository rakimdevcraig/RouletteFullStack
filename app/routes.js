module.exports = function(app, passport, db,) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });


  // Casino owner ======================================
  app.get('/profile', isLoggedIn, function(req, res) {
    db.collection('results').find().toArray((e, r) => {
      res.render('profile.ejs', {
        wins: r[0].wins,
        losses: r[0].losses,
      })
    })
  });



  // casino routes ===============================================================
      app.put('/casino', (req, res) => {
        let result = req.body.result
        let type = "losses"
        console.log(req.body.wins)
        if (result){
          type = "wins"
        }
        db.collection('results')
          .findOneAndUpdate({}, {
            $inc: {
              [type]: req.body.wins +1
            }
          }, {
            sort: {_id: -1},
            upsert: true
          }, (err, result) => {
            if (err) return res.send(err)
            res.send(result)
          })
        })




  // LOGOUT ==============================
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });





  // updating the wins in the database
  app.put('/wins', (req,res) => {
    var collection = db.collection('results');
    let uId = ObjectId(req.session.passport.user)
    collection.findOneAndUpdate({"_id": uId}, {
      // .findOneAndUpdate({'local': {email: '12345.com', password:"$2a$08$B1Il5uI0GeHJ8o7InSVF8.0hCY/JE3qdij/xWBSU5t8Y/cO5c7Bgu"} },{
      // left side info we're updating in database right side=information we're taking from front end
      '$inc': { 'results.wins': 1 }
      },  (err, result) => {
        if (err) return res.send(err)
        console.log(result)
        res.send(result)
      })
  })


  // ---------------------------- testing ----------------------------------------------------------

  // For barista to check order complete
  // app.put('/barista', (req, res) => {
  //   db.collection('messages')
  //   .findOneAndUpdate({type:req.body.type, size: req.body.size, quantity: req.body.quantity, other:req.body.other, name:req.body.name, complete: false }, {
  //     $set: {
  //       complete: true
  //     }
  //   }, {
  //     sort: {_id: -1},
  //     upsert: true
  //   }, (err, result) => {
  //     if (err) return res.send(err)
  //     res.send(result)
  //   })
  // })

  // ---------------------------- testing ----------------------------------------------------------





  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function(req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });

  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function(req, res) {
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/signup', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
  }));



  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. for social accounts, just remove the token
  // for local account, remove email and password
  // user account will stay active in case they want to reconnect in the future

  // local -----------------------------------
  app.get('/unlink/local', isLoggedIn, function(req, res) {
    var user            = req.user;
    user.local.email    = undefined;
    user.local.password = undefined;
    user.save(function(err) {
      res.redirect('/profile');
    });
  });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated())
  return next();

  res.redirect('/');
}
