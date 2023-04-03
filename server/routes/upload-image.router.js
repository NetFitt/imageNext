const router = require('express').Router()
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     cb(null, './public/uploads')
   },
   filename: function (req, file, cb) {
     cb(null,  Date.now() + "_" + file.originalname  )
   }
 })

 const upload = multer({ storage: storage })

router.post('/' ,upload.single('file') , (req , res )=>{
    console.log(req.file)
    res.send({ message: 'File uploaded successfully' })
} )


module.exports = router