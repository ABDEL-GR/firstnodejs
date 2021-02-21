let getloginPage =(req, res) => {
    return res.render("login.ejs");
};

module.exports ={
  getloginPage: getloginPage
};