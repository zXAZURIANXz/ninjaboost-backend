const UserHabit = require('../models/UserHabit');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/* Create new habit */
router.post('/', async (req, res) => {
  const { title, description, color, isCompleted, icon } = req.body;

  // Validación manual
  if (!title || title.trim() === '') {
    return res.status(400).json({ errors: [{ msg: 'Title is required.' }] });
  }

  try {
    const newHabit = new UserHabit({ title, description, color, isCompleted, icon });
    await newHabit.save();
    res.status(201).json(newHabit);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear hábito' });
  }
});

router.get('/', async (req,res) => {
	try{
		const data = await UserHabit.find();
		res.status(200).json(data);
	}catch (err){
		res.status(500).json({message:'Error fetching data', error})
	}
})

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const habit = await UserHabit.findById(id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving habit', error });
  }
});


module.exports = router;
