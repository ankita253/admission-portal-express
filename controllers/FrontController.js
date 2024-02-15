const usermodel = require("../models/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")        //require json web token
const cloudinary = require("cloudinary").v2
const CourseModel = require("../models/course")

cloudinary.config({
  cloud_name: 'dkww4fcvv',
  api_key: '192718542197217',
  api_secret: 'Yn7MS0O6XOeJfyQSKAvg57ytsX4'
});

class FrontController {

  static login = async (req, res) => {
    try {
      res.render("login", { msg: req.flash('success'), error: req.flash('error') });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { name, image } = req.userdata
      res.render("about", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      const { name, image } = req.userdata
      res.render("contact", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };


  static register = async (req, res) => {
    try {
      res.render("register", { msg: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static dashboard = async (req, res) => {
    try {
      const { name, image, email, id } = req.userdata // to show name in frontcontroller
      const btech = await CourseModel.find({ user_id: id, course: "btech" })
      //console.log(btech)

      //console.log(name)
      res.render("dashboard", { n: name, i: image, e: email })

    } catch (error) {
      console.log(error);
    }
  };

  static team = async (req, res) => {
    try {
      res.render("team");
    } catch (error) {
      console.log(error);
    }
  };

  static course = async (req, res) => {
    try {
      res.render("course");
    } catch (error) {
      console.log(error);
    }
  };

  //data insert reg
  static insertReg = async (req, res) => {
    try {
      // console.log(req.files.image)
      const file = req.files.image
      //image upload
      const uploadImage = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "profile"
      })
      //console.log(uploadImage)

      //console.log("insert data");
      //console.log(req.body);
      const { n, e, p, cp } = req.body;
      const user = await usermodel.findOne({ email: e });
      //console.log(user)
      if (user) {
        req.flash("error", "Email already exist");
        res.redirect("/register");
      } else {
        if (n && e && p && cp) {
          if (p == cp) {
            const hashpassword = await bcrypt.hash(p, 10)       // to secure password
            const result = new usermodel({
              name: n,
              email: e,
              password: hashpassword,

              image: {
                public_id: uploadImage.public_id,
                url: uploadImage.secure_url,
              },
            });
            await result.save();
            req.flash("success", "Register success plz login");
            res.redirect("/"); //route url
          } else {
            req.flash("error", "password and confiorm password are not same");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All field req");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  static vlogin = async (req, res) => {
    try {

      // console.log(req.body)
      const { e, p } = req.body;
      if (e && p) {
        const user = await usermodel.findOne({ email: e })
        if (user != null) {
          const isMatched = await bcrypt.compare(p, user.password)
          if (isMatched) {

            if (user.role == "admin") {
              //token
              let token = jwt.sign({ ID: user.id }, "annkitasecretkey0987654321")
              //console.log(token)
              res.cookie('token', token)
              res.redirect('/admin/dashboard')
            } else {
              //token
              let token = jwt.sign({ ID: user.id }, "annkitasecretkey0987654321")
              //console.log(token)
              res.cookie('token', token)
              res.redirect('/dashboard')
            }



          } else {
            req.flash('erorr', 'Email or Password is not valid')
            res.redirect('/')
          }
        } else {
          req.flash('error', 'You are not a registred user')
          res.redirect('/')
        }
      } else {
        req.flash('error', 'All Fields Required')
        res.redirect('/')
      }

    } catch (error) {
      console.log(error)
    }
  }

  static logout = async (req, res) => {
    try {
      res.clearCookie("token")
      res.redirect('/')
    } catch (error) {
      console.log(error);
    }
  };

  static profile = async (req, res) => {
    try {
      const { name, image, email } = req.userdata
      res.render('profile', { n: name, i: image, e: email })
    } catch (error) {
      console.log(error);
    }
  };

  static updateprofile = async (req, res) => {
    try {
      const { name, image, id, email } = req.userdata
      console.log(req.body)
      console.log(req.files.image)
    } catch (error) {
      console.log(error);
    }
  };


  static changePassword = async (req, res) => {
    try {
      //console.log(req.body)
      const { op, np, cp } = req.userdata
      const { id } = req.userdata
      if (op && np && cp) {
        const user = await usermodel.findById(id)
        const isMatched = await bcrypt.compare(op, user.password)
        console.log(isMatched)
        if (!isMatched) {
          req.flash('error', 'current password is incorrect')
          res.redirect('/profile')

        } else {
          if (np != cp) {
            req.flash('error', 'password does not match')
            res.redirect('/profile')
          } else {
            const newHashPassword = await bcrypt.hash(np, 10)
            await usermodel.findByIdAndUpdate(id, {
              password: newHashPassword
            })
            req.flash('success', 'password update successfully')
            res.redirect('/')
          }
        }
      } else {
        req.flash('error', 'all fields are required')
        res.redirect('/profile')
      }

    } catch (error) {
      console.log(error);
    }
  };


}
module.exports = FrontController;
