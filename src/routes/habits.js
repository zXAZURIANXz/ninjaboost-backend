const UserHabit = require('../models/UserHabit');
const express 	= require('express');
const router 		= express.Router();
const dayjs 		= require('dayjs');

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
    res.status(500).json({ error: 'Failed to create a new habit' });
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
	const { isCompleted, _idHabit } = req.body;
	const date = dayjs().format('YYYY-MM-DD');
	try{

		const habit = await UserHabit.findById(_idHabit);

		if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

		const dateExists = habit.completedDates.includes(date);
		let updatedHabit;

		if (dateExists) {
      // Si la fecha ya existe, elimínala
      updatedHabit = await UserHabit.findByIdAndUpdate(
        _idHabit,
        {
          $set: { isCompleted: isCompleted },
          $pull: { completedDates: date }
        },
        { new: true }
      );
    } else {
      // Si la fecha no existe, agrégala
      updatedHabit = await UserHabit.findByIdAndUpdate(
        _idHabit,
        {
          $set: { isCompleted: isCompleted },
          $addToSet: { completedDates: date }
        },
        { new: true }
      );
    }
		res.status(200).json(updatedHabit);
	}catch (error){
		res.status(500).json({message:'Error fetching data', error})
	}
})






module.exports = router;
