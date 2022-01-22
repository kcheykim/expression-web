const router = require('express').Router();
const {
    //addThought,
    //removeThought,
    //addReply,
    // removeReply
} = require('../../controllers/thought-controller');

// router //Set up GET all and POST at /api/thoughts
//     .route('/')
//     .get(getAllThoughts) //GET all thoughts
//     .post(createThought); //POST a new thought 
//(don't forget to push the created thought's _id to the associated user's thoughts array field)
// example data
// {
//     "thoughtText": "Here's a cool thought...",
//     "username": "lernantino",
//     "userId": "5edff358a0fcb779aa7b118b"
// }

// router //Set up GET one, PUT, and DELETE at /api/users/:id
//     .route('/:id')
//     .get(getThoughtById) //GET a single thought by _id
//     .put(updateThoughtById) //PUT - upadate thought by its _id
//     .delete(deleteThoughtById); //DELETE - remove thought by its _id


// router //Set up PUT and DELETE /api/thoughts/:thoughtId/reactions
//     .route('/:thoughtId/:reactions')
//     .post(createReaction) //POSt - create a reaction stored in a single thought's reactions array
//     .delete(removeReaction); //DELETE - pull and remove a reaction by the reaction's reactionId

module.exports = router;