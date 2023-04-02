const express = require('express')
const next = require('next')
const multer = require('multer')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

app.prepare().then(() => {
  const server = express()

  server.use(express.json())

  server.post('/api/upload', upload.single('file'), (req, res) => {
    console.log(req.file)
    res.send({ message: 'File uploaded successfully' })
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
