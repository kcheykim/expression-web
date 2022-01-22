const router = require('express').Router();
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById
} = require('../../controllers/user-controller');


router //Set up GET all and POST at /api/users
    .route('/')
    .get(getAllUsers) //GET all users
    .post(createUser); //POST a new user { "username": "kchey","email": "kchey@gmail.com"}

router //Set up GET one, PUT, and DELETE at /api/users/:id
    .route('/:id')
    .get(getUserById) //GET a user by _id, populate thoughts and friends
    .put(updateUserById) //PUT - update user by its _id
    .delete(deleteUserById); //DELETE - remove user by its _id w/ associated thoughts

// router //Set up GET one, PUT, and DELETE at /api/users/:id
//     .route('/:userId/friends/:friendId')
//     .post(addNewFriend) //POST to add a new friend to a user's friend list
//     .delete(deleteUserFriend); //DELETE to remove a friend from a user's friend list

module.exports = router;