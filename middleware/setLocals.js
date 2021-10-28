module.exports = () => {
  return (req, res, next) => {
    res.locals.user = req.user;
    res.locals.isLoggedIn = res.session.isLoggedIn;
    next();
  };
};
