const { Router } = require('express');
const {login,signup,blogget,upload,uploads,viewblog,deleteblog}=require('../controllers/userauth');
const userauthorized = require('../middleware');
const route=Router()
route.post('/login',login)
route.post('/signup',signup)
route.post('/upload',userauthorized, upload.single('blogimg'),uploads)
route.get('/blog',userauthorized,blogget);
route.get('/viewblog/:_id',userauthorized,viewblog);
route.delete('/deleteblog',deleteblog);
module.exports = route