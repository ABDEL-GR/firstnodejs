require('dotenv').config();
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from  "body-parser";
import cookieParser from "cookie-parser";
import connectFlash from"connect-flash";
import session from "express-session";
let app = express();

//enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret:'secret',
    resaye: true,
    saveUninitialized: false,
    cookie:{
        maxAge: 1000 * 60 * 60 * 24 //86400000 1 day
    }
}));

//enable flash message
app.use(connectFlash());

//Config view engine
configViewEngine(app);

// init all web routes
initWebRoutes(app);

let port = process.env.PORT || 8080;
app.listen(port, () =>console.log(`Building a login system with NodeJS is running on port ${port}!`));
