const router = require('express').Router();
const {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThoughtById,
    removeThoughtById,
    createReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router //Set up GET all and POST at /api/thoughts
    .route('/')
    .get(getAllThoughts) //GET all thoughts
    .post(createThought); //POST a new thought {"thoughtText": "", "username": "", "userId": ""}

router //Set up GET one, PUT, and DELETE at /api/thoughts/:id
    .route('/:id')
    .get(getThoughtById) //GET a single thought by _id
    .put(updateThoughtById) //PUT - upadate thought by its _id
    .delete(removeThoughtById); //DELETE - remove thought by its _id


router //Set up PUT and DELETE /api/thoughts/:thoughtId/reactions
    .route('/:thoughtId/reactions')
    .post(createReaction) //POST - create a reaction stored in a single thought's reactions array

router //Set up PUT and DELETE /api/thoughts/:thoughtId/reactions
    .route('/:thoughtId/:reactionId')
    .delete(removeReaction); //DELETE - pull and remove a reaction by the reaction's reactionId

module.exports = router;