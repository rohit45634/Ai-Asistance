import multer from "multer";
import { v4 as uuidv4 } from "uuid"; // generate unique IDs for filenames
import path from "path";

// Configure storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // store files in /public directory
    cb(null, "./public");
  },

  filename: (req, file, cb) => {
    // Extract extension (e.g., .jpg, .png)
    const ext = path.extname(file.originalname);
    // Create a unique file name with timestamp and UUID
    const uniqueName = `${Date.now()}-${uuidv4()}${ext}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });
export default upload;
