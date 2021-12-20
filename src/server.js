const app = require('./app')

const PORT = process.env.PORT || 3000
const URL = process.env.URL || 'http://www.localhost'

app.listen(PORT, () => {
  console.log(`Server Running in ${URL}:${PORT}`)
})
