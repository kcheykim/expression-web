const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controller');


router //Set up GET all and POST at /api/users
    .route('/')
    .get(getAllUsers) //GET all users
    .post(createUser); //POST a new user
// example data
// {
//     "username": "lernantino",
//     "email": "lernantino@gmail.com"
// }

router //Set up GET one, PUT, and DELETE at /api/users/:id
    .route('/:id')
    .get(getUserById) //GET a single user by _id
    //&&& populated thought and friend data
    .put(updateUserById) //PUT - upadate user by its _id
    .delete(deleteUserById); //DELETE - remove user by its _id
//remove user's associaed thoughts when deleted

router //Set up GET one, PUT, and DELETE at /api/users/:id
    .route('/:userId/friends/:friendId')
    .post(addNewFriend) //POST to add a new friend to a user's friend list
    .delete(deleteUserFriend); //DELETE to remove a friend from a user's friend list

module.exports = router;