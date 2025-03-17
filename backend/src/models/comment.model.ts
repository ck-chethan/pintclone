import mongoose, { Schema } from 'mongoose'

const commentSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pin',
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Comment', commentSchema)
