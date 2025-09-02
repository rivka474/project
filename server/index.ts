import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose, { Schema, Document } from 'mongoose';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4000');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/filedb', {
});

// TypeScript interface and schema
interface IFile extends Document {
  filename: string;
  originalname: string;
  uploadDate: Date;
}

const fileSchema = new Schema<IFile>({
  filename: { type: String, unique: true },
  originalname: String,
  uploadDate: { type: Date, default: Date.now },
});
const File = mongoose.model<IFile>('File', fileSchema);

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });

// Ensure uploads folder exists
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Upload endpoint
app.post('/upload', upload.single('file'), async (req: Request, res: Response) => {
  try {
    const { filename, originalname } = req.file as Express.Multer.File;
    // Save metadata, avoid duplicates by filename
    const fileDoc = new File({ filename, originalname });
    await fileDoc.save();
    res.json({ success: true, file: req.file });
  } catch (err: any) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'Duplicate file' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
