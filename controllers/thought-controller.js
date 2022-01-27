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
    removeThoughtById({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(deletedThought => {
                if (!deletedThought) {

                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate({ thoughts: params.id }, { $pull: { thoughts: params.id } }, { new: true });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    createReaction({ params, body }, res) { //create a reaction stored in a single thought's reactions array
        User.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            }).catch(err => json(err));
    },

    removeReaction({ params }, res) { //pull and remove a reaction by the reaction's reactionId
        User.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No user with this id!' });
                }
                return User.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: params.reactions } }, { new: true });
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;