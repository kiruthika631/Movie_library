const mongoose = require('mongoose');
const MovieListSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  movies: [
    {
      imdbID: String,
      title: String,
      year: String,
      poster: String,
    },
  ],
  isPublic: {
    type: Boolean,
    default: false,
  },
});
module.exports = mongoose.model('MovieList', MovieListSchema);
