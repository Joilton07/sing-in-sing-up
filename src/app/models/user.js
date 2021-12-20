const mongoose = require('../../config/index')
const bcrypt = require('bcryptjs')
const { v4 } = require('uuid')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phones: [
    {
      number: {
        type: String,
        required: true
      },
      ddd: {
        type: String,
        required: true
      }
    }
  ],
  lastLogin: {
    type: String,
    default: new Date()
  },
  token: {
    type: String,
    required: false
  }
},
{ timestamps: true })

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10)
  this.password = hash

  this.token = v4()

  next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
