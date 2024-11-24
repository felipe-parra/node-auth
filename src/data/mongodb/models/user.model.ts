import { model, Schema } from 'mongoose'

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  imgUrl: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  roles: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['USER_ROLE', 'ADMIN_ROLE'],
  },
})

export const UserModel = model('User', userSchema)
