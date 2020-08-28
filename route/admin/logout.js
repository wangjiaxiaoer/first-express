module.exports = (req, res) => {
  req.session.destroy(_ => {
    res.clearCookie('connect.sid')
    res.redirect('/admin/login')
    req.app.locals.userInfo = null
  })
}
