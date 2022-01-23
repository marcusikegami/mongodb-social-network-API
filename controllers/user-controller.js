const {Thought, User} = require('../models');

const userController = {
    //get all Users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
            console.log(err);
            res.sendStatus(400);
      });
    },
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No User found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.status(400).json(err));
    },
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID.'})
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },
    //add user to db
    createUser({ body }, res) {
        console.log(body);
        User.create(body)
            .then(dbUserData => {
                if(!dbUserData) {
                    console.log('no data');
                }
                console.log(dbUserData);
                res.json(dbUserData)
            })
            .catch(err => res.json(err));
    }
}

module.exports = userController;