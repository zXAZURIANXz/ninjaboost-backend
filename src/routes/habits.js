const UserHabit = require('../models/UserHabit');
const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
  res.send('Funciona la ruta /habits')
})

module.exports = router;
