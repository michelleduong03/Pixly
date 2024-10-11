import Post from "../models/Post.js";
import User from "../models/User.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.fname,
      lastName: user.lname,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
// export const likePost = async (req, res) => {
//   try {
//     const { id } = req.params;
//     console.log(`Liking post with ID: ${id}`);
    
//     const { userId } = req.body;
//     const post = await Post.findById(id);
    
//     const isLiked = post.likes.get(userId);

//     if (!post) {
//         return res.status(404).json({ message: "Post not found" });
//     }

//     if (isLiked) {
//       post.likes.delete(userId);
//     } else {
//       post.likes.set(userId, true);
//     }

//     const updatedPost = await Post.findByIdAndUpdate(
//       id,
//       { likes: post.likes },
//       { new: true }
//     );

//     res.status(200).json(updatedPost);
//   } catch (err) {
//     res.status(404).json({ message: err.message });
//   }
// };

export const likePost = async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
  
      const post = await Post.findById(id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" }); 
      }

      console.log(post);
  
      if (!post.likes) {
        post.likes = new Map();
      }
  
      const isLiked = post.likes.get(userId);
  
      if (isLiked) {
        post.likes.delete(userId);
      } else {
        post.likes.set(userId, true);
      }
  
      const updatedPost = await Post.findByIdAndUpdate(
        id,
        { likes: post.likes },
        { new: true }
      );
  
      res.status(200).json(updatedPost);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

  // export const addComment = async (req, res) => {
  //   try {
  //     const { id } = req.params; // Post ID from URL
  //     const { userId, comment } = req.body; // User ID and comment from body
  
  //     const post = await Post.findById(id);
  
  //     if (!post) {
  //       return res.status(404).json({ message: "Post not found" });
  //     }
  
  //     post.comments.push({ userId, comment }); // Add userId and comment
  //     await post.save(); // Save the updated post
  
  //     res.status(200).json(post);
  //   } catch (err) {
  //     res.status(500).json({ message: err.message });
  //   }
  // };
  
  