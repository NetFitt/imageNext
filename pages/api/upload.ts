import { NextApiRequest, NextApiResponse } from "next";
import express from "express";
import multer from "multer";

const app = express();

// Create an instance of the multer middleware
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});

// Define a route to handle file uploads
app.post("/api/upload", upload.single("image"), (req, res) => {
  console.log(req.file); 
  res.send("File uploaded successfully");
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  app(req, res);
}