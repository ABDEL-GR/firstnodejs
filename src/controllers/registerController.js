import {validationResult} from "express-validator";
import registerService from "../services/registerService";
let getRegisterPage = (req,res) => {
    return res.render("register.ejs",{
        errors: req.flash("errors")
    })
};
let createNewUser = async (req, res) => {
    //validate all required fields
    let errorsArr = [];
    let validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
        let errors = Object.values(validationErrors.mapped());
        errors.forEach((item) => {
            errorsArr.push(item.msg);
        });
        req.flash("errors", errorsArr);
        return res.redirect("/register");
    }


//create New User
    try {
        let newUser = {
            fullName: req.body.fullName,
            email: req.body.email,
            password: req.body.password,
        };
        await registerService.createNewUser(newUser);
        return res.redirect("/login");
    }catch (e) {
        req.flash("errors",e);
        return res.redirect("/register");
    }
    };


module.exports = {
    getRegisterPage: getRegisterPage,
    createNewUser : createNewUser
};