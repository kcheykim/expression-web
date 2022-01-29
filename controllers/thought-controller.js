const { Thought, User } = require('../models');

const thoughtController = {

    createThought({ body }, res) { //create a new thought
        Thought.create(body).then(({ _id }) => {
            return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true })
                .populate({ path: 'thoughts', select: '-__v' })
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

    getThoughtById({ params }, res) { //get a single thought by id
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

    removeThoughtById({ params }, res) { //remove thought by id
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
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            }).catch(err => json(err));
    },

    removeReaction({ params }, res) {
        Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            }).catch(err => json(err));
    }

};

module.exports = thoughtController;