import mongoose from 'mongoose'
import config from '../config'
const Category = mongoose.model('Category')

export const getCategory = async(ctx, next) => {
  try {
    let data = await Category.find().exec()
    ctx.body = {
      success: true,
      data: data
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
}


