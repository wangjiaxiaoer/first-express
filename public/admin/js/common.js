function serializeToJson(form) {
  let result = {}
  let f = form.serializeArray()
  f.forEach((item) => {
    result[item.name] = item.value
  })
  return result
}
