import mongoose from "mongoose"

const Schema = mongoose.Schema

export interface IRole {
  name: string
  permissions: [
    {
      name: string
      value: boolean
    }
  ]
}

const roleSchema = new Schema<IRole>({
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        value: {
          type: Boolean,
          required: true,
        },
      },
    ],
    default: [
      {
        name: "login",
        value: true,
      },
    ],
  },
})

export const Role = mongoose.model<IRole>("Role", roleSchema)
