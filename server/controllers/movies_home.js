import mongoose from 'mongoose'
const MoviesHome = mongoose.model('movies_home')
export const pushVideos = async(ctx, next) => {
    let body = ctx.request.body
    try {
      let movieshome = await new MoviesHome(body)
      await movieshome.save()
      ctx.body = {
        success: true,
        data: body
      }
    } catch (e) {
      ctx.body = {
        success: false,
        err: e
      }
    }
}
export const getVideos = async(ctx, next) => {
  let {page = 1, limit = 15, tabType = 1} = ctx.params
  page = Number((page - 1) * limit) || 0
  limit = Number(limit) || 15
  tabType = Number(tabType) || 1
  try {
    let totalCount = await MoviesHome.find({tabType: tabType}).exec()
    totalCount = totalCount.length
    let movieData = await MoviesHome.find({tabType: tabType}).skip(page).limit(limit).exec()
    ctx.body = {
      success: true,
      data: movieData,
      total: totalCount
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
}
export const searchVideos = async(ctx, next) => {
  console.log(ctx.params)
  let { page = 1, limit=12, keyword } = ctx.params
  keyword = decodeURIComponent(keyword)
  let reg = new RegExp(keyword, 'i')
  page = Number(page-1)*limit || 0
  limit = Number(limit) || 12 
  let body = null
  let total = null
  try {
    if(!!Number(keyword)){
      total = await MoviesHome.find({
        $or: [{movieName: { $regex: reg }},{superId: keyword},{subId: keyword}]
      })
      .exec()
      body = await MoviesHome.find({
        $or: [{movieName: { $regex: reg }},{superId: keyword},{subId: keyword}]
      })
      .skip(page)
      .limit(limit)
      .exec()
    }else{
      total = await MoviesHome.find({
        movieName: { $regex: reg }
      })
      .exec()
      body = await MoviesHome.find({
        movieName: { $regex: reg }
      })
      .skip(page)
      .limit(limit)
      .exec()
    }
    
    ctx.body = {
      success: true,
      data: body,
      total: total.length
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
}
export const getVideoDetail = async(ctx, next) => {
  let { id } = ctx.params
  if (!id) {
    return (ctx.body = {
      success: false,
      err: 'id is required'
    })
  }

  try {
    let detail = await MoviesHome.findOne({ _id: id }).exec()
    await MoviesHome.findByIdAndUpdate(id, { viewsNum: detail.viewsNum + 1 }).exec()
    ctx.body = {
      success: true,
      data: detail
    }
  } catch (e) {
    ctx.body = {
      success: false,
      err: e
    }
  }
} 