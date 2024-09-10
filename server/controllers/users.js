import User from "../models/User.js";

// READ
export const getUser = async (req, res) => {
    try {
        const { id } = req.params; // grab id from req
        const user = await User.findById(id); // use id to grab info of user that we need
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params; // grab id from req
        const user = await User.findById(id); // use id to grab info of user that we need

        const friends = await Promise.all( // making multiple calls to the DB
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, fname, lname, location, picturePath }) => {
                return { _id, fname, lname, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// UPDATE 
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) { // check if friendId included in main users friendsId
            user.friends.filter((id) => id !== friendId); // removing when id == friendId
            friend.friends = friend.friends.filter((id) => id !== id); // remove user from their friends list
        } else {
            user.friends.push(friendId); // add users as friends
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all( // making multiple calls to the DB
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, fname, lname, location, picturePath }) => {
                return { _id, fname, lname, location, picturePath };
            }
        );

        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}