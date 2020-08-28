const Joi = require('joi');

const schema = {
  username: Joi.string().min(2).max(5).required().error(new Error('username有问题')),
  birth: Joi.number().min(1900).max(2020).error(new Error('birth有问题')),
}

async function run() {
  try {
    await Joi.validate({
      username: 'b',
      birth: 1899
    }, schema)
  } catch (err) {
    console.log(err.message);
    return
  }
  console.log('验证通过');
}

run()
