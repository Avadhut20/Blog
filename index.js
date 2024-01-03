const path  =require("path");
const userRoute=require('./routes/user')
const blogRoute=require("./routes/blog")
const express= require('express');
const mongoose=require("mongoose");
const cookie_parser=require("cookie-parser");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const app = express();
const PORT=8000;
mongoose.connect("mongodb://localhost:27017/blogify360")
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.get('/',(req,res)=>{
    res.render("home",{
        user:req.user
    })
})
app.use("/user",userRoute)
app.use("/blog",blogRoute)

app.listen(PORT,()=>{
    console.log(`Server started at port:${PORT}`)
})