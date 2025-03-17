import e from 'express'
import mongoose, { Schema } from 'mongoose'

const followSchema = new Schema(
  {
    follower: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    followee: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Follow', followSchema)
