const router = require('express').Router();
const {
    createThought,
    addReaction,
    removeReaction,
    removeThought
} = require('../controllers/thought-controller');

router
    .route('/:userId')
    .post(createThought)
    .delete(removeThought);

router  
    .route('/:userId/:thoughtId')
    .post(addReaction)
    .delete(removeReaction);

    module.exports = router;