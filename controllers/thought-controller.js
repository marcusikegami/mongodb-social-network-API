const { Thought, User } = require('../models');

const thoughtController = {

    createThought({ params, body}, res) {
        console.log(body);
        User.create(body)
            .then(({ _id }) => {
                return Thought.findOneAndUpdate(
                    { _id: params.userId},
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                  res.status(404).json({ message: 'No Thought found with this id!' });
                  return;
                }
                res.json(dbThoughtData);
              })
              .catch(err => res.json(err));
    },

    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body} },
            { new: true, runValidators: true}
        )
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },

    removeReaction({ params }, res ) {
        Thought.findOneAndUpdate(
            { _id: params.reactionId },
            { $pull: { reactions: { reactionId: params.reactionId} } },
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    },

    removeThought({ params, body }, res ) {
        Thought.findOneAndDelete({ _id: params.thoughtId})
        .then(deletedReaction => {
            if (!deletedReaction) {
              return res.status(404).json({ message: 'No Reaction with this id!' });
            }
            return Thought.findOneAndUpdate(
                { _id: params.thoughtId },
                { $pull: { reactions: params.reactionId } },
                { new: true }
            );
    })
    .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No Thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
    }
};

module.exports = userController;