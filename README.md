# Pixly 📸

Pixly is a full-stack social media platform where users can create posts, like posts, manage friends, and comment on posts. Built using the **MERN stack** (MongoDB, Express, React, Node.js), Pixly is designed for a modern, responsive user experience with secure authentication and dynamic interactions.

---

## 🧠 Key Features

### 🔐 Authentication & Authorization
- Users sign up and log in securely with **bcrypt**-encrypted passwords.
- Routes are protected using **JWT (jsonwebtoken)** for secure access.

### 📝 Posts
- Users can create and view posts with images, descriptions, location, and user info.
- Posts support likes, which update in real-time across the app.

### 👥 Friends
- Users can add or remove friends.
- Friend lists are synced across both users, and changes reflect instantly.

### 💬 Comments 
- A commenting feature is in development to allow real-time interaction on posts.

---

## 🛠 Tech Stack

### Backend
- **Node.js** & **Express**: Server and RESTful API framework
- **MongoDB** & **Mongoose**: NoSQL database and schema modeling
- **JWT**: Route protection
- **Multer / GridFS**: Image uploads and storage
- **Helmet & Morgan**: Security and logging

**Backend Libraries:**
```bash
npm i express body-parser bcrypt cors dotenv gridfs-stream multer multer-gridfs-storage helmet morgan jsonwebtoken mongoose
