var mongoose=require('mongoose');
var cors=require('cors');
mongoose.connect('mongodb://sesh:sesh.1234@cluster0-shard-00-00-lemrd.mongodb.net:27017,cluster0-shard-00-01-lemrd.mongodb.net:27017,cluster0-shard-00-02-lemrd.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');

var course = mongoose.model('courses', { courseDetails: String, courseName:String,  duration:String,  liveProject:String,  lms:String,  logo:String,  preRequisites:String,  syllabus:String, batch:String,FAQ:String,reviews:String,category:String,demo:String,fee:Number,disc:Number});
let user = mongoose.model('users', { email: String, password:String, gender:String,  mobile:String, courseIntersted:String,role:Number });
let countries = mongoose.model('countries', { name:String,code:String});
let enquiry = mongoose.model('enquiry', { name:String,email: String, country:String,mobile:String, course:String});

/*
Cat.find({name:/^dann/},function (err, kittens) {
  if (err) return console.error(err);
  for(i=0;i<kittens.length;i++)
  console.log(kittens[i].name);
});
*/

const _app=require('./config.js')
const express=require('express')
const jwt = require('jsonwebtoken');
// var bodyParser = require('body-parser');
app=express();

const fileUpload = require('express-fileupload');

// default options
app.use(fileUpload());


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
var path = require('path');
app.use('/static',express.static(path.resolve('./public')));

app.post('/getCategories',cors(),(req,res)=>{
  course.distinct('category',function (err, data) {
    if (err) return console.error(err);
      res.status(200).send(data);
  });
});

app.post('/getCategory/:cat',cors(),(req,res)=>{
  let cat={category:req.params.cat};
  if(req.params.cat=='All') cat={};
  course.find(cat,{courseName:1,logo:2,fee:3,disc:4},function (err, data) {
    if (err) return console.error(err);
      res.status(200).send(data);
  });
});

app.post('/getCourses',cors(),(req,res)=>{
  course.distinct('courseName',function (err, data) {
    if (err) return console.error(err);
      res.status(200).send(data);
  });
});

app.post('/getWidget',cors(),(req,res)=>{
  course.find({},{courseName:1,logo:2,fee:3,disc:4},function (err, data) {
    if (err) return console.error(err);
      res.status(200).send(data);
  });
});

app.post('/update',cors(), (req, res, next) => {
  var l_course = JSON.parse(req.body.courseJSON);
  course.updateOne({courseName:l_course.courseName},l_course,function (err) {
      if (err){return console.error(err);}
      res.send('Course Updated Succesfully');
  })
})

app.post('/quickEnquiry',cors(), (req, res, next) => {

  console.log(req.body.enquiry);
  let l_enquiry = new enquiry(JSON.parse(req.body.enquiry));
  console.log(req.body);
  // res.send('test');
  l_enquiry.save(function (err) {
    console.log('saved');
    res.send('Enquiry Sent Succesfully');
  });
});

app.post('/getEnquiries',cors(),(req,res)=>{
  enquiry.find({},function (err, data) {
    if (err) return console.error(err);
      res.send(data);
  });
});

app.post('/delEnquiry/:id',(req,res)=>{
  enquiry.remove({_id:req.params.id},function (err, data) {
    if (err) return console.error(err);
      res.send('Succesfully deleted');
  });
});

app.get('/insCountries/:cc', (req, res, next) => {
  console.log(req.query.cc)
  // res.send('stop');
  let l_countries = JSON.parse(req.query.cc);
  console.log(l_countries)
  countries.insertMany(l_countries, function(error, docs) {
    res.send('Inserted');
  });
});

app.post('/createUser', (req, res, next) => {

  console.log(req.body);
  let l_user = new user(JSON.parse(req.body.courseJSON));
  console.log(req.body);
  // res.send('test');
  l_user.save(function (err) {
    console.log('saved');
    res.send('User Added Succesfully');
  });

});

app.post('/login',cors(),(req,res)=>{
  console.log(JSON.parse(req.body.courseJSON))
  var l_user = new course(JSON.parse(req.body.courseJSON));
  user.find(JSON.parse(req.body.courseJSON),{email:1,name:2,role:3},function (err, data) {
    console.log(data);
    if (err) return console.error(err);
    if(data.length){
      var user={email:data[0].email,role:data[0].role}
      jwt.sign(user,'secret',
      // {expiresIn:60},
      (err,token)=>{
        res.status(200).json(token);
      })
     }
    else res.send('User Name/Password Incorrect');
  });
});


app.post('/upload', (req, res, next) => {

  let fileName=req.files.file.name
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/img/${fileName}`, function(err) {
    if (err) {
      return res.status(500).send(err);
  }

  var l_course = new course(JSON.parse(req.body.courseJSON));

  l_course.save(function (err) {
    console.log('saved');
    res.send('Course Added Succesfully');
  });

  });

})
app.post('/getCountries',(req,res)=>{
  countries.find(function (err, data) {
    if (err) return console.error(err);
      res.send(data);
  });
});
app.get('/getCourses',(req,res)=>{
  course.find({},{courseName:1,category:2},function (err, data) {
    if (err) return console.error(err);
      res.send(data);
  });
});

app.get('/getUsers',(req,res)=>{
  user.find({},function (err, data) {
    if (err) return console.error(err);
      res.send(data);
  });
});

app.get('/delUser/:id',(req,res)=>{
  user.remove({_id:req.params.id},function (err, data) {
    if (err) return console.error(err);
      res.send('Succesfully deleted');
  });
});

app.get('/delCourse/:id',(req,res)=>{
  course.remove({_id:req.params.id},function (err, data) {
    if (err) return console.error(err);
      res.send('Succesfully deleted');
  });
});

app.get('/getCourse/:course',(req,res)=>{
  course.find({courseName:req.params.course},function (err, data) {
    if (err) return console.error(err);
      // res.writeHead(200, {'Content-Type': 'text/plain'});
      res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
      res.send(data);
  });
});

app.get('/db',(req,res)=>{

  var l_course = new course({ name: 'Node JS',syllabus:'Syllabus',details:'Details' });

  // l_course.save(function (err) {
  //   console.log('saved');
  //   res.send(err);
  // });
  // find/querying the document
  course.find(function (err, data) {
    if (err) return console.error(err);
      res.send(data);
  });

}


)
app.get('/',(req,res)=>{
  var user={id:1,user:'sesh'}
  jwt.sign(user,'secret',
  // {expiresIn:60},
  (err,token)=>{
    res.status(200).json(token);
    res.status(200).json(token);
  })
});

app.get('/api/:token',(req,res)=>{
  var decoded = jwt.decode(req.params.token);
  res.send(decoded);
})

app.get('/api/protected', ensureToken, (req, res) =>{

  jwt.verify(req.token, 'secret', function(err, data) {
    var token=req.token;
    var decoded = jwt.decode(token);
    console.log(decoded);

    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        description: 'Protected information. Congrats!'
      });
    }
  });
});

function ensureToken(req, res, next) {

  const clientToken = req.headers["authorization"];
  if (typeof clientToken !== 'undefined') {
    req.token = clientToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(_app.port);

console.log('Application is running on http://localhost:'+ _app.port);
