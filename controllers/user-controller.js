const {Thought, User} = require('../models');

const userController = {
    //get all Users
    getAllUsers(req, res) {
        User.find({})
            
    },
    //add user to db
    createUser({ body }, res) {
        console.log(body);
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }
}

module.exports = userController;