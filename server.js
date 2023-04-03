// all required packages 
const express = require('express')
const next = require('next')
const multer = require('multer')

// custom next server configues (so that pages would render too)

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Routers

const  image_Router = require('./server/routes/upload-image.router')

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './public/uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null,  Date.now() + "_" + file.originalname  )
//   }
// })

// const upload = multer({ storage: storage })

app.prepare().then(() => {
  const server = express()

  server.use(express.json())

  server.use('/upload' , image_Router)

  // server.post('/upload', upload.single('file'), (req, res) => {
  //   console.log(req.file)
  //   res.send({ message: 'File uploaded successfully' })
  // })





  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
