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
    var a_id = req.body.a_id;
    var ec_id = req.body.ec_id;
    var sex = req.body.sex;
    var ethnicity = req.body.ethnicity
    var ethnicity = req.body.ethnicity
    var DOB = req.body.DOB
    var visit_date = req.body.visit_date
    var language_dominance = req.body.LangDom
    var native_language = req.body.native_language

    // Set our collection
    var collection = db.get('demographics');
    // Submit to the DB
    collection.insert({
        "ethnicity" : ethnicity,
        "gender" : sex,
        "DOB" : DOB, 
        "visit_date": visit_date,
        "ec_id" : ec_id,
        "a_id" : a_id,
        "language_dominance" : language_dominance,
        "native_language" : native_language
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("all_patients");
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
    res.render('create_patient', { title: '' });
});


router.get('/all_patients', function(req, res) {
    var db = req.db;
    var collection = db.get('demographics');
    collection.find({},{},function(e,docs){
        res.render('all_patients', {
            "all_patients" : docs
        });
    });
});

router.get('/test', function(req, res) {
    res.render('test', { title: '' });
    
});





module.exports = router;