const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const uploadFolder = path.join(__dirname, "uploads");

// ✅ Serve the frontend files
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // ✅ Makes uploaded files accessible

const storage = multer.diskStorage({
    destination: uploadFolder,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// ✅ Route for file uploads
app.post("/upload", upload.single("file"), (req, res) => {
    res.send(`File ${req.file.originalname} uploaded successfully!`);
});

// ✅ Default route for serving the UI
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
