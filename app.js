const express = require("express");
//console.log(express)
const app = express();
const port = 4000;

const web = require("./routes/web");
const connectdb = require("./db/connectdb");
//connect flash and sessions
const session = require("express-session");
const flash = require("connect-flash");
const cookieparser = require("cookie-parser")  //require auth
const fileUpload = require("express-fileupload")

//file uploadd use
app.use(fileUpload({ useTempFiles: true }))


//token get
app.use(cookieparser())


//connect db
connectdb();

//html css views
app.set("view engine", "ejs");

//css link
app.use(express.static("public"));

//data get object
//parse application/x-www-form-express-urlencoded
app.use(express.urlencoded({ extended: false }));

//messages
app.use(
  session({
    secret: "secret",
    cookie: { maxAge: 60000 },
    resave: false,
    saveuninitialized: false,
  })
);
//flash messages
app.use(flash());

//route load
app.use("/", web);

//server create
app.listen(port, () => console.log("server start localhost:4000"));