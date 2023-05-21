const express = require("express")
const app = express()
const router = express.Router()
const bodyParser = require("body-parser")
const User = require("../schemas/userSchema.js")
const bcrypt = require("bcrypt")
const session = require("express-session")



app.set("view engine", "pug")
app.set("views", "views")

app.use(bodyParser.urlencoded({extented: false}));

router.get("/",(req,res,next)=>{
    res.status(200).render("register")
})

router.post("/", async (req,res,next)=>{
    let firstName = req.body.firstName.trim()
    let lastName = req.body.lastName.trim()
    let userName = req.body.userName.trim()
    let email = req.body.email
    let password = req.body.password

    

    let payload = req.body

    if(firstName && lastName && userName && email && password){
        var user = await User.findOne({userName:userName})
        .catch((error)=>{
            console.log(error)
            payload.errorMessage = "Something went happen"
            res.status(200).render("register", payload)
        });
        
        if(user == null){
            let data = req.body;

            data.password = await bcrypt.hash(password, 10);

            User.create(data)
            .then((user)=>{
                req.session.user = user
                return res.redirect("/")
            })
            
        }
        else{
            if(email == user.email){
                payload.errorMessage = "Email already in use"
            }
            else{
                payload.errorMessage = "User name already in use"
            }
            res.status(200).render("register", payload)

        }
    }
    else{
        payload.errorMessage = "Make sure to fill all fields"
        res.status(200).render("register", payload)
    }
   
})

module.exports = router;