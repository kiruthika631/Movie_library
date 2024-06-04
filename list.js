const express = require('express');
const auth = require('../middleware/auth');
const MovieList = require('../models/MovieList');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { name, isPublic } = req.body;
  try {
    const newList = new MovieList({ user: req.user.id, name, isPublic });
    const list = await newList.save();
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const lists = await MovieList.find({ user: req.user.id });
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.put('/:id', auth, async (req, res) => {
  const { movies } = req.body;
  try {
    const list = await MovieList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }
    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    list.movies = movies;
    await list.save();
    res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const list = await MovieList.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }
    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await list.remove();
    res.json({ msg: 'List removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
