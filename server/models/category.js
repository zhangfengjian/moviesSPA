import mongoose from 'mongoose'
const Schema = mongoose.Schema
const CategorySchema = new Schema({
    category: Object
})

mongoose.model('Category', CategorySchema)