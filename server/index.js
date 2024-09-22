// backend congig + middleware

import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet, { crossOriginResourcePolicy } from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";

// CONFIGURATIONS - middleware (something that runs between different requests)
const _filename = fileURLToPath (import.meta.url); 
const _dirname = path.dirname(_filename); // only when you use type modules
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet(crossOriginResourcePolicy({ policy: "cross-origin" })));
app.use (morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use("/assets", express.static(path.join(_dirname, "public/assets"))); // set dir of where assets are kept  (e.g. images stored locally)

// FILE STORAGE
const storage = multer.diskStorage({ // from github repo of multer - how to save files
    destination: function(req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// ROUTES W FILES
app.post("/auth/register", upload.single("picture"), register); // route, upload picture locally into assets folder, controller(login of endpoint)
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// ROUTES
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes)

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));




