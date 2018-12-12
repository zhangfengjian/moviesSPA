import mongoose from 'mongoose'
const Schema = mongoose.Schema

const MoviesHomeSchema = new Schema({
  movieName: {
    type: String,
    default: ''
  },
  movieAuth: {
    type: String,
    default: ''
  },
  authentication: {
    type: Number,
    default: ''
  },
  viewsNum: {
    type: Number,
    default: 0
  },
  pictureUrl: {
    type: String,
    default: ''
  },
  videoTime: {
    type: Number,
    default: ''
  },
  videoUrl: {
    type: String,
    default: ''
  },
  superId: {
    type: Number,
    default: 0
  },
  subId: {
    type: Number,
    default: 0
  },
  tabType: {
    type: Number,
    default: 0
  },
  adsUrl:{
    type: Array,
    default: []
  }
})

// MoviesHomeSchema.options.toJSON = {
//   virtuals: true,
//   versionKey: false,
//   transform(doc, ret) {
//     ret.id = ret._id
//     delete ret._id
//   }
// }

mongoose.model('movies_home', MoviesHomeSchema)
