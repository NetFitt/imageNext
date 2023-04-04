// all required packages 
const express = require('express')
const next = require('next')
const { Client }= require('pg')




// custom next server configues (so that pages would render too)

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// Routers

const  image_Router = require('./server/routes/upload-image.router');

const pool = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'study',
  password: 'mohamed2001',
  port: 5432, // your PostgreSQL port number
});

pool.connect()


app.prepare().then(() => {
  const server = express()

  server.use(express.json())

  // using our routes
  

  server.use('/upload' , image_Router)

  server.get('/poster' , async (req,res)=>{
    
     await pool.query('SELECT * FROM users',(err , res)=>{
      if(err){
        console.log(err);
      }else{
        console.log(res.rows);
      
      }
     })
     
    return app.render(req , res , '/poster')
    
  })


  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
