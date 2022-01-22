const router = require('express').Router();
const {
    createUser, getAllUsers,
} = require('../controllers/user-controller');

router
    .route('/')
    .get(getAllUsers)
    .post(createUser);


module.exports = router;