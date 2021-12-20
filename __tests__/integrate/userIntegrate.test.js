const request = require('supertest')
const mongoose = require('mongoose')

const app = require('../../src/app')

describe('User Integrate', () => {
  afterAll(async () => {
    try {
      await mongoose.connection.close()
    } catch (error) {
      console.log(error)
    }
  })

  test('should verify that the information passed to login is correct', async () => {
    const user = await request(app).post('/login').send({
      email: 'test@test.com',
      password: '123123'
    })

    expect(user.status).toEqual(201)
  })
})
