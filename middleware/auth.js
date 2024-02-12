const jwt = require("jsonwebtoken")
const UserModel = require("../models/user")  //require


const checkUserAuth = async (req, res, next) => {

    //console.log("middleware auth")
    const { token } = req.cookies  //token get
    //console.log(token)

    if (!token) {
        req.flash("error", "Unauthorised Login")
        res.redirect("/")
    } else {
        const data = jwt.verify(token, "annkitasecretkey0987654321")
        //console.log(data)

        //data get
        const userdata = await UserModel.findOne({ _id: data.ID }) //to show name
        //console.log(userdata)
        req.userdata = userdata

        next()
    }
}

module.exports = checkUserAuth