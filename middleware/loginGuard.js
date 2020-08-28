const guard = (req, res, next) => {
  if (req.url != '/login' && req.url != '/register' && !req.session.username) {
    res.redirect('/admin/login')
  } else {
    if (req.session.role === 'normal')
      return res.redirect('/home/')
    else next()
  }
}

module.exports = guard
