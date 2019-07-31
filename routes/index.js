const router = require('koa-router')()
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

const kittySchema = mongoose.Schema({
  name: String
});
kittySchema.methods.speak = function () {
  const greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name";
  console.log(greeting);
}
const Kitten = mongoose.model('Kitten', kittySchema);

// const User = mongoose.model('User')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = {
    code: 200,
    data: {
      name: 'lty',
      age: 18
    }
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/mongo', async (ctx, next) => {
  const fluffy = new Kitten({ name: 'lll' });
  fluffy.speak();
  fluffy.save();
})

module.exports = router
