const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')

const app = express()

//setamos el motor de plantillas
app.set('view engine','ejs')

//seteamos la carpeta public para archivos estaticos
app.use(express.static('public'))

//para procesar datos enviados forms
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//setamos las varialbes de entorno
dotenv.config({path:'env/.env'})

//para poder trabajar con las cookies
app.use(cookieParser())
// llamar al router
app.use('/', require('./routes/router'))

app.use(function(req, res, next){
    if(!req.user)
        res.header('Cache-Control','private, no-cache, no-store, must-revalidate');
    next();
});

app.listen(369, ()=>{
    console.log('SERVER JISKA in http://localhost:369');
})