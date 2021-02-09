const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode =require("./utils/geocode.js")
const forecast =require("./utils/forecast.js")

const app = express()
const port= Process.env.PORT || 3000

// define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname,"/template/views") //customize views 
const partialsPath= path.join(__dirname,"/template/partials")

//set up handlebars views and view location
app.set("views",viewPath)               //customize view
app.set('view engine','hbs') //handle bars set up
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>
{
    res.render('index', {
        title:"Weather ",
        name:"Andrew Mead"
    })
})
app.get('/about',(req,res)=>
{
    res.render('about', {
        title:"About me ",
        name:"Arun Bhandari"
    })
})
app.get('/help',(req,res)=>
{
    res.render('help', {
        helpText: "This is some helpful text.",
        title:"Help me please ",
        name:"Arun Bhandari"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
       return res.send({
            error:"You must provide a address term"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude, location}={})=>
    {
        if (error)
        {
            return res.send({
                error
            })
        }
        forecast(latitude,longitude,(error, forecastData)=>{
            if(error)
            {
                return res.send({error})
            }

            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get("/products",(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
            error:"You must provide a search term"
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{  //set up complex match routing 
    res.render("404",{
        title:"404",
        name:"Eska Bajey",
        errorMessage:"Help article not found"
    })
})
app.get('*', (req,res)=>{   //asterik for anything else
    res.render('404',{
        title:404,
        name:"arun",
        errorMessage:"Page not found"
    })
})
app.listen(port, () => {
    console.log('Server is up on port '+ port)
})