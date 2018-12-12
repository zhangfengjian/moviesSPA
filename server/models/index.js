import mongoose from 'mongoose'
import md5 from 'md5'
import config from '../config'

require('./user')
require('./tag')
require('./article')
require('./comment')
require('./movies_home')
require('./category')

const User = mongoose.model('User')
const Category = mongoose.model('Category')

const mongoUrl = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}?useNewUrlParser=true`
mongoose.Promise = global.Promise
mongoose.connection
  .openUri(mongoUrl)
  .once('open', async () => {
    console.log('database connect successed')
    // 初始化管理员信息
    let userInfo = config.user
    userInfo.password = md5(userInfo.password)

    let user = await User.findOne({ role: 'superAdmin' }).exec()
    let category = await Category.find().exec()
    if (!user) {
      user = new User(userInfo)
      await user.save()
      console.log('Administrator information initialization succeeded')
    }
    if(!category.length){
      category = new Category({category: config.category})
      await category.save()
    }
  })
  .on('error', (error) => {
    console.warn('database connect fail', error)
  })
