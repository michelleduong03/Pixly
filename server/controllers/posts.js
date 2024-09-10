import Post from "../models/Post.js";

// CREATE
export const createPost = async (req, res) => {
     try {
        const { userId, description, picturePath } = req.body;
        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            fname: user.fname,
            lname: user.lname,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {}, 
            comments: [],
        })
        await newPost.save();

        const post = await Post.find(); // this grabs all the posts
        res.status(201).json(post);
     } catch (err) {
        res.status(409).json({ message: err.message })
     }
}

// READ
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find(); // news feed
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId }); // news feed
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

// UPDATE
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id); // grabbing post info 
        const isLiked = post.likes.get(userId); // if user has liked it 

        if (isLiked) {
            post.likes.delete(userId); // 
        } else {
            post.liked.set(userId, true);
        }

        const updatedPost = await Post.findByIDAndUpdate(
            id,
            { likes: post.likes },
            { new: true },
        );

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}