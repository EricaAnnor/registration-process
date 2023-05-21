const express = require("express")
const app =  express()
const port = 3000
const middleware = require("./middleware.js")
const path = require("path")
const bodyParser = require("body-parser")
const connectDB = require("./routes/database.js")
const session = require("express-session")


connectDB()
app.set("view engine" , "pug")
app.set("views", "views")
app.use(bodyParser.urlencoded({extented:false}));

app.use(express.static(path.join(__dirname, "public")))

app.use(session({
    secret: "fokuoh",
    resave:true,
    saveUninitialized:false
}))

//routes
const loginRoute = require("./routes/loginRoute.js")
const registerRoute = require("./routes/registerRoute.js")

app.use("/login", loginRoute)
app.use("/register", registerRoute)


const server = app.listen(port, ()=>{
    console.log("server running on   " + port)
})

 

app.get("/", middleware.requireLogin, (req,res,next)=>{
    res.status(200).render("home")
})

