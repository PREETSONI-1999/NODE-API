const express= require('express');
const Ninja=require('../models/database');
const Video=require('../models/database1')
var multer  = require('multer')
const sgMail = require('@sendgrid/mail');

const multerConf={
    storage:multer.diskStorage({
        filename:function(req,file,next){
            console.log(file);
            next(null,file.originalname);
        },
        destination: function(req,file,next){
            console.log("hi");
            next(null,'public/uploads/');
            console.log("bye");
        }
    }),
}
const router = express.Router();

var app = express();
//app.use(upload());

var log_user_mail;

router.post('/login',function(req,res){
    console.log(req.body);
    
    Ninja.findOne({name:req.body.username,password:req.body.password},function(err,obj){
        log_user_mail=obj.email;
        console.log(obj);
        res.render('dashboard');
    })
    
})
router.post('/new',function(req,res){
    var n1=new Ninja({email:req.body.email,name:req.body.username,password:req.body.password});
    n1.save(function(err,res){});
    res.send("ty for registering");
    
})


router.get('/forget_pwd', function(req, res) {
	res.render('forget_pwd');
});
var to_mail;
const code='4068'; //just for testing purpose
router.post('/new_pwd', function(req, res) {
    to_mail=req.body.email;
    console.log(to_mail);
    
    sgMail.setApiKey('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');


const msg = {
  to: to_mail,
  from: 'preetssoni99@gmail.com',
  subject: 'code',
  text: code,
 
};
sgMail.send(msg);
	res.render('authenticate');
});
router.post('/check', function(req, res) {
    
    var incode=req.body.code;
    if(incode==code)
        {   
            Ninja.findOne({email:to_mail/*name:req.body.username,password:req.body.password*/},function(err,obj){
        console.log(obj);
        obj.password=req.body.new_password;
        obj.save(function(err,res){});
                res.send('correct code');
    })
            
        }
	
    else
        res.send('incorrect code');
});

router.post('/profile', multer(multerConf).single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
    console.log("iploading.....");
    console.log(req.file);
    //req.filename=req.originalname;
    
    var vd='uploads/'+req.file.filename;
    var n1=new Video({email:log_user_mail,video_name:vd});
    n1.save(function(err,res){
        
    });
    res.send('ok');
})


router.post('/fetch_video', function (req, res) {
    Video.find({email:log_user_mail/*name:req.body.username,password:req.body.password*/},function(err,obj){
        console.log(obj);
        
                res.render('videos',{data:obj});
    })
    
})
module.exports=router;