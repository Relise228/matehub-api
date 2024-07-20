import mongoose, { Types } from "mongoose"

const Schema = mongoose.Schema

interface IUser {
  avatar: string
  username: string
  password: string
  role: Types.ObjectId
  email: string
  registrationCompleted: boolean
  resetToken: String
  resetTokenExpiration: Date
}

const userSchema = new Schema<IUser>({
  avatar: String,
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
  registrationCompleted: Boolean,
  resetToken: String,
  resetTokenExpiration: Date,
})

export const User = mongoose.model<IUser>("User", userSchema)
