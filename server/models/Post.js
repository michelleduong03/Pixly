import mongoose from "mongoose";

const postSchema = mongoose.Schema ( {
    userId: {
        type: String,
        required: true, 
    },
    fname: {
        type: String,
        required: true, 
    },
    lname: {
        type: String,
        required: true, 
    }, 
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
         type: Map, // if not liked, remove from map
         of: Boolean,
    },
    comments: {
        type: Array,
        default: []
    }
},
{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
