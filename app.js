const _app=require('./config.js')
const express=require('express')
const jwt = require('jsonwebtoken');
app=express();

app.get('/',(req,res)=>{
  var user={id:1,user:'sesh'}
  jwt.sign(user,'secret',
  // {expiresIn:60},
  (err,token)=>{
    res.status(200).json(token);
    res.status(200).json(token);
  })
});

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
