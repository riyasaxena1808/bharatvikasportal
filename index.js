const express = require('express')
const bodyParser =require('body-parser')
const mysql = require('mysql')
const app = express()
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require('express-session')

var db = mysql.createPool({

    host: "127.0.0.1",
    user: "root",
    password: "Cl!ckB@!t",
    database: "portal_data"
})
app.use(cors(
    {
        origin: ["http://localhost:3000","http://localhost:3000/login"],
        methods: ["GET","POST"],
        credentials: true,        
    }
    ))
app.use(express.json())
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:3000")
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With,Content-Type,Accept")
    next();
})
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(session({
    key:"userId",
    secret:"randomSecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 1000 *60 *24,
    },

}))

app.get('/api/get/category', (req,res)=>
{
    const sqlSelect = "Select * from category;"
        db.query(sqlSelect, 
            (err,result,fields)=>
            {
                res.send(result)

            }
        )

})
app.get('/api/get/central-ministries', (req,res)=>
{
    const sqlSelect = "Select * from central_ministries;"
        db.query(sqlSelect, 
            (err,result,fields)=>
            {
                res.send(result)

            }
        )

})
app.get('/api/get/centre-schemes', (req,res)=>
{
    const sqlSelect = "Select * from centre_schemes;"
        db.query(sqlSelect, 
            (err,result,fields)=>
            {
                res.send(result)

            }
        )

})
app.get('/api/get/regions', (req,res)=>
{
    const sqlSelect = "Select * from regions;"
        db.query(sqlSelect, 
            (err,result,fields)=>
            {
                res.send(result)

            }
        )

})

app.get("/api/login",(req,res)=>{
    if(req.session.user){
        console.log("No USER")
        res.send({loggedIn:true,user:req.session.user})
        
    }
    else{
        res.send({loggedIn:false})
    }
})

app.post('/api/insert/user',(req,res) =>
    
    {
        
        const firstName = req.body.firstName 
        const lastName = req.body.lastName 
        const email = req.body.email 
        const phone = req.body.phone 
        const aadhar = req.body.aadhar
        const password = req.body.password
        const gender = req.body.gender 
        const age = req.body.age 
        const selectedCategories = req.body.selectedCategories 
        const region = req.body.region
        console.log("Data: ",req.body)
        // console.log(firstName)
        // console.log("NewLine: ",req.body)
        // console.log("Line: ",movieId,movieName,movieReview)
        // email, password, firstName, lastName, gender, phone, region, aadhar
        // sqlCheck = ""
        const sqlInsert = "insert into user values( ?, ?, ?, ?, ?, ?, ?, ?,?);"
        db.query(sqlInsert, 
            [email, password, firstName, lastName, gender, phone, region, aadhar,age],(err,result,fields)=>
            {
                if(err) throw err
                console.log(err)
                console.log("Okay, I Inserted", email,"!")
            }
        )
        const sqlInsertCat = "insert into user_cat_comb values (?,?);"
        var i;
        for (i = 0; i < selectedCategories.length; i++) {
            db.query(sqlInsertCat, 
                [email,selectedCategories[i]],(err,result,fields)=>
                {
                    if(err) throw err
                    console.log(err)
                    console.log("Okay, I Inserted cat", i," :", selectedCategories[i],"!")
                }
            )
        } 

        // for(int i = 0;i<selectedCategories.length;  )
        // res.send("Success")
    
    }
)

app.post('/api/login',(req,res)=>{

    const email = req.body.email;
    const password = req.body.password;
    db.query(
        "Select * From user Where email = ? AND password = ?",
        [email,password],
        (err,result)=>{
            if(err){
                res.send({err:err});

            }
        
            if(result.length>0){
                req.session.user = result
                console.log("SESSIONS:")
                console.log(req.session.user)
                res.send(result)
            }
            else{
                res.send({message:"Wrong Comb"})
            }
        
        }

        )

})
app.get('/api/get/user',(req,res)=>{
    const sqlSelect = "Select * from user;"
        db.query(sqlSelect, 
            (err,result,fields)=>
            {
                res.send(result)

            }
        )
})
app.get('/api/get/user_cat_comb',(req,res)=>{
    const sqlSelect = "Select * from user_cat_comb;"
        db.query(sqlSelect, 
            (err,result,fields)=>
            {
                res.send(result)

            }
        )
})
// app.post('/api/insert',(req,res) =>
    
//     {
//         // const movieId = req.body.movieId
//         // const movieName = req.body.movieName
//         // const movieReview = req.body.movieReview
        
//         // console.log("NewLine: ",req.body)
//         // console.log("Line: ",movieId,movieName,movieReview)
//         // const sqlInsert = "insert into movie_review values(?,?,?);"
//         // db.query(sqlInsert, 
//         //     [movieId,movieName,movieReview],(err,result,fields)=>
//         //     {
//         //         console.log(result)
//         //     }
//         // )
    
//     }
// )

app.get("/api", (req,res)=>
    {
        console.log("Get method is woking!")
        res.send("Hello World!")
    }
)

app.listen(3002,()=>{
    console.log("running on port 3002")

})
