require('dotenv').config();
const path  =require("path");
const userRoute=require('./routes/user')
const blogRoute=require("./routes/blog")
const express= require('express');
const mongoose=require("mongoose");
const cookie_parser=require("cookie-parser");
const Blog=require("./models/blog")
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const app = express();
const PORT=process.env.PORT;
mongoose.connect(MONGODB_URL)
app.use(express.static(path.resolve('./public')))
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser())
app.use(checkForAuthenticationCookie('token'))
app.get('/',async (req,res)=>{
    const allBlogs=await Blog.find({})
    res.render("home",{
        user:req.user,
        blogs:allBlogs,
    })
})
app.use("/user",userRoute)
app.use("/blog",blogRoute)

app.listen(PORT,()=>{
    console.log(`Server started at port:${PORT}`)
})