const express = require("express")
const FrontController = require("../controllers/FrontController")
const route = express.Router()
const checkUserAuth = require("../middleware/auth")  //require
const CourseController = require("../controllers/CourseController")
const AdminController = require("../controllers/AdminController")

route.get("/", FrontController.login) //by default chale ga
route.get("/about", checkUserAuth, FrontController.about)
route.get("/register", FrontController.register)
route.get("/dashboard", checkUserAuth, FrontController.dashboard)
route.get("/contact", checkUserAuth, FrontController.contact)
route.get("/team", FrontController.team)
route.get("/course", FrontController.course)



//data insert
route.post("/insertreg", FrontController.insertReg)
route.post("/vlogin", FrontController.vlogin)  //vloging means verfiy login in login.ejs
route.get("/logout", FrontController.logout)

route.get("/profile", checkUserAuth, FrontController.profile)
route.post("/updateprofile", checkUserAuth, FrontController.updateprofile)
route.post("/changePassword", checkUserAuth, FrontController.changePassword)

//courseController
route.post("/courseInsert", checkUserAuth, CourseController.CourseInsert)
route.get("/course_display", checkUserAuth, CourseController.courseDisplay)
route.get("/course_view/:id", checkUserAuth, CourseController.courseview)
route.get("/course_edit/:id", checkUserAuth, CourseController.courseEdit)
route.get("/course_delete/:id", checkUserAuth, CourseController.courseDelete)
// route.get("/course_update/:id", checkUserAuth, CourseController.courseUpdate)

//admincontroller
route.get("/admin/dashboard", checkUserAuth, AdminController.dashboard)
route.post("/admin/update_status/:id", checkUserAuth, AdminController.update_status)

module.exports = route;