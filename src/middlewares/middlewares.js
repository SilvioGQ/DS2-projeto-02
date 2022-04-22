const middlewareUser = (req, res, next) => {
    const user = req.session.user;
    console.log(user)
    if(user){
        next();
    } else res.redirect('/login.html');
};

module.exports = { middlewareUser };