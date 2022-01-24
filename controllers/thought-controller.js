const { Thought, User } = require('../models');

const thoughtController = {

    createThought({ body }, res) { //create a new thought
        Thought.create(body).then(({ _id }) => {
            return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true });
        }).then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        }).catch(err => res.json(err));
    },

    getAllThoughts(req, res) { //get all thoughts
        Thought.find({}).then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => { res.status(400).json(err); });
    },

    getThoughtById({ params }, res) { //get a single thought by its
        Thought.findOne({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => { res.sendStatus(400); });
    },

    updateThoughtById({ params, body }, res) { //update thought by id
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // removeThoughtById({ params }, res) { //remove thought by id
    //     Thought.findOneAndDelete({ _id: params.id })
    //         .then(dbThoughtData => res.json(dbThoughtData))
    //         .catch(err => res.json(err));

    // },

    removeThoughtById({ params }, res) { //remove a user by id
        User.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    }
    // removeReply({ params }, res) {
    //     Comment.findOneAndUpdate({ _id: params.commentId }, { $pull: { replies: { replyId: params.replyId } } }, { new: true })
    //         .then(dbPizzaData => res.json(dbPizzaData))
    //         .catch(err => json(err));
    // }
};

module.exports = thoughtController;