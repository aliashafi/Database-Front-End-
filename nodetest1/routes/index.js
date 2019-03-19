var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Welcome to the Chang Lab Database!' });
});


/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Chang Lab Database!' });
    res.redirect("userlist");
});


/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('demographics');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var mrn = req.body.mrn;
    var master_id = req.body.master_id;

    // Set our collection
    var collection = db.get('demographics');

    // Submit to the DB
    collection.insert({
        "mrn" : mrn,
        "master_id" : master_id
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});


/* GET New User page. */
router.get('/signin', function(req, res) {
    res.render('signin', { title: 'Sign In' });
});

router.get('/patient_table', function(req, res) {
    res.render('patient_table', { title: 'Sign In' });
});

router.get('/create_patient', function(req, res) {
    res.render('create_patient', { title: 'Sign In' });
});

module.exports = router;