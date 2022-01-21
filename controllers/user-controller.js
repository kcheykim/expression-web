const { User } = require('../models');

const userController = {

    getAllUsers(req, res) { //get all users
        User.find({})
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createUser({ params, body }, res) {
        console.log(body);
        User.create(body)
    }
    // // get one pizza by id
    // getPizzaById({ params }, res) {
    //     Pizza.findOne({ _id: params.id })
    //         .populate({
    //             path: 'comments',
    //             select: '-__v'
    //         })
    //         .select('-__v')
    //         .then(dbPizzaData => res.json(dbPizzaData))
    //         .catch(err => {
    //             console.log(err);
    //             res.sendStatus(400);
    //         });
    // },
    // // createPizza
    // createPizza({ body }, res) {
    //     Pizza.create(body)
    //         .then(dbPizzaData => res.json(dbPizzaData))
    //         .catch(err => res.status(400).json(err));
    // },

    // // update pizza by id
    // updatePizza({ params, body }, res) {
    //     Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    //         .then(dbPizzaData => {
    //             if (!dbPizzaData) {
    //                 res.status(404).json({ message: 'No pizza found with this id!' });
    //                 return;
    //             }
    //             res.json(dbPizzaData);
    //         })
    //         .catch(err => res.status(400).json(err));
    // },

    // // delete pizza
    // deletePizza({ params }, res) {
    //     Pizza.findOneAndDelete({ _id: params.id })
    //         .then(dbPizzaData => res.json(dbPizzaData))
    //         .catch(err => res.json(err));
    // }
};

module.exports = pizzaController;