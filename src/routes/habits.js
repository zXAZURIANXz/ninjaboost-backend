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
  } catch (error) {
    res.status(500).json({ error: 'Error al crear hábito' });
  }
});


/* Get all habits */
router.get('/', async (req,res) => {
	try{
		const data = await UserHabit.find();
		res.status(200).json(data);
	}catch (error){
		res.status(500).json({message:'Error fetching data', error})
	}
})


/* Mark Habit like complete by day */
router.post('/complete', async (req,res) => {
	const { isCompleted, date, _idHabit } = req.body;
	try{
		const data = await UserHabit.findByIdAndUpdate(
			_idHabit,
			{
				$set: { isCompleted: isCompleted },
				$push: { completedDates: date }
			},
			{ new: true }
		);
		res.status(200).json(data);
	}catch (error){
		res.status(500).json({message:'Error fetching data', error})
	}
})



module.exports = router;
