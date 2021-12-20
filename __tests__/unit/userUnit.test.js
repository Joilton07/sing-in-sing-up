require('../../src/config/index')

const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const User = require('../../src/app/models/user')

describe('User Unitario', () => {
  afterAll(async () => {
    try {
      await mongoose.connection.close()
    } catch (error) {
      console.log(error)
    }
  })

  test('should encrypt user password', async () => {
    const data = {
      name: 'winzer',
      email: 'test@test.com',
      password: '123123',
      phones: [
        {
          number: '25836914',
          ddd: '88'
        },
        {
          number: '35715969',
          ddd: '88'
        }
      ]
    }

    const user = await User.create(data)

    const compareHash = await bcrypt.compare('123123', user.password)

    expect(compareHash).toBe(true)
  })
  test('must check if the email already exists', async () => {
    const data = {
      name: 'winzer',
      email: 'test@test.com',
      password: '123123',
      phones: [
        {
          number: '25836914',
          ddd: '88'
        },
        {
          number: '35715969',
          ddd: '88'
        }
      ]
    }

    const emailAlreadyExists = await User.findOne({
      where: {
        email: data.email
      }
    })

    expect(emailAlreadyExists.email).toEqual(data.email)
  })
  test('should verify that the user is passing the correct password that was registered', async () => {
    const data = {
      email: 'test@test.com',
      password: '123123'
    }

    const user = await User.findOne({
      where: {
        email: data.email
      }
    })

    const compareHash = await bcrypt.compare(user.password, '123127')

    expect(compareHash).toBe(false)
  })
  test('should check using id if the user exists', async () => {
    const data = {
      id: '61c0db23ac1f288bfa9e317d',
      name: 'winzer',
      email: 'test@test.com',
      password: '123123',
      phones: [
        {
          number: '25836914',
          ddd: '88'
        },
        {
          number: '35715969',
          ddd: '88'
        }
      ]
    }
    const userExists = await User.findById(data.id)

    expect(userExists.id).toBe(data.id)
  })
})
