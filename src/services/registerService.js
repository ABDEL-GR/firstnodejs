import connection from "../configs/connectDB";
import bcryptjs from "bcryptjs";


let createNewUser = (user) => {
    return new Promise(async (resolve, reject) => {
    try {
        // chek email is exist or not
        let check = await checkEmailUser(user.email);
        //console.log(check);
        if(check){
            reject(`This email " ${user.email}"Has already exist.Please choose an other email`);
        }else{
            //hash the user password
            let salt =bcryptjs.genSaltSync(10);
            let data = {
                fullName: user.fullName,
                email: user.email,
                password: bcryptjs.hashSync(user.password, salt)
            }
            connection.query("INSERT INTO users set ? ", data, function(error,rows){
                if(error){
                    reject(error);
                }
                resolve("Create a new user successfully");
            })
        }

    } catch (e) {
        reject(e);
    }
    });
};
let checkEmailUser = (email) => {
    return new Promise(((resolve, reject) =>{
    try {
            connection.query("SELECT * from users where email =?",email,function(error,rows){
             if(error){
                 reject(error);
             }
             if (rows.length >0) {
                 resolve(true)
                 }else {
                 resolve(false)
             }
            })
    }catch(e) {
        reject(e);
    }
    }));
};
module.exports = {
    createNewUser: createNewUser
}