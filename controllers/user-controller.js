const { User, Thought } = require('../models');

const userController = {

    getAllUsers(req, res) { //get all users
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                res.status(400).json(err);
            });
    },

    createUser({ body }, res) { // create a new user
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    getUserById({ params }, res) { //get a user by id populate thoughts & friends
        User.findOne({ _id: params.id })
            .populate({ path: 'thoughts', select: '-__v' })
            .populate({ path: 'friends', select: '-__v' })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => { res.sendStatus(400); });
    },

    updateUserById({ params, body }, res) { //update a user by id
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    deleteUserById({ params }, res) { //remove a user by id
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => {
                return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } })
            })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    addNewFriend({ params }, res) { //add a friend to the list
        User.findOneAndUpdate({
            _id: params.userId
        }, { $push: { friends: params.friendId } }, {
            runValidators: true,
            new: true
        }).then(dbUserData => {
            if (!dbUserData) { return res.status(404).json({ message: 'No user with this id!' }); }
            res.json(dbUserData);
        }).catch(err => { res.status(500).json(err); });
    },

    deleteUserFriend({ params }, res) { //delete a friend
        User.findOneAndUpdate({
            _id: params.userId
        }, { $pull: { friends: params.friendId } }, {
            runValidators: true,
            new: true
        }).then(dbUserData => {
            if (!dbUserData) { return res.status(404).json({ message: 'No user with this id!' }); }
            res.json(dbUserData);
        }).catch(err => { res.status(500).json(err); });
    }
};

module.exports = userController;